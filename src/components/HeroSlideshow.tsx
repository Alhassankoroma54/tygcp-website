"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { HeroSlide } from "@/data/heroSlideshow";
import { cn } from "@/lib/utils";

/**
 * Homepage hero background: a crossfading slideshow of `images`, advancing
 * automatically every `intervalMs` and looping back to the first slide.
 * Purely decorative (see the `alt=""` / `aria-hidden` reasoning in
 * heroSlideshow.ts) — the hero's real content (headline, description, CTAs)
 * lives in page.tsx, stacked above this via z-index, and is unaffected by
 * anything here.
 *
 * Transition duration (HERO_TRANSITION_MS below) targets the requested
 * 800–1200ms crossfade window. The slow "Ken Burns" zoom on each image is a
 * separate, much longer (22s) CSS animation defined in globals.css as
 * `.hero-slide-zoom` — both this component's crossfade transition and that
 * CSS animation automatically collapse to near-instant under
 * `prefers-reduced-motion: reduce` via the existing global rule in
 * globals.css, so no extra motion-specific CSS is needed here. What *does*
 * need explicit handling in JS is the auto-advance timer itself — reduced
 * motion means "don't automatically change the image at all," not just "cut
 * instead of fade," so the interval below is never started when the user's
 * OS requests reduced motion. Manual dot navigation still works either way.
 */
const HERO_TRANSITION_MS = 1000;

/**
 * Subscribes to the OS-level reduced-motion preference via
 * useSyncExternalStore — the React-recommended pattern for reading and
 * subscribing to an external browser API like matchMedia, rather than
 * useState+useEffect (which would set state synchronously inside the
 * effect body on first run). getServerSnapshot returns false because
 * there's no matchMedia during SSR; the real value is read on the client
 * during hydration, same as any other viewport-dependent value.
 */
function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export default function HeroSlideshow({
  images,
  intervalMs = 5000,
}: {
  images: HeroSlide[];
  intervalMs?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Slides are mounted (and therefore start fetching their image) lazily,
  // not all five at once on page load — this is the "don't load five huge
  // images at full priority simultaneously" requirement. Slide 0 mounts
  // immediately (it's the LCP candidate, see `priority` below); slide 1
  // mounts immediately too so the very first crossfade at `intervalMs` has
  // nothing left to load. Every subsequent slide is mounted one full
  // interval ahead of when it will actually need to be visible, giving it
  // a full `intervalMs` of lead time to load over the network before its
  // crossfade-in starts — by design, that should always be enough time for
  // one modestly-sized hero image, so there's no flash of a blank slide.
  const [mountedIndices, setMountedIndices] = useState<Set<number>>(
    () => new Set(images.length > 1 ? [0, 1] : [0])
  );
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reducedMotion || images.length <= 1) return undefined;
    const id = setInterval(() => {
      setActiveIndex((prevActive) => {
        const next = (prevActive + 1) % images.length;
        const preload = (next + 1) % images.length;
        setMountedIndices((prevMounted) =>
          prevMounted.has(preload) ? prevMounted : new Set(prevMounted).add(preload)
        );
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [reducedMotion, images.length, intervalMs]);

  if (images.length === 0) return null;

  function goTo(index: number) {
    setActiveIndex(index);
    setMountedIndices((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <>
      {/* Decorative image layer + readability overlay. aria-hidden because
          the hero's headline/description already say everything a visitor
          needs — these images add atmosphere, not information. */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-navy" aria-hidden="true">
        {images.map((slide, index) =>
          mountedIndices.has(index) ? (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity ease-in-out",
                index === activeIndex ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDuration: `${HERO_TRANSITION_MS}ms` }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="hero-slide-zoom object-cover"
              />
            </div>
          ) : null
        )}
        {/* Readability overlay — a SINGLE navy gradient (not stacked with a
            separate flat scrim, which is what previously made this far
            darker than intended: two independent alpha layers compound
            multiplicatively, not additively, so the old bg-navy/70 flat
            layer plus a from-navy/via-navy-85/to-navy-45 gradient worked
            out to ~0% image visibility on the left, ~4.5% at center, and
            ~16.5% on the right — effectively hiding the photos entirely.

            Direction is responsive because the hero's content layout is:
            below `lg`, page.tsx stacks the text block above the
            illustration (both full width) — top-to-bottom here, easing
            off after the text block ends. At `lg` and up, page.tsx
            switches to the real two-column layout (text left,
            illustration right), so this switches to left-to-right.

            Stop positions are explicit (not Tailwind's default 0/50/100
            from-via-to) and held FLAT through a "dark zone" sized to the
            actual text column, then eased to a much lighter value after
            it — rather than a smooth ramp starting at 0%. A smooth ramp
            was tried first and measured a 2.97:1 contrast failure at the
            right edge of the desktop paragraph (h1 can extend to ~53% of
            the section width, p to ~47%), because by that point the ramp
            had already lightened enough to fail against a bright part of
            a photo (e.g. a window) directly behind it. Holding flat
            through 55% covers the full text column regardless of what's
            behind it at that point, then eases to the brighter value
            used across the illustration/right side:
              - Mobile (below lg, top-to-bottom): 85% opaque from 0-55%
                (covers the stacked text block, y up to ~52% of section
                height), easing to 28% opaque (72% visible) by 100%.
              - Desktop (lg+, left-to-right): 80% opaque from 0-55%
                (covers both h1 and the paragraph column), easing to 24%
                opaque (76% visible) by 100% — landing the illustration/
                right side of the frame in the ~70-75%+ visibility range,
                comfortably inside the requested ~55-65%+ target, while
                the dark zone still reads as a deliberate navy scrim, not
                a flat block.
            Re-verified after this change: worst-case (near-white photo
            pixel) contrast in the dark zone is ~5:1+ for the white/70
            paragraph text, checked at multiple points across both the
            h1 and paragraph rows, at both breakpoints (see commit
            message / delivered report for the actual measured values). */}
        <div
          className="absolute inset-0
                     bg-[linear-gradient(to_bottom,rgba(10,27,51,0.85)_0%,rgba(10,27,51,0.85)_55%,rgba(10,27,51,0.28)_100%)]
                     lg:bg-[linear-gradient(to_right,rgba(10,27,51,0.80)_0%,rgba(10,27,51,0.80)_55%,rgba(10,27,51,0.24)_100%)]"
        />
      </div>

      {/* Manual slide selector — small, optional, and genuinely keyboard
          accessible (plain <button>s, native tab order and Enter/Space
          activation; no custom widget semantics needed for five
          independent, non-composite controls). Never aria-hidden — unlike
          the images, these are real interactive controls. */}
      {images.length > 1 && (
        <div
          role="group"
          aria-label="Hero background image selector"
          className="absolute inset-x-0 bottom-16 z-10 flex justify-center gap-2 sm:bottom-20"
        >
          {images.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show hero background image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-green-light" : "w-2 bg-white/40 hover:bg-white/70"
              )}
              style={{ transitionDuration: `${HERO_TRANSITION_MS}ms` }}
            />
          ))}
        </div>
      )}
    </>
  );
}

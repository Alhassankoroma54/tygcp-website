/**
 * Central config for the homepage hero's background slideshow (see
 * HeroSlideshow.tsx). Add, remove, or reorder entries here — the component
 * doesn't hardcode a count of 5 anywhere, even though that's what's
 * configured today.
 *
 * IMAGE STATUS: all five files below are placeholders — original graphics
 * generated for this repository, not photographs, and not a depiction of
 * any real TYGCP/YIGSIL person or event. No genuine organizational
 * photographs existed in the repo when this slideshow was built. See
 * public/images/hero/README.md for exactly how to replace each file with
 * an approved photograph (same filenames, no code changes required).
 *
 * `alt` is deliberately empty: this slideshow is a decorative background
 * layer behind the hero's real content (headline, description, CTAs),
 * which already conveys everything a screen reader user needs — the
 * images add visual texture, not information. HeroSlideshow.tsx also marks
 * the whole slideshow `aria-hidden="true"` for the same reason. If you
 * replace these with photographs that *do* carry meaning on their own
 * (e.g. a captioned event photo), reconsider both the empty `alt` here and
 * the `aria-hidden` on the slideshow wrapper.
 */
export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
};

export const heroSlideshowImages: HeroSlide[] = [
  { id: "hero-1", src: "/images/hero/hero-1.jpg", alt: "" },
  { id: "hero-2", src: "/images/hero/hero-2.jpg", alt: "" },
  { id: "hero-3", src: "/images/hero/hero-3.jpg", alt: "" },
  { id: "hero-4", src: "/images/hero/hero-4.jpg", alt: "" },
  { id: "hero-5", src: "/images/hero/hero-5.jpg", alt: "" },
];

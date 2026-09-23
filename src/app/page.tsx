import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import SectionHeading from "@/components/SectionHeading";
import ImpactStrip from "@/components/ImpactStrip";
import EpisodeCard from "@/components/EpisodeCard";
import HeroVisual from "@/components/HeroVisual";
import HeroSlideshow from "@/components/HeroSlideshow";
import { SpotifyGlyph, ApplePodcastsGlyph, YouTubeGlyph } from "@/components/PlatformIcons";
import NewsletterForm from "@/components/forms/NewsletterForm";
import CtaBanner from "@/components/CtaBanner";
import { site } from "@/data/site";
import { heroStats } from "@/data/impact";
import { heroSlideshowImages } from "@/data/heroSlideshow";
import { getLatestEpisodes } from "@/data/episodes";
import { getLatestNews } from "@/data/news";
import { getUpcomingEvents } from "@/data/events";
import { policyExplainers, factChecks, youthVoices, districtVoices } from "@/data/voices";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const latestEpisodes = getLatestEpisodes(4);
  const latestNews = getLatestNews(3);
  const nextEvent = getUpcomingEvents()[0];
  const explainer = policyExplainers[0];
  const factCheck = factChecks[0];

  return (
    <div>
      {/* HERO — composition follows the approved reference: headline/CTA/
          platform-row on the left, a studio mic+headphones illustration on
          the right, with the impact stats floating across the bottom edge.
          bg-hero-radial stays as the section's own background (shows
          instantly, before any slideshow image has loaded, and continues
          to show through the slideshow's translucent overlay) — the
          slideshow layers on top of it, and the actual hero content
          (below) stacks above both via z-10. */}
      <section className="relative overflow-hidden bg-hero-radial">
        <HeroSlideshow images={heroSlideshowImages} intervalMs={5000} />
        <Container className="relative z-10 grid gap-10 pb-24 pt-16 sm:pb-28 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-32 lg:pt-24">
          <div>
            <Badge tone="outline" className="border-white/20 text-white/70">
              National Youth Civic Engagement Podcast
            </Badge>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Youth Voices.
              <br />
              <span className="text-green-light">Better Governance.</span>
              <br />
              Stronger Sierra Leone.
            </h1>
            <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
              {site.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/episodes" variant="primary" icon={<PlayGlyph className="h-3.5 w-3.5" />}>
                Listen Now
              </Button>
              <Button href="/about" variant="outlineLight">
                Learn More
              </Button>
            </div>
            {(site.social.spotify || site.social.applePodcasts || site.social.youtube) && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Listen on your favourite platform
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                  {site.social.spotify && (
                    <a
                      href={site.social.spotify}
                      className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
                    >
                      <SpotifyGlyph /> Spotify
                    </a>
                  )}
                  {site.social.applePodcasts && (
                    <a
                      href={site.social.applePodcasts}
                      className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
                    >
                      <ApplePodcastsGlyph /> Apple Podcasts
                    </a>
                  )}
                  {site.social.youtube && (
                    <a
                      href={site.social.youtube}
                      className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
                    >
                      <YouTubeGlyph /> YouTube
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-green/30 via-navy-2 to-navy-3 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur">
              <HeroVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Impact stats — a floating panel straddling the hero/page boundary,
          per the reference. Real, currently-verified programme figures
          (see src/data/impact.ts) labelled honestly as 12-month targets,
          not achieved metrics — ImpactStrip renders that label by default. */}
      <Container className="relative z-10 -mt-14 sm:-mt-16">
        <ImpactStrip stats={heroStats} />
      </Container>

      {/* LATEST EPISODES */}
      <section className="pb-16 pt-14 sm:pb-20 sm:pt-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Fresh from the studio" title="Latest Episodes" />
            <Link href="/episodes" className="text-sm font-bold text-green-ink hover:text-green-ink-hover">
              View all episodes →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latestEpisodes.map((ep, i) => (
              <EpisodeCard key={ep.slug} episode={ep} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* INFORMATION GRID: About / Get Involved / Latest News / Stay Connected */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-2xl bg-navy p-6 text-white">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green/10 blur-2xl" />
            <IconCircle>{micSvg}</IconCircle>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide">About the Podcast</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              The Youth Governance Circle Podcast by YIGSIL amplifies young voices, promotes good governance,
              and drives civic participation across Sierra Leone.
            </p>
            <Link href="/about" className="mt-4 inline-flex text-sm font-bold text-green-light hover:text-green">
              Learn more →
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-green-ink p-6 text-white">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <IconCircle light>{usersSvg}</IconCircle>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide">Get Involved</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              Join a growing movement of young leaders and changemakers. Be a volunteer, host, partner or advocate
              for better governance.
            </p>
            <Link href="/get-involved" className="mt-4 inline-flex text-sm font-bold text-white hover:text-white/80">
              Get involved →
            </Link>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
            <IconCircle navy>{newsSvg}</IconCircle>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-navy">Latest News</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {latestNews.map((n) => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`} className="font-semibold text-navy hover:text-green-ink">
                    {n.title}
                  </Link>
                  <div className="text-xs text-foreground/60">{formatDate(n.date)}</div>
                </li>
              ))}
            </ul>
            <Link href="/news" className="mt-4 inline-flex text-sm font-bold text-green-ink hover:text-green-ink-hover">
              View all news →
            </Link>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
            <IconCircle navy>{mailSvg}</IconCircle>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-navy">Stay Connected</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">
              Subscribe to our newsletter and never miss an update.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>

      {/* CURRENT TOPIC + FACT OR FICTION */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <Badge tone="greenOnDark">Policy Made Simple</Badge>
            <h3 className="mt-4 text-xl font-extrabold text-white">{explainer.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{explainer.summary}</p>
            <Link
              href="/policy-made-simple"
              className="mt-5 inline-flex text-sm font-bold text-green-light hover:text-green"
            >
              Read the explainer →
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <Badge tone="gold">Fact or Fiction</Badge>
            <h3 className="mt-4 text-xl font-extrabold text-white">{factCheck.claim}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{factCheck.summary}</p>
            <Link
              href="/fact-or-fiction"
              className="mt-5 inline-flex text-sm font-bold text-green-light hover:text-green"
            >
              See the verdict →
            </Link>
          </div>
        </Container>
      </section>

      {/* YOUTH VOICES / DISTRICT VOICES */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="From the community" title="Youth Voices & District Voices" />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {youthVoices.slice(0, 2).map((voice) => (
              <blockquote
                key={voice.name}
                className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
              >
                <p className="text-sm leading-relaxed text-foreground/80">“{voice.quote}”</p>
                <footer className="mt-4 text-xs font-bold text-navy">
                  {voice.name} <span className="font-medium text-foreground/60">— {voice.role}, {voice.location}</span>
                </footer>
              </blockquote>
            ))}
            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-green-light">District Voices</p>
              <ul className="mt-4 space-y-3 text-sm">
                {districtVoices.slice(0, 4).map((d) => (
                  <li key={d.district} className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                    <span className="font-semibold">{d.district}</span>
                    <span className="text-right text-white/60">{d.highlight}</span>
                  </li>
                ))}
              </ul>
              <Link href="/district-voices" className="mt-4 inline-flex text-sm font-bold text-green-light hover:text-green">
                See all districts →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* UPCOMING EVENT */}
      {nextEvent && (
        <section className="py-4 sm:py-8">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-green/20 bg-green/5 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                {/* Solid white chip, not the usual translucent tint — this
                    badge sits on the green-tinted panel below, and the
                    tint-on-tint would otherwise erode contrast below AA
                    (measured with axe-core). */}
                <Badge tone="green" className="!bg-white">Upcoming • {nextEvent.type}</Badge>
                <h3 className="mt-3 text-xl font-extrabold text-navy">{nextEvent.title}</h3>
                <p className="mt-2 text-sm text-foreground/65">
                  {formatDate(nextEvent.date)} • {nextEvent.time} • {nextEvent.venue}
                </p>
              </div>
              <Button href="/events" variant="primary" className="shrink-0">
                Register to Attend
              </Button>
            </div>
          </Container>
        </section>
      )}

      <CtaBanner
        title="Have a question or topic suggestion?"
        description="Your voice matters. Ask a question and we might feature it on the show!"
        ctaLabel="Submit Your Question"
        ctaHref="/get-involved#ask"
      />
    </div>
  );
}

function PlayGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconCircle({
  children,
  navy = false,
  light = false,
}: {
  children: React.ReactNode;
  navy?: boolean;
  light?: boolean;
}) {
  return (
    <span
      className={
        navy
          ? "flex h-11 w-11 items-center justify-center rounded-full bg-navy/5 text-navy"
          : light
            ? "flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-white"
            : "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-green-light"
      }
    >
      {children}
    </span>
  );
}

const micSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8" strokeLinecap="round" />
  </svg>
);
const usersSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);
const newsSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
  </svg>
);
const mailSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


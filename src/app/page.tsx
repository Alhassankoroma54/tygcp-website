import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import SectionHeading from "@/components/SectionHeading";
import ImpactStrip from "@/components/ImpactStrip";
import EpisodeCard from "@/components/EpisodeCard";
import NewsletterForm from "@/components/forms/NewsletterForm";
import CtaBanner from "@/components/CtaBanner";
import { site } from "@/data/site";
import { heroStats } from "@/data/impact";
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-radial">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
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
              <Button href="/episodes" variant="primary">
                Listen Now
              </Button>
              <Button href="/episodes" variant="outlineLight">
                Watch Trailer
              </Button>
            </div>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Listen on your favourite platform
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/70">
                <a href={site.social.spotify} className="hover:text-green-light">
                  Spotify
                </a>
                <a href={site.social.applePodcasts} className="hover:text-green-light">
                  Apple Podcasts
                </a>
                <a href={site.social.youtube} className="hover:text-green-light">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-green/30 via-navy-2 to-navy-3 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur">
              <MicIllustration />
            </div>
          </div>
        </Container>

        <Container className="pb-14">
          <ImpactStrip stats={heroStats} />
        </Container>
      </section>

      {/* LATEST EPISODES */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Fresh from the studio" title="Latest Episodes" />
            <Link href="/episodes" className="text-sm font-bold text-green hover:text-green-2">
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

      {/* CURRENT TOPIC + FACT OR FICTION */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <Badge tone="green">Policy Made Simple</Badge>
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
                  {voice.name} <span className="font-medium text-foreground/50">— {voice.role}, {voice.location}</span>
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
                <Badge tone="green">Upcoming • {nextEvent.type}</Badge>
                <h3 className="mt-3 text-xl font-extrabold text-navy">{nextEvent.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">
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

      {/* FOUR CARD ROW: About / Get Involved / News / Stay Connected */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-navy p-6 text-white">
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
          <div className="rounded-2xl bg-green p-6 text-white">
            <IconCircle light>{usersSvg}</IconCircle>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide">Get Involved</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85">
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
                  <Link href={`/news/${n.slug}`} className="font-semibold text-navy hover:text-green">
                    {n.title}
                  </Link>
                  <div className="text-xs text-foreground/45">{formatDate(n.date)}</div>
                </li>
              ))}
            </ul>
            <Link href="/news" className="mt-4 inline-flex text-sm font-bold text-green hover:text-green-2">
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

      <CtaBanner
        title="Have a question or topic suggestion?"
        description="Your voice matters. Ask a question and we might feature it on the show!"
        ctaLabel="Submit Your Question"
        ctaHref="/get-involved#ask"
      />
    </div>
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

function MicIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="h-2/3 w-2/3 text-green-light">
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
      <rect x="82" y="40" width="36" height="70" rx="18" fill="currentColor" fillOpacity="0.9" />
      <path
        d="M60 95a40 40 0 0 0 80 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M100 135v20M78 158h44" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

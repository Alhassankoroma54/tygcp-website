import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import PodcastPlayer from "@/components/PodcastPlayer";
import QuestionForm from "@/components/forms/QuestionForm";
import { episodes, getEpisodeBySlug, getAdjacentEpisodes } from "@/data/episodes";
import { formatDate } from "@/lib/utils";
import { site } from "@/data/site";

export function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return { title: "Episode" };
  const title = `EP ${episode.episodeNumber}: ${episode.title}`;
  return {
    title,
    description: episode.summary,
    alternates: { canonical: `/episodes/${episode.slug}` },
    openGraph: {
      title,
      description: episode.summary,
      type: "article",
      publishedTime: episode.date,
      url: `${site.url}/episodes/${episode.slug}`,
    },
  };
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const related = episodes.filter((e) => e.slug !== episode.slug && e.topic === episode.topic).slice(0, 3);
  const { previous, next } = getAdjacentEpisodes(episode.slug);

  // Only claims an associatedMedia/audio object when a real audioUrl exists —
  // no episode currently has one (see PodcastPlayer.tsx), so this stays
  // omitted rather than pointing search engines at audio that isn't there.
  const episodeJsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    episodeNumber: episode.episodeNumber,
    datePublished: episode.date,
    description: episode.description,
    url: `${site.url}/episodes/${episode.slug}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: site.name,
      url: `${site.url}/episodes`,
    },
    ...(episode.audioUrl
      ? { associatedMedia: { "@type": "MediaObject", contentUrl: episode.audioUrl } }
      : {}),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeJsonLd) }}
      />
      <section className="bg-hero-radial bg-grain">
        <Container className="py-14 sm:py-16">
          <Link href="/episodes" className="text-xs font-bold uppercase tracking-wide text-green-light">
            ← All episodes
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge tone="greenOnDark">{episode.topic}</Badge>
            {episode.series && <Badge tone="outline" className="border-white/20 text-white/70">{episode.series}</Badge>}
            {episode.district && <Badge tone="gold">{episode.district}</Badge>}
          </div>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold text-white sm:text-4xl">
            EP {episode.episodeNumber}: {episode.title}
          </h1>
          <p className="mt-3 text-sm text-white/60">
            {formatDate(episode.date)} • {episode.duration} • Guest: {episode.guest}
            {episode.guestRole ? `, ${episode.guestRole}` : ""}
          </p>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PodcastPlayer audioUrl={episode.audioUrl} title={episode.title} />
          {episode.youtubeId && (
            <p className="mt-2 text-xs text-foreground/60">
              Also available as video on YouTube (ID: {episode.youtubeId}).
            </p>
          )}

          <h2 className="mt-8 text-lg font-bold text-navy">Episode Summary</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">{episode.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {episode.tags.map((t) => (
              <span key={t} className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy/70">
                #{t}
              </span>
            ))}
          </div>

          {(previous || next) && (
            <nav aria-label="Episode navigation" className="mt-10 grid gap-3 border-t border-navy/10 pt-6 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={`/episodes/${previous.slug}`}
                  className="group rounded-xl border border-navy/10 bg-white p-4 transition-colors hover:border-green-ink/30"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-foreground/60">← Previous</span>
                  <p className="mt-1 text-sm font-semibold text-navy group-hover:text-green-ink">
                    EP {previous.episodeNumber}: {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/episodes/${next.slug}`}
                  className="group rounded-xl border border-navy/10 bg-white p-4 text-right transition-colors hover:border-green-ink/30"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-foreground/60">Next →</span>
                  <p className="mt-1 text-sm font-semibold text-navy group-hover:text-green-ink">
                    EP {next.episodeNumber}: {next.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-sm font-bold text-navy">Have a question about this topic?</h3>
            <p className="mt-2 text-xs text-foreground/60">
              Submit it and it may be answered in a follow-up episode.
            </p>
            <div className="mt-4">
              <QuestionForm />
            </div>
          </div>

          {related.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-navy">Related Episodes</h3>
              <ul className="mt-4 space-y-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/episodes/${r.slug}`} className="text-sm font-semibold text-navy hover:text-green-ink">
                      {r.title}
                    </Link>
                    <div className="text-xs text-foreground/60">{formatDate(r.date)}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </Container>
    </div>
  );
}

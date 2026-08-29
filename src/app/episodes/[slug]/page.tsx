import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import QuestionForm from "@/components/forms/QuestionForm";
import { episodes, getEpisodeBySlug } from "@/data/episodes";
import { formatDate } from "@/lib/utils";

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
  return { title: episode ? episode.title : "Episode" };
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const related = episodes.filter((e) => e.slug !== episode.slug && e.topic === episode.topic).slice(0, 3);

  return (
    <div>
      <section className="bg-hero-radial bg-grain">
        <Container className="py-14 sm:py-16">
          <Link href="/episodes" className="text-xs font-bold uppercase tracking-wide text-green-light">
            ← All episodes
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge tone="green">{episode.topic}</Badge>
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
          <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-navy via-navy-2 to-navy-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-navy">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 translate-x-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-xs text-foreground/40">
            Video/audio player embed goes here once the episode is uploaded to YouTube / your podcast host.
          </p>

          <h2 className="mt-8 text-lg font-bold text-navy">Episode Summary</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">{episode.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {episode.tags.map((t) => (
              <span key={t} className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy/60">
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#" variant="primary">Listen on Spotify</Button>
            <Button href="#" variant="outline">Download Transcript</Button>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-sm font-bold text-navy">Have a question about this topic?</h3>
            <p className="mt-2 text-xs text-foreground/55">
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
                    <Link href={`/episodes/${r.slug}`} className="text-sm font-semibold text-navy hover:text-green">
                      {r.title}
                    </Link>
                    <div className="text-xs text-foreground/45">{formatDate(r.date)}</div>
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

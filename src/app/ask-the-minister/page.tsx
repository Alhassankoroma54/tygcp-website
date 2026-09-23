import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import EpisodeCard from "@/components/EpisodeCard";
import QuestionForm from "@/components/forms/QuestionForm";
import { episodeSegments } from "@/data/topics";
import { episodes } from "@/data/episodes";

export const metadata: Metadata = {
  title: "Ask the Minister",
  description:
    "Young people question policymakers directly, with structured follow-ups and no pre-approved questions.",
  alternates: { canonical: "/ask-the-minister" },
  openGraph: {
    title: "Ask the Minister",
    description:
      "Young people question policymakers directly, with structured follow-ups and no pre-approved questions.",
    type: "website",
    url: "/ask-the-minister",
  },
};

export default function AskTheMinisterPage() {
  const relevant = episodes.filter(
    (e) => e.series === "Ask the Minister" || e.title.toLowerCase().includes("accountability")
  );

  return (
    <div>
      <PageHero
        eyebrow="Ask the Minister / Accountability Chair"
        title="Direct, unfiltered questions to public officials"
        description="Young people question policymakers directly, with structured follow-ups and no pre-approved questions. The Accountability Chair segment asks what has been promised, what has been delivered, and how progress is measured."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-navy">Featured Episodes</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {relevant.map((ep, i) => (
                <EpisodeCard key={ep.slug} episode={ep} index={i} />
              ))}
            </div>

            <h2 className="mt-12 text-lg font-bold text-navy">How the Episode Format Works</h2>
            <div className="mt-5 space-y-3">
              {episodeSegments.map((s) => (
                <div key={s.segment} className="flex items-center justify-between rounded-xl border border-navy/10 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-navy">{s.segment}</p>
                    <p className="text-xs text-foreground/60">{s.purpose}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-green-ink">{s.time}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-sm font-bold text-navy">Submit a Question for an Official</h3>
            <p className="mt-2 text-xs text-foreground/60">
              Questions are reviewed by the editorial team and may be asked directly on an upcoming episode.
            </p>
            <div className="mt-4">
              <QuestionForm />
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

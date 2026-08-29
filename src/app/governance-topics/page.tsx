import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { governanceTopics, signatureSeries } from "@/data/topics";
import { episodes } from "@/data/episodes";

export const metadata: Metadata = { title: "Governance Topics" };

export default function GovernanceTopicsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Content pillars"
        title="Governance Topics"
        description="Ten thematic pillars organise everything we produce — from democracy and public finance to climate resilience and digital citizenship."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {governanceTopics.map((topic) => {
            const count = episodes.filter((e) => e.topic === topic.title).length;
            return (
              <div key={topic.slug} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-navy">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{topic.description}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-green">
                  {count} episode{count === 1 ? "" : "s"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-extrabold text-navy">Signature Series</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {signatureSeries.map((s) => (
              <div key={s.slug} className="rounded-2xl bg-navy p-5 text-white">
                <h4 className="text-sm font-bold text-green-light">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.concept}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-sm text-foreground/50">
          Looking for something specific?{" "}
          <Link href="/episodes" className="font-semibold text-green hover:text-green-2">
            Browse and filter all episodes →
          </Link>
        </p>
      </Container>
    </div>
  );
}

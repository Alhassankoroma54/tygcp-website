import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { policyExplainers } from "@/data/voices";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Policy Made Simple" };

export default function PolicyMadeSimplePage() {
  return (
    <div>
      <PageHero
        eyebrow="Signature series"
        title="Policy Made Simple"
        description="Complex policy explained in plain language — one issue at a time, with no jargon."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {policyExplainers.map((p) => (
            <div key={p.slug} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <Badge tone="green">Explainer</Badge>
              <h3 className="mt-4 text-sm font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{p.summary}</p>
              <p className="mt-4 text-xs text-foreground/40">{formatDate(p.date)}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

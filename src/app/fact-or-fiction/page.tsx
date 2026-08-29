import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { factChecks } from "@/data/voices";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Fact or Fiction" };

const verdictStyles: Record<string, string> = {
  True: "bg-green/10 text-green",
  False: "bg-red-50 text-red-600",
  Misleading: "bg-amber-50 text-amber-700",
  Unverified: "bg-navy/5 text-navy/60",
};

export default function FactOrFictionPage() {
  return (
    <div>
      <PageHero
        eyebrow="Signature series"
        title="Fact or Fiction"
        description="Evidence-based examination of governance claims circulating online — sourced, verified and explained."
      />
      <Container className="py-16 sm:py-20">
        <div className="space-y-6">
          {factChecks.map((fc) => (
            <div key={fc.slug} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={cn("rounded-full px-3 py-1 text-xs font-bold", verdictStyles[fc.verdict])}>
                  {fc.verdict}
                </span>
                <span className="text-xs text-foreground/40">{formatDate(fc.date)}</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-navy">{fc.claim}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{fc.summary}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

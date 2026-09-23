import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import ImpactStrip from "@/components/ImpactStrip";
import { heroStats, resultsFramework, outcomes, targets12Month } from "@/data/impact";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "How we measure whether audiences understand issues better, whether institutions engage with youth questions, and whether the platform stays trusted and viable.",
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Impact",
    description:
      "How we measure whether audiences understand issues better, whether institutions engage with youth questions, and whether the platform stays trusted and viable.",
    type: "website",
    url: "/impact",
  },
};

export default function ImpactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Measuring what matters"
        title="Our Impact"
        description="Success isn't measured only by views. We track whether audiences understand issues better, whether institutions engage with youth questions, and whether the platform stays trusted and financially viable."
      >
        <ImpactStrip stats={heroStats} />
      </PageHero>

      <Container className="py-16">
        <h2 className="text-lg font-bold text-navy">12-Month Targets</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {targets12Month.map((t) => (
            <div key={t.label} className="rounded-2xl border border-navy/10 bg-white p-5">
              <p className="text-xl font-extrabold text-green-ink">{t.value}</p>
              <p className="mt-1 text-sm text-foreground/60">{t.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-navy py-16 text-white sm:py-20">
        <Container>
          <h2 className="text-lg font-bold text-white">Expected Outcomes</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-bold text-green-light">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{o.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <h2 className="text-lg font-bold text-navy">Results Framework</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-navy/10 bg-navy/[0.03] text-xs font-bold uppercase tracking-wide text-navy/70">
              <tr>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Indicator</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Verification</th>
              </tr>
            </thead>
            <tbody>
              {resultsFramework.map((row, i) => (
                <tr key={i} className="border-b border-navy/5 last:border-0">
                  <td className="px-4 py-3 font-semibold text-navy">{row.level}</td>
                  <td className="px-4 py-3 text-foreground/70">{row.indicator}</td>
                  <td className="px-4 py-3 text-foreground/70">{row.target}</td>
                  <td className="px-4 py-3 text-foreground/60">{row.verification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

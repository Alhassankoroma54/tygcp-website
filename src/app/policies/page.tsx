import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { editorialPolicySummary, safeguardingMeasures, privacyPrinciples } from "@/data/resources";
import { guidingPrinciples } from "@/data/about";

export const metadata: Metadata = { title: "Policies" };

function PolicyBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-navy">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Trust & standards"
        title="Policies"
        description="Editorial policy, fact-checking, safeguarding, complaints and privacy — the standards that govern everything we publish."
      />
      <Container className="space-y-6 py-16 sm:py-20">
        <PolicyBlock title="Editorial Standards" items={editorialPolicySummary} />
        <PolicyBlock title="Guiding Principles" items={guidingPrinciples} />
        <PolicyBlock title="Safeguarding" items={safeguardingMeasures} />
        <PolicyBlock title="Privacy" items={privacyPrinciples} />
        <div className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-navy">Complaints & Corrections</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            If you believe something we&rsquo;ve published is inaccurate, unfair, or should be corrected, please
            contact the editorial team using the details on our{" "}
            <a href="/contact" className="font-semibold text-green hover:text-green-2">
              Contact page
            </a>
            . We aim to acknowledge complaints within a reasonable timeframe and will issue corrections where
            warranted.
          </p>
        </div>
      </Container>
    </div>
  );
}

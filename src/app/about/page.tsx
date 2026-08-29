import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import {
  overallGoal,
  specificObjectives,
  guidingPrinciples,
  theoryOfChange,
  primaryBeneficiaries,
  secondaryBeneficiaries,
  teamRoles,
  projectModel,
} from "@/data/about";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our story"
        title="A trusted platform for youth voices in Sierra Leone's governance"
        description={site.description}
      />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Overall goal" title="Why the Governance Circle exists" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/70">{overallGoal}</p>

          <h3 className="mt-10 text-lg font-bold text-navy">Specific Objectives</h3>
          <ul className="mt-4 space-y-3">
            {specificObjectives.map((obj) => (
              <li key={obj} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                <CheckIcon />
                {obj}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-lg font-bold text-navy">Theory of Change</h3>
          <p className="mt-4 rounded-2xl border border-navy/10 bg-white p-6 text-sm leading-relaxed text-foreground/70">
            {theoryOfChange}
          </p>

          <h3 className="mt-10 text-lg font-bold text-navy">How the Governance Circle Works</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {projectModel.map((step, i) => (
              <div key={step.step} className="rounded-2xl border border-navy/10 bg-white p-5">
                <span className="text-xs font-bold uppercase tracking-wide text-green">Step {i + 1}</span>
                <h4 className="mt-1 text-sm font-bold text-navy">{step.step}</h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-2xl bg-navy p-6 text-white">
            <h3 className="text-sm font-bold uppercase tracking-wide text-green-light">Guiding Principles</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {guidingPrinciples.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-light" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Who We Serve</h3>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-green">Primary Beneficiaries</p>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/65">
              {primaryBeneficiaries.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-green">Secondary Beneficiaries</p>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/65">
              {secondaryBeneficiaries.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>

      <section className="bg-navy-2 py-16 text-white sm:py-20">
        <Container>
          <SectionHeading light eyebrow="Governance & management" title="Team & Youth Advisory Panel" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamRoles.map((role) => (
              <div key={role.role} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-sm font-bold text-white">{role.role}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{role.responsibilities}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-green">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

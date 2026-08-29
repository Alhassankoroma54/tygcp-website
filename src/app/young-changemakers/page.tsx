import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { changemakers } from "@/data/voices";

export const metadata: Metadata = { title: "Young Changemakers" };

export default function YoungChangemakersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Signature series"
        title="Young Changemakers"
        description="Profiles of young Sierra Leoneans creating measurable impact in their communities."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {changemakers.map((c) => (
            <div key={c.slug} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-sm font-bold text-green">
                {c.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-4 text-sm font-bold text-navy">{c.name}</h3>
              <p className="text-xs font-semibold text-green">{c.initiative} • {c.location}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{c.summary}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { youthVoices } from "@/data/voices";

export const metadata: Metadata = { title: "Youth Voices" };

export default function YouthVoicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Community perspectives"
        title="Youth Voices"
        description="Perspectives, questions and stories from young Sierra Leoneans who've engaged with the Governance Circle."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {youthVoices.map((v) => (
            <blockquote key={v.name} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <p className="text-sm leading-relaxed text-foreground/80">“{v.quote}”</p>
              <footer className="mt-4 text-xs font-bold text-navy">
                {v.name}{v.age ? `, ${v.age}` : ""}
                <span className="block font-medium text-foreground/50">{v.role} — {v.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-navy p-8 text-center text-white">
          <h3 className="text-lg font-extrabold">Have a story or perspective to share?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/65">
            We&rsquo;re always looking for youth voices from Freetown and the districts.
          </p>
          <Button href="/get-involved#ask" variant="primary" className="mt-5">
            Share Your Voice
          </Button>
        </div>
      </Container>
    </div>
  );
}

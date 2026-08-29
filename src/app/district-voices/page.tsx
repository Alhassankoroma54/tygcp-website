import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import { districtVoices } from "@/data/voices";

export const metadata: Metadata = { title: "District Voices" };

export default function DistrictVoicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Beyond Freetown"
        title="District Voices"
        description="Amplifying perspectives from young people across Sierra Leone's districts through mobile recording and remote participation."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {districtVoices.map((d) => (
            <div key={d.district} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-green">{d.region}</p>
              <h3 className="mt-1 text-lg font-extrabold text-navy">{d.district}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{d.highlight}</p>
              {d.episodeSlug && (
                <Link
                  href={`/episodes/${d.episodeSlug}`}
                  className="mt-4 inline-flex text-xs font-bold text-green hover:text-green-2"
                >
                  Listen to the episode →
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

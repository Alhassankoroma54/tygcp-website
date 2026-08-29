import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { partners, sponsorshipPackages } from "@/data/partners";

export const metadata: Metadata = { title: "Partners & Sponsors" };

export default function PartnersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Collaborate with us"
        title="Partners & Sponsors"
        description="A credible platform for supporting youth civic participation — with clear separation between sponsorship and editorial control. No sponsor has the right to suppress, alter or dictate editorial content."
      />

      <Container className="py-16 sm:py-20">
        <h2 className="text-lg font-bold text-navy">Our Partners</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p.name} className="rounded-2xl border border-navy/10 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-green">{p.category}</p>
              <h3 className="mt-1 text-sm font-bold text-navy">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{p.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-navy py-16 text-white sm:py-20">
        <Container>
          <h2 className="text-lg font-bold text-white">Sponsorship Packages</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wide text-white/50">
                <tr>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Indicative Contribution</th>
                  <th className="px-4 py-3">Benefits</th>
                </tr>
              </thead>
              <tbody>
                {sponsorshipPackages.map((pkg) => (
                  <tr key={pkg.tier} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-semibold text-green-light">{pkg.tier}</td>
                    <td className="px-4 py-3 text-white/70">{pkg.contribution}</td>
                    <td className="px-4 py-3 text-white/60">{pkg.benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Discuss a Partnership
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

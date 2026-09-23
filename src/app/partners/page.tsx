import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { sponsorshipPackages } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partners & Sponsors",
  description:
    "A credible platform for supporting youth civic participation, with clear separation between sponsorship and editorial control.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partners & Sponsors",
    description:
      "A credible platform for supporting youth civic participation, with clear separation between sponsorship and editorial control.",
    type: "website",
    url: "/partners",
  },
};

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
        {/*
         * No partnership has been confirmed yet — this list is intentionally
         * empty rather than showing a roster of institutions that haven't
         * actually agreed to be named. See src/data/partners.ts: the
         * `partners` array there is illustrative/example data only and is
         * deliberately not rendered here until real, confirmed partners
         * (with their agreement to be listed) are supplied.
         */}
        <div className="mt-6 rounded-2xl border border-dashed border-navy/15 bg-navy/[0.02] p-8 text-center">
          <p className="text-sm font-semibold text-navy">Partnerships are still being finalized.</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-foreground/60">
            We&rsquo;re in active discussions with government, civil society, academic and media
            institutions across Sierra Leone. Confirmed partners will be listed here — with their
            agreement — as those partnerships are formalized.
          </p>
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

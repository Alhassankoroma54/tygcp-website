import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import ContactForm from "@/components/forms/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        description="Questions, partnership enquiries, media requests or feedback — we'd love to hear from you."
      />
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Address</h3>
            <p className="mt-2 text-sm text-foreground/65">{site.address}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Email</h3>
            <p className="mt-2 text-sm text-foreground/65">{site.email}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Phone</h3>
            <p className="mt-2 text-sm text-foreground/65">{site.phones.join(" / ")}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}

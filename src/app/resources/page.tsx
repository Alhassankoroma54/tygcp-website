import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { resources } from "@/data/resources";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Transcripts, policy briefs, civic guides and reports — free to download and share.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources",
    description:
      "Transcripts, policy briefs, civic guides and reports — free to download and share.",
    type: "website",
    url: "/resources",
  },
};

export default function ResourcesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Civic education resource centre"
        title="Resources"
        description="Transcripts, policy briefs, civic guides and reports — free to download and share."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-4">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              className="flex flex-col gap-3 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Badge tone="green">{r.type}</Badge>
                <h3 className="mt-2 text-sm font-bold text-navy">{r.title}</h3>
                <p className="mt-1 text-sm text-foreground/60">{r.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-xs text-foreground/60">
                <span>{formatDate(r.date)}</span>
                <span className="font-bold text-green-ink">Download →</span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-8 text-xs text-foreground/60">
          Files will be linked here once uploaded by the project team through the CMS / file storage.
        </p>
      </Container>
    </div>
  );
}

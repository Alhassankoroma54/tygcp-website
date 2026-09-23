import type { Metadata } from "next";

// Defense in depth alongside robots.ts's Disallow: /admin — Disallow only
// stops crawling, not indexing of a URL discovered some other way (e.g. a
// stray inbound link), so this explicitly tells any search engine that does
// reach these pages not to index them.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.shortName,
    url: site.url,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

// Only real, non-empty links go in `sameAs` — most social fields in
// `site.social` are intentionally blank right now (see data/site.ts), so
// this never invents an account URL for a profile that doesn't exist yet.
const sameAs = Object.values(site.social).filter(Boolean);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.org,
  url: site.url,
  logo: `${site.url}/favicon.ico`,
  description: site.description,
  email: site.email,
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* No-op unless the site is actually deployed on Vercel (it detects
            that at request time) — safe to always include, sends nothing in
            local dev or on other hosts. Vercel's own dashboard is where
            traffic data shows up; nothing in this codebase reads it back.
            In production it loads its script from the same-origin
            /_vercel/insights/script.js path (verified against the package
            source), so it isn't blocked by this app's script-src 'self'
            CSP — only its separate local-dev debug script, served from
            va.vercel-scripts.com, is; that's expected and harmless. */}
        <Analytics />
      </body>
    </html>
  );
}

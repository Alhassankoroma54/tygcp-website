import Link from "next/link";
import Container from "./Container";
import { site, footerNav } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green text-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-sm font-extrabold uppercase tracking-wide text-white">
              TYGCP <span className="text-green">/ YIGSIL</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{site.tagline}</p>
          <p className="mt-4 text-xs leading-relaxed text-white/40">{site.address}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-green">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Organisation</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.organisation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-green">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Stay Connected</h3>
          <p className="mt-4 text-sm">{site.email}</p>
          <p className="text-sm">{site.phones.join(" / ")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(site.social).map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold uppercase hover:bg-green"
              >
                {key.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.org}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/policies" className="hover:text-white">
              Editorial Policy
            </Link>
            <Link href="/policies" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/policies" className="hover:text-white">
              Safeguarding
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

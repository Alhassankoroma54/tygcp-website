import Link from "next/link";

/**
 * PHASE 4 BATCH 1 — shared nav shell for every /admin page.
 *
 * Lists all seven management sections the dashboard is meant to grow into
 * (per the Phase 4 Batch 1 brief), even though only four are real listings
 * today and three (Episodes/News/Events) are foundation-only stub pages —
 * the point of adding the nav now, rather than waiting for the CRUD editors
 * to exist, is to establish one consistent `/admin/<section>` URL/shell
 * pattern that every future batch's editors slot into, instead of each
 * batch inventing its own.
 *
 * Deliberately a plain server component (no "use client", no active-link
 * state) — every link here is a static, known-at-build-time path, so there
 * is nothing that needs client-side interactivity yet. If/when a future
 * batch wants active-route highlighting, that's a small, isolated addition
 * here, not a reason to have built it speculatively now.
 */
const NAV_SECTIONS: Array<{ href: string; label: string }> = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/episodes", label: "Episodes" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/events", label: "Events" },
];

export default function AdminNav() {
  return (
    <nav aria-label="Admin sections" className="border-b border-navy/10 bg-white">
      <div className="container-page flex flex-wrap gap-1 py-2">
        {NAV_SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-navy/70 transition-colors hover:bg-navy/5 hover:text-navy"
          >
            {section.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/**
 * PHASE 4 BATCH 1 — shared "foundation, not built yet" screen for the three
 * new admin sections (Episodes, News, Events). Deliberately static: no
 * database query happens on these pages at all.
 *
 * Two reasons for that, both from the Batch 1 brief:
 *   1. "Do not build every CRUD editor unless it is necessary for the
 *      foundation" — actual create/edit/publish workflows are out of scope
 *      for this batch.
 *   2. The new Prisma models this batch adds (Episode, NewsArticle, Event)
 *      exist only in schema.prisma plus a migration file — nobody has run
 *      that migration against the real database yet (this batch explicitly
 *      does not do that). Querying `prisma.episode.findMany()` etc. from
 *      these pages before that migration is applied would throw at request
 *      time ("relation does not exist"). Staying static avoids that
 *      failure mode entirely rather than wrapping it in a try/catch for a
 *      page that has nothing real to show yet regardless.
 */
export default function AdminFoundationStub({
  title,
  schemaSummary,
}: {
  title: string;
  schemaSummary: string;
}) {
  return (
    <div className="container-page py-10">
      <div className="rounded-2xl border border-navy/10 bg-white p-8">
        <h1 className="text-lg font-bold text-navy">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">
          Management for this section is coming in a future Phase 4 batch. This
          batch (Batch 1) added the underlying database model and the secure,
          navigable admin foundation it will live in — not the editor itself.
        </p>
        <div className="mt-5 rounded-xl border border-navy/10 bg-navy/[0.03] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-navy/60">Schema ready</p>
          <p className="mt-1.5 text-sm text-foreground/70">{schemaSummary}</p>
        </div>
        <p className="mt-4 text-xs text-foreground/50">
          No records are shown here because none are fetched — this page does not
          query the database yet, so it has nothing to fabricate and nothing that
          can go stale.
        </p>
      </div>
    </div>
  );
}

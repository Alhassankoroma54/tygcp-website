import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  isAdminConfigured,
  verifySessionCookieValue,
  SESSION_COOKIE_NAME,
} from "@/lib/adminAuth";
import {
  isPersistenceAvailable,
  listContactSubmissions,
  listMinisterQuestions,
  listNewsletterSubscribers,
  listRsvpSubmissions,
} from "@/lib/db";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminNav from "@/components/admin/AdminNav";

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-navy/10 bg-white p-6">
      <h2 className="text-sm font-bold text-navy">
        {title} <span className="font-normal text-foreground/60">({count})</span>
      </h2>
      <div className="mt-4 overflow-x-auto">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="py-6 text-center text-sm text-foreground/60">Nothing here yet.</p>;
}

export default async function AdminDashboardPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy px-4">
        <div className="max-w-md rounded-2xl border border-white/10 bg-navy-2 p-8 text-center">
          <h1 className="text-lg font-bold text-white">Admin dashboard not configured</h1>
          <p className="mt-3 text-sm text-white/70">
            Set <code className="rounded bg-white/10 px-1.5 py-0.5">ADMIN_PASSWORD</code> and{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5">ADMIN_SESSION_SECRET</code> in your
            environment to enable sign-in. See <code className="rounded bg-white/10 px-1.5 py-0.5">.env.example</code>.
          </p>
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionCookieValue(session)) {
    redirect("/admin/login");
  }

  // Four independent reads — run them concurrently rather than one after
  // another (each is now an async Prisma query as of Phase 3 Batch 1).
  const [contacts, questions, subscribers, rsvps] = await Promise.all([
    listContactSubmissions(),
    listMinisterQuestions(),
    listNewsletterSubscribers(),
    listRsvpSubmissions(),
  ]);

  return (
    <div className="min-h-screen bg-navy/[0.03]">
      <header className="border-b border-navy/10 bg-navy">
        <div className="container-page flex h-16 items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white">Admin dashboard</p>
            <p className="text-xs text-white/50">Form submissions — internal use only</p>
          </div>
          <LogoutButton />
        </div>
      </header>
      {/* PHASE 4 BATCH 1: nav shell shared with the new Episodes/News/Events
          foundation pages — see src/components/admin/AdminNav.tsx. Every
          section below (Contact/Questions/Newsletter/RSVP) is unchanged. */}
      <AdminNav />

      <div className="container-page space-y-8 py-10">
        {!isPersistenceAvailable && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>No durable storage configured for this deployment.</strong> Submissions are
            validated and (if Resend is configured) emailed, but not saved to a database — see
            README.md &ldquo;Database&rdquo;. The lists below will always be empty until a real
            <code className="mx-1 rounded bg-amber-100 px-1">DATABASE_URL</code> is set.
          </div>
        )}

        <Section title="Contact messages" count={contacts.length}>
          {contacts.length === 0 ? (
            <Empty />
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-navy/10 text-xs font-bold uppercase tracking-wide text-navy/70">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Reason</th>
                  <th className="px-3 py-2">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td className="whitespace-nowrap px-3 py-3 text-foreground/60">{formatTimestamp(c.createdAt)}</td>
                    <td className="px-3 py-3 font-medium text-navy">{c.name}</td>
                    <td className="px-3 py-3 text-foreground/70">{c.email}</td>
                    <td className="px-3 py-3 text-foreground/70">{c.reason}</td>
                    <td className="max-w-xs px-3 py-3 text-foreground/70">{c.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>

        <Section title="Questions for the minister" count={questions.length}>
          {questions.length === 0 ? (
            <Empty />
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-navy/10 text-xs font-bold uppercase tracking-wide text-navy/70">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">District</th>
                  <th className="px-3 py-2">Topic</th>
                  <th className="px-3 py-2">Question</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {questions.map((q) => (
                  <tr key={q.id}>
                    <td className="whitespace-nowrap px-3 py-3 text-foreground/60">{formatTimestamp(q.createdAt)}</td>
                    <td className="px-3 py-3 font-medium text-navy">{q.name}</td>
                    <td className="px-3 py-3 text-foreground/70">{q.district || "—"}</td>
                    <td className="px-3 py-3 text-foreground/70">{q.topic || "—"}</td>
                    <td className="max-w-xs px-3 py-3 text-foreground/70">{q.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>

        <Section title="Newsletter subscribers" count={subscribers.length}>
          {subscribers.length === 0 ? (
            <Empty />
          ) : (
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead className="border-b border-navy/10 text-xs font-bold uppercase tracking-wide text-navy/70">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {subscribers.map((s) => (
                  <tr key={s.id}>
                    <td className="whitespace-nowrap px-3 py-3 text-foreground/60">{formatTimestamp(s.createdAt)}</td>
                    <td className="px-3 py-3 text-foreground/70">{s.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>

        <Section title="Event RSVPs" count={rsvps.length}>
          {rsvps.length === 0 ? (
            <Empty />
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-navy/10 text-xs font-bold uppercase tracking-wide text-navy/70">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">District</th>
                  <th className="px-3 py-2">Event</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {rsvps.map((r) => (
                  <tr key={r.id}>
                    <td className="whitespace-nowrap px-3 py-3 text-foreground/60">{formatTimestamp(r.createdAt)}</td>
                    <td className="px-3 py-3 font-medium text-navy">{r.name}</td>
                    <td className="px-3 py-3 text-foreground/70">{r.phone}</td>
                    <td className="px-3 py-3 text-foreground/70">{r.district || "—"}</td>
                    <td className="px-3 py-3 text-foreground/70">{r.eventTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>
      </div>
    </div>
  );
}

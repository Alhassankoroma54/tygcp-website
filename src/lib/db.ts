/**
 * Submission persistence layer.
 *
 * PHASE 3 BATCH 1 — now backed by a real `@prisma/client` against Postgres,
 * replacing the Phase 2 hand-written `node:sqlite` implementation. History,
 * for context: `prisma generate` needs to download a query-engine binary
 * from binaries.prisma.sh/objects.prisma.sh, and the sandbox this project
 * was originally built in had no network access to either host (still true
 * as of this batch — reconfirmed, both return a 403 policy denial). Phase 2
 * shipped a hand-rolled SQLite module with the exact same four tables and
 * exported function signatures so the whole submission pipeline could
 * genuinely be built and tested end to end in that environment, with the
 * explicit intent (stated in that version's header comment) that swapping
 * this file's internals for real `@prisma/client` calls would be a
 * same-shaped, mechanical change once Postgres was in place. This is that
 * swap. It still cannot be executed inside the sandbox that wrote it — see
 * the Batch 1 report for exactly what was and wasn't verified.
 *
 * PRISMA 7 CORRECTIVE UPDATE: the app is deployed against Neon Postgres, and
 * Prisma 7 made driver adapters mandatory — `new PrismaClient()` with no
 * arguments (which relied on a connection string living in the generated
 * schema) no longer works, because schema.prisma can no longer carry a
 * `url` at all (see prisma/schema.prisma's datasource comment). The client
 * is now constructed with an explicit `@prisma/adapter-neon` instance built
 * from DATABASE_URL (the pooled connection — unchanged from Batch 1;
 * DIRECT_URL is unpooled and used only by the Prisma CLI, via
 * prisma.config.ts, never here). The Neon adapter was chosen over the
 * generic `@prisma/adapter-pg` because it talks to Neon over HTTP/WebSocket
 * rather than holding a long-lived TCP connection per invocation — the same
 * "many short-lived serverless invocations" concern that motivated the
 * pooled/direct split in the first place.
 *
 * CONTRACT CHANGE (deliberate, not silent — every caller was updated):
 * every exported function here is now `async` and returns a Promise, because
 * every `@prisma/client` call is asynchronous. The old SQLite version was
 * synchronous. All five call sites (the four form API routes plus
 * src/app/admin/page.tsx) were already inside an `async function`, so each
 * one only needed an `await` added — no control-flow restructuring. Every
 * other detail of every function's signature (parameter shape, return shape,
 * field names and types) is unchanged from Phase 2: `createdAt` is still
 * returned as an ISO string (not a native Date) specifically so nothing
 * downstream — e.g. admin/page.tsx's `formatTimestamp` — needed to change.
 *
 * PRODUCTION NOTE: persistence is now considered "configured" purely based
 * on whether DATABASE_URL is set — not on whether the app happens to be
 * running on Vercel (that was the Phase 2 behavior, and it meant persistence
 * was hard-disabled in production even if a real database URL were set).
 * Every save/list function still degrades to "not persisted" / "empty list"
 * rather than throwing if the database is unreachable — the visible
 * behavior (amber "no durable storage configured" banner in /admin, forms
 * that still succeed and still email even when the database write fails) is
 * unchanged from Phase 2; only *why* persistence might be unavailable has
 * changed (missing/unreachable DATABASE_URL, not "we're on Vercel").
 */
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Reused across warm invocations (serverless function instances, and Next's
// dev-mode hot reload) instead of constructing a new PrismaClient — and
// therefore a new connection pool — on every import. This is the standard
// Next.js + Prisma pattern; caching on `globalThis` survives module
// re-evaluation in dev and is harmless in production (each cold start gets
// a fresh module scope regardless, so there's nothing to leak there).
const globalForPrisma = globalThis as unknown as { prismaClient?: PrismaClient };

// Set once client construction fails, so a broken configuration isn't
// retried on every single request within the same warm instance — mirrors
// the Phase 2 SQLite module's `dbUnavailable` flag, same reasoning: a retry
// would fail the same way and cost a network round-trip every time.
let clientUnavailable = false;

function getClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    // No persistence configured — same "not an error" state Phase 2 had for
    // local dev with no database. Every function below is written to treat
    // this identically to a configured-but-unreachable database.
    return null;
  }
  if (clientUnavailable) return null;
  if (globalForPrisma.prismaClient) return globalForPrisma.prismaClient;

  try {
    // Prisma 7: the client no longer has an implicit connection string, so
    // it must always be constructed with an adapter. DATABASE_URL is the
    // pooled connection — the correct one for a request-scoped runtime
    // client (see the header comment above for why Neon's adapter, and why
    // this is DATABASE_URL, not DIRECT_URL).
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
    const client = new PrismaClient({ adapter });
    globalForPrisma.prismaClient = client;
    return client;
  } catch (err) {
    // Prisma throws synchronously here if DATABASE_URL is malformed enough
    // that the client can't even be constructed (a genuinely broken
    // connection string, not just an unreachable host — those fail later,
    // per-query, and are caught individually below). Logged, never thrown:
    // treated the same as "no persistence configured," never as a reason to
    // crash a request that hit it.
    console.error("[db] Failed to initialise Prisma client:", err);
    clientUnavailable = true;
    return null;
  }
}

export const isPersistenceAvailable = Boolean(process.env.DATABASE_URL);

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  status: string;
  createdAt: string;
};

export type MinisterQuestion = {
  id: string;
  name: string;
  district: string | null;
  topic: string | null;
  question: string;
  status: string;
  createdAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  confirmed: boolean;
  createdAt: string;
};

export type RsvpSubmission = {
  id: string;
  name: string;
  phone: string;
  district: string | null;
  eventSlug: string;
  eventTitle: string;
  createdAt: string;
};

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  reason: string;
  message: string;
}): Promise<{ persisted: boolean; id: string | null }> {
  const client = getClient();
  if (!client) return { persisted: false, id: null };
  try {
    const row = await client.contactSubmission.create({ data });
    return { persisted: true, id: row.id };
  } catch (err) {
    console.error("[db] Write failed:", err);
    return { persisted: false, id: null };
  }
}

export async function saveMinisterQuestion(data: {
  name: string;
  district?: string;
  topic?: string;
  question: string;
}): Promise<{ persisted: boolean; id: string | null }> {
  const client = getClient();
  if (!client) return { persisted: false, id: null };
  try {
    const row = await client.ministerQuestion.create({
      data: {
        name: data.name,
        district: data.district ?? null,
        topic: data.topic ?? null,
        question: data.question,
      },
    });
    return { persisted: true, id: row.id };
  } catch (err) {
    console.error("[db] Write failed:", err);
    return { persisted: false, id: null };
  }
}

export async function saveNewsletterSubscriber(email: string): Promise<{
  persisted: boolean;
  id: string | null;
  alreadySubscribed: boolean;
}> {
  const client = getClient();
  if (!client) return { persisted: false, id: null, alreadySubscribed: false };

  // Two separate try/catch blocks, same as the Phase 2 SQLite version: a
  // read failure and a write failure are distinct, both logged, both
  // degrade the same way. NOTE (carried over unchanged from Phase 2, not a
  // new limitation introduced here): this check-then-insert is not atomic —
  // two concurrent signups with the same email could both pass the
  // `findUnique` check before either `create` runs. The `email @unique`
  // constraint still prevents a duplicate row either way; the only
  // consequence is that the loser of that race gets a generic write-failure
  // response instead of a friendly "already subscribed" one. Acceptable for
  // this form's real-world traffic; flagged here rather than silently
  // "fixed" with a behavior change outside this batch's scope.
  let existing: { id: string } | null;
  try {
    existing = await client.newsletterSubscriber.findUnique({ where: { email }, select: { id: true } });
  } catch (err) {
    console.error("[db] Read failed:", err);
    return { persisted: false, id: null, alreadySubscribed: false };
  }
  if (existing) {
    return { persisted: true, id: existing.id, alreadySubscribed: true };
  }

  try {
    const row = await client.newsletterSubscriber.create({ data: { email } });
    return { persisted: true, id: row.id, alreadySubscribed: false };
  } catch (err) {
    console.error("[db] Write failed:", err);
    return { persisted: false, id: null, alreadySubscribed: false };
  }
}

export async function saveRsvpSubmission(data: {
  name: string;
  phone: string;
  district?: string;
  eventSlug: string;
  eventTitle: string;
}): Promise<{ persisted: boolean; id: string | null }> {
  const client = getClient();
  if (!client) return { persisted: false, id: null };
  try {
    const row = await client.rsvpSubmission.create({
      data: {
        name: data.name,
        phone: data.phone,
        district: data.district ?? null,
        eventSlug: data.eventSlug,
        eventTitle: data.eventTitle,
      },
    });
    return { persisted: true, id: row.id };
  } catch (err) {
    console.error("[db] Write failed:", err);
    return { persisted: false, id: null };
  }
}

// --- Admin read access (used by /admin only, see src/app/admin) -----------

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const rows = await client.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  } catch (err) {
    console.error("[db] Read failed:", err);
    return [];
  }
}

export async function listMinisterQuestions(): Promise<MinisterQuestion[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const rows = await client.ministerQuestion.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  } catch (err) {
    console.error("[db] Read failed:", err);
    return [];
  }
}

export async function listNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const rows = await client.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  } catch (err) {
    console.error("[db] Read failed:", err);
    return [];
  }
}

export async function listRsvpSubmissions(): Promise<RsvpSubmission[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const rows = await client.rsvpSubmission.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  } catch (err) {
    console.error("[db] Read failed:", err);
    return [];
  }
}

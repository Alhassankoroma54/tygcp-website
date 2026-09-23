/**
 * Submission persistence layer.
 *
 * WHY THIS FILE EXISTS INSTEAD OF A GENERATED PRISMA CLIENT:
 * `prisma/schema.prisma` is the authoritative, documented schema and the
 * recommended production path (Prisma + Postgres — see README.md). But
 * `prisma generate`/`migrate` need to download a native query-engine binary
 * from binaries.prisma.sh, and the sandboxed environment this project was
 * built and tested in has no network access to that host (confirmed: both
 * `prisma migrate dev` and `prisma generate` fail there with a 403). Rather
 * than ship and claim a Prisma integration that was never actually run, this
 * file implements the exact same four tables using Node's built-in
 * `node:sqlite` module (stable in Node 22+, zero install, zero network) so
 * the whole submission pipeline could be genuinely built and tested end to
 * end in that environment.
 *
 * On a normal machine or in CI/Vercel (both of which have full internet
 * access), `npx prisma generate && npx prisma migrate dev` will work
 * immediately against the existing schema.prisma, and swapping this file's
 * internals for `@prisma/client` calls is a same-shaped, mechanical change —
 * every exported function below keeps working with the same signature
 * either way, so nothing that imports from "@/lib/db" needs to change.
 *
 * PRODUCTION NOTE: this SQLite file (prisma/dev.db) is for local development
 * only. Vercel's serverless filesystem is ephemeral and read-only outside
 * /tmp, so this module refuses to write anywhere in production (see
 * isPersistenceAvailable below) — deploying without a real DATABASE_URL
 * pointed at Postgres means submissions are still validated and logged/
 * emailed (see notify.ts) but not durably stored, exactly as before this
 * change. This is intentionally a loud, visible limitation rather than a
 * silent one — see the `persisted: boolean` field every save*() function
 * returns.
 */
import { DatabaseSync, type StatementSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import path from "node:path";

const isProduction = process.env.NODE_ENV === "production" && !!process.env.VERCEL;

let db: DatabaseSync | null = null;

// Set once opening+schema setup fails, so a broken connection isn't retried
// on every single request (each retry would fail the same way and cost a
// disk round-trip) — but see the comment on `run()` below for why a
// mid-session failure (e.g. the disk filling up, or the file being moved
// out from under a live process) still gets caught per-query rather than
// crashing the request that hit it.
let dbUnavailable = false;

function getDb(): DatabaseSync | null {
  if (isProduction) {
    // No writable, persistent filesystem on Vercel — see file header.
    // A real DATABASE_URL + Postgres client should replace this module
    // before relying on durable storage in production.
    return null;
  }
  if (db) return db;
  if (dbUnavailable) return null;

  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  try {
    const conn = new DatabaseSync(dbPath);
    conn.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        reason TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);

      CREATE TABLE IF NOT EXISTS minister_questions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        district TEXT,
        topic TEXT,
        question TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_question_created ON minister_questions(created_at);

      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        confirmed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_subscribers(created_at);

      CREATE TABLE IF NOT EXISTS rsvp_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        district TEXT,
        event_slug TEXT NOT NULL,
        event_title TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_rsvp_event ON rsvp_submissions(event_slug);
    `);
    db = conn;
    return db;
  } catch (err) {
    // Opening the file or creating the schema failed (permissions, a full
    // disk, a corrupt file, ...). Logged so it's visible in the server
    // console/Vercel function logs, but never thrown — every save*()
    // function below treats this exactly like "no persistence configured"
    // (persisted: false) rather than crashing the request and losing
    // whatever the user just submitted.
    console.error("[db] Failed to open/initialise local SQLite database:", err);
    dbUnavailable = true;
    return null;
  }
}

export const isPersistenceAvailable = !isProduction;

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

/**
 * Runs an INSERT/UPDATE and reports whether it actually succeeded, instead
 * of letting a write error (a full disk, a lock, a file that became
 * unwritable mid-session, ...) throw and crash the API route that called
 * it. A public form submission failing should degrade to "not saved, but
 * here's a normal response" — never a raw 500 that loses the user's input
 * with no explanation.
 */
function run(stmt: StatementSync | undefined, params: Record<string, unknown>): boolean {
  if (!stmt) return false;
  try {
    stmt.run(params);
    return true;
  } catch (err) {
    console.error("[db] Write failed:", err);
    return false;
  }
}

export function saveContactSubmission(data: {
  name: string;
  email: string;
  reason: string;
  message: string;
}): { persisted: boolean; id: string | null } {
  const conn = getDb();
  const id = randomUUID();
  if (!conn) return { persisted: false, id: null };
  const ok = run(
    conn.prepare(
      `INSERT INTO contact_submissions (id, name, email, reason, message, status, created_at)
       VALUES (@id, @name, @email, @reason, @message, 'new', @createdAt)`
    ),
    { id, ...data, createdAt: new Date().toISOString() }
  );
  return { persisted: ok, id: ok ? id : null };
}

export function saveMinisterQuestion(data: {
  name: string;
  district?: string;
  topic?: string;
  question: string;
}): { persisted: boolean; id: string | null } {
  const conn = getDb();
  const id = randomUUID();
  if (!conn) return { persisted: false, id: null };
  const ok = run(
    conn.prepare(
      `INSERT INTO minister_questions (id, name, district, topic, question, status, created_at)
       VALUES (@id, @name, @district, @topic, @question, 'new', @createdAt)`
    ),
    {
      id,
      name: data.name,
      district: data.district ?? null,
      topic: data.topic ?? null,
      question: data.question,
      createdAt: new Date().toISOString(),
    }
  );
  return { persisted: ok, id: ok ? id : null };
}

export function saveNewsletterSubscriber(email: string): {
  persisted: boolean;
  id: string | null;
  alreadySubscribed: boolean;
} {
  const conn = getDb();
  if (!conn) return { persisted: false, id: null, alreadySubscribed: false };

  let existing: { id: string } | undefined;
  try {
    existing = conn.prepare(`SELECT id FROM newsletter_subscribers WHERE email = @email`).get({ email }) as
      | { id: string }
      | undefined;
  } catch (err) {
    console.error("[db] Read failed:", err);
    return { persisted: false, id: null, alreadySubscribed: false };
  }
  if (existing) {
    return { persisted: true, id: existing.id, alreadySubscribed: true };
  }

  const id = randomUUID();
  const ok = run(
    conn.prepare(
      `INSERT INTO newsletter_subscribers (id, email, confirmed, created_at)
       VALUES (@id, @email, 0, @createdAt)`
    ),
    { id, email, createdAt: new Date().toISOString() }
  );
  return { persisted: ok, id: ok ? id : null, alreadySubscribed: false };
}

export function saveRsvpSubmission(data: {
  name: string;
  phone: string;
  district?: string;
  eventSlug: string;
  eventTitle: string;
}): { persisted: boolean; id: string | null } {
  const conn = getDb();
  const id = randomUUID();
  if (!conn) return { persisted: false, id: null };
  const ok = run(
    conn.prepare(
      `INSERT INTO rsvp_submissions (id, name, phone, district, event_slug, event_title, created_at)
       VALUES (@id, @name, @phone, @district, @eventSlug, @eventTitle, @createdAt)`
    ),
    {
      id,
      name: data.name,
      phone: data.phone,
      district: data.district ?? null,
      eventSlug: data.eventSlug,
      eventTitle: data.eventTitle,
      createdAt: new Date().toISOString(),
    }
  );
  return { persisted: ok, id: ok ? id : null };
}

// --- Admin read access (used by /admin only, see src/app/admin) -----------

function safeList<T>(query: () => T[]): T[] {
  try {
    return query();
  } catch (err) {
    console.error("[db] Read failed:", err);
    return [];
  }
}

export function listContactSubmissions(): ContactSubmission[] {
  const conn = getDb();
  if (!conn) return [];
  return safeList(() =>
    conn
      .prepare(`SELECT * FROM contact_submissions ORDER BY created_at DESC`)
      .all()
      .map((r) => rowToContact(r as Record<string, unknown>))
  );
}

export function listMinisterQuestions(): MinisterQuestion[] {
  const conn = getDb();
  if (!conn) return [];
  return safeList(() =>
    conn
      .prepare(`SELECT * FROM minister_questions ORDER BY created_at DESC`)
      .all()
      .map((r) => rowToQuestion(r as Record<string, unknown>))
  );
}

export function listNewsletterSubscribers(): NewsletterSubscriber[] {
  const conn = getDb();
  if (!conn) return [];
  return safeList(() =>
    conn
      .prepare(`SELECT * FROM newsletter_subscribers ORDER BY created_at DESC`)
      .all()
      .map((r) => rowToSubscriber(r as Record<string, unknown>))
  );
}

export function listRsvpSubmissions(): RsvpSubmission[] {
  const conn = getDb();
  if (!conn) return [];
  return safeList(() =>
    conn
      .prepare(`SELECT * FROM rsvp_submissions ORDER BY created_at DESC`)
      .all()
      .map((r) => rowToRsvp(r as Record<string, unknown>))
  );
}

function rowToContact(r: Record<string, unknown>): ContactSubmission {
  return {
    id: String(r.id),
    name: String(r.name),
    email: String(r.email),
    reason: String(r.reason),
    message: String(r.message),
    status: String(r.status),
    createdAt: String(r.created_at),
  };
}
function rowToQuestion(r: Record<string, unknown>): MinisterQuestion {
  return {
    id: String(r.id),
    name: String(r.name),
    district: r.district == null ? null : String(r.district),
    topic: r.topic == null ? null : String(r.topic),
    question: String(r.question),
    status: String(r.status),
    createdAt: String(r.created_at),
  };
}
function rowToSubscriber(r: Record<string, unknown>): NewsletterSubscriber {
  return {
    id: String(r.id),
    email: String(r.email),
    confirmed: Boolean(r.confirmed),
    createdAt: String(r.created_at),
  };
}
function rowToRsvp(r: Record<string, unknown>): RsvpSubmission {
  return {
    id: String(r.id),
    name: String(r.name),
    phone: String(r.phone),
    district: r.district == null ? null : String(r.district),
    eventSlug: String(r.event_slug),
    eventTitle: String(r.event_title),
    createdAt: String(r.created_at),
  };
}

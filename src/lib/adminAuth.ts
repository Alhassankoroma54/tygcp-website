/**
 * Minimal session auth for /admin.
 *
 * Deliberate Phase-2 scope decision: a single shared password (ADMIN_PASSWORD)
 * gates the whole dashboard, not per-user accounts/roles. That's enough to
 * keep submission data private behind a login while the project has one or
 * two people who need to see it, and is explicitly NOT meant to be the final
 * word on admin auth — see README.md "Admin dashboard" for what real
 * multi-user/role-based auth (Phase 3) would replace this with.
 *
 * The session itself is a signed, stateless cookie (HMAC-SHA256 over an
 * expiry timestamp, keyed by ADMIN_SESSION_SECRET) rather than a server-side
 * session store — there's no user/session table to add for a single shared
 * login, and it works the same in a serverless function with no shared
 * memory between invocations.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length > 0 ? secret : null;
}

/** True once both required env vars are set — the dashboard refuses to operate at all otherwise. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && Boolean(getSecret());
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

/** Constant-time string comparison so login/session checks don't leak timing information. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

export function createSessionCookieValue(): string {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function verifySessionCookieValue(value: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !value) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return safeEqual(sign(expiresAt, secret), signature);
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

/**
 * PHASE 4 BATCH 1 addition. Shared server-side guard for any /admin page
 * that doesn't need admin/page.tsx's bespoke "not configured" screen (that
 * one stays as-is, unchanged — this is for the new foundation pages added
 * this batch, and any future ones). Redirects to /admin/login on either
 * "admin isn't configured at all" or "no valid session" — src/proxy.ts
 * already does this same check before the page even starts rendering, so
 * in normal operation this function is a no-op; it exists as the
 * documented defense-in-depth layer the Next.js Proxy docs recommend
 * (proxy coverage can silently break if a future matcher change is wrong;
 * a per-page check can't).
 */
export async function requireAdminSession(): Promise<void> {
  if (!isAdminConfigured()) {
    redirect("/admin/login");
  }
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionCookieValue(session)) {
    redirect("/admin/login");
  }
}

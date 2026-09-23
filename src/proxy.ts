/**
 * PHASE 4 BATCH 1 — admin route protection, centralized.
 *
 * Next.js 16 renamed `middleware.ts` to `proxy.ts` (the `middleware` file
 * convention is deprecated; `proxy` is its direct replacement, defaulting to
 * the Node.js runtime — see the Next.js 16 upgrade guide). This is a NEW
 * file for this project, not a rename of an existing one: there was no
 * middleware.ts before this batch.
 *
 * WHY THIS EXISTS: before this batch, the only server-side auth check was
 * the one hand-written inside src/app/admin/page.tsx. That's genuinely
 * sufficient for that one page (Server Components run on the server; there
 * was no way to bypass it from the client) — but it doesn't scale as a
 * pattern. This batch adds three more pages under /admin (episodes, news,
 * events) as the dashboard-navigation foundation, and every future batch
 * will add more. Repeating the same cookie-read-and-verify snippet in every
 * new page/route is exactly the kind of thing that gets forgotten once —
 * one new admin page that skips it is a real authorization bypass. This
 * file makes protection the default for the whole /admin and /api/admin
 * tree instead, so a new page/route under either has to *opt out*
 * (impossible here — see below) rather than *opt in*.
 *
 * This does NOT replace the per-page check already in admin/page.tsx —
 * that stays as defense-in-depth (the Next.js docs for Proxy explicitly
 * warn: "Always verify authentication and authorization inside each
 * [route/page] rather than relying on Proxy alone," since a future matcher
 * change could silently remove coverage). Belt and suspenders.
 *
 * Reuses the exact same session verification as before
 * (isAdminConfigured / verifySessionCookieValue / SESSION_COOKIE_NAME from
 * src/lib/adminAuth.ts) — no new auth architecture, no new cookie, no
 * change to how sessions are created, signed, or expired.
 */
import { NextResponse, type NextRequest } from "next/server";
import { isAdminConfigured, verifySessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/adminAuth";

// Reachable without a session — because a session is created by posting
// here in the first place, and logout only ever deletes a cookie (it does
// nothing harmful if called without one, so there's no reason to gate it).
const PUBLIC_ADMIN_ROUTES = new Set<string>([
  "/admin/login",
  "/api/admin/login",
  "/api/admin/logout",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authorized = isAdminConfigured() && verifySessionCookieValue(session);
  if (authorized) {
    return NextResponse.next();
  }

  // API routes get a generic JSON 401 (matching the login route's own
  // generic-failure wording) — never a redirect, which would hand back an
  // HTML login page as if it were the requested API response.
  if (pathname.startsWith("/api/admin/")) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

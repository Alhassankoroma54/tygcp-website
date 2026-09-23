import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import {
  isAdminConfigured,
  checkPassword,
  createSessionCookieValue,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/adminAuth";

export async function POST(req: Request) {
  // Same limiter used by the public forms (5 attempts/minute per IP) — cheap
  // but real protection against scripted password guessing.
  const rateLimit = checkRateLimit(`admin-login:${getClientKey(req)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured on this deployment (missing ADMIN_PASSWORD / ADMIN_SESSION_SECRET)." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!password || !checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionCookieValue(), sessionCookieOptions);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { notifyNewsletterSignup } from "@/lib/notify";
import { newsletterSchema } from "@/lib/validation";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { saveNewsletterSubscriber } from "@/lib/db";

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(`newsletter:${getClientKey(req)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (parsed.data.hp_check) {
    return NextResponse.json({ message: "You're subscribed!" });
  }

  const { email } = parsed.data;
  const saved = await saveNewsletterSubscriber(email);
  const emailResult = await notifyNewsletterSignup(email, saved.alreadySubscribed);

  // PRODUCTION HOTFIX: see api/contact/route.ts for the full diagnosis —
  // same fix applied here. saveNewsletterSubscriber() also reports
  // persisted: true for an email that was already subscribed (a real,
  // pre-existing row), so this only rejects a genuine, newly-attempted
  // failure — not the "already on the list" case.
  if (!saved.persisted) {
    console.error("[api/newsletter] Persistence failed for a genuine submission; not reporting success.");
    return NextResponse.json(
      { error: "We couldn't save your submission right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: saved.alreadySubscribed
      ? "You're already on the list — thanks for double-checking!"
      : "You're subscribed! Watch your inbox for episode alerts.",
    persisted: saved.persisted,
    emailed: emailResult.sent,
  });
}

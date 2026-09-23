import { NextResponse } from "next/server";
import { notifyContactSubmission } from "@/lib/notify";
import { contactSchema } from "@/lib/validation";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { saveContactSubmission } from "@/lib/db";

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(`contact:${getClientKey(req)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check your input and try again." },
      { status: 400 }
    );
  }
  if (parsed.data.hp_check) {
    // Honeypot tripped — respond success so the bot doesn't learn anything, but do nothing.
    return NextResponse.json({ message: "Thank you — your message has been received." });
  }

  const { name, email, reason, message } = parsed.data;
  const saved = await saveContactSubmission({ name, email, reason, message });
  // Email notification still fires regardless of persistence outcome
  // (unchanged from before this hotfix) — a DB write failure shouldn't also
  // suppress the one other channel that could still get someone's message
  // in front of a human.
  const emailResult = await notifyContactSubmission({ name, email, reason, message });

  // PRODUCTION HOTFIX: a genuine (non-honeypot) submission that fails to
  // persist must not be told it succeeded — this exact silent-failure shape
  // (write skipped or failed, response still claims success) previously
  // masked a false-positive honeypot trip caused by browser-autofill
  // populating the old "company"-named field (see Honeypot in
  // FormShell.tsx). The error message stays generic on purpose — no DB
  // internals, no stack trace, no hint of *why* persistence failed — full
  // diagnostic detail is server-side only (see the [db] logs in db.ts).
  if (!saved.persisted) {
    console.error("[api/contact] Persistence failed for a genuine submission; not reporting success.");
    return NextResponse.json(
      { error: "We couldn't save your submission right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Thank you — your message has been received. We'll get back to you soon.",
    persisted: saved.persisted,
    emailed: emailResult.sent,
  });
}

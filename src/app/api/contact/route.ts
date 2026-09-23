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
  if (parsed.data.company) {
    // Honeypot tripped — respond success so the bot doesn't learn anything, but do nothing.
    return NextResponse.json({ message: "Thank you — your message has been received." });
  }

  const { name, email, reason, message } = parsed.data;
  const saved = saveContactSubmission({ name, email, reason, message });
  const emailResult = await notifyContactSubmission({ name, email, reason, message });

  return NextResponse.json({
    message: "Thank you — your message has been received. We'll get back to you soon.",
    persisted: saved.persisted,
    emailed: emailResult.sent,
  });
}

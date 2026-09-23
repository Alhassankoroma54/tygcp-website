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
  if (parsed.data.company) {
    return NextResponse.json({ message: "You're subscribed!" });
  }

  const { email } = parsed.data;
  const saved = saveNewsletterSubscriber(email);
  const emailResult = await notifyNewsletterSignup(email, saved.alreadySubscribed);

  return NextResponse.json({
    message: saved.alreadySubscribed
      ? "You're already on the list — thanks for double-checking!"
      : "You're subscribed! Watch your inbox for episode alerts.",
    persisted: saved.persisted,
    emailed: emailResult.sent,
  });
}

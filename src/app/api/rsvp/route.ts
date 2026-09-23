import { NextResponse } from "next/server";
import { notifyRsvp } from "@/lib/notify";
import { rsvpSchema } from "@/lib/validation";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { saveRsvpSubmission } from "@/lib/db";
import { getEventBySlug } from "@/data/events";

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(`rsvp:${getClientKey(req)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check your input and try again." },
      { status: 400 }
    );
  }
  if (parsed.data.company) {
    return NextResponse.json({ message: "You're registered!" });
  }

  const { name, phone, district, event, eventSlug } = parsed.data;

  // Server-side enforcement, independent of the UI: the RSVP form only
  // renders for events getUpcomingEvents() considers open, but that's a
  // client-side convenience, not a security boundary — a request posted
  // directly to this endpoint must be re-checked against the same rules
  // (event exists, hasn't already happened, and has registration open)
  // rather than trusting whatever eventSlug/event the client sends.
  const matchedEvent = getEventBySlug(eventSlug);
  const eventHasPassed = !matchedEvent || new Date(matchedEvent.date).getTime() < Date.now();
  if (!matchedEvent || eventHasPassed || !matchedEvent.registrationOpen) {
    return NextResponse.json(
      { error: "Registration for this event is no longer open." },
      { status: 400 }
    );
  }

  const saved = await saveRsvpSubmission({ name, phone, district: district || undefined, eventSlug, eventTitle: event });
  const emailResult = await notifyRsvp({ name, phone, district: district || undefined, event });

  return NextResponse.json({
    message: "You're registered! We'll be in touch with more details.",
    persisted: saved.persisted,
    emailed: emailResult.sent,
  });
}

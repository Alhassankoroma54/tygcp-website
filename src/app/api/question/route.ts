import { NextResponse } from "next/server";
import { notifyMinisterQuestion } from "@/lib/notify";
import { questionSchema } from "@/lib/validation";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { saveMinisterQuestion } from "@/lib/db";

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(`question:${getClientKey(req)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = questionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check your input and try again." },
      { status: 400 }
    );
  }
  if (parsed.data.company) {
    return NextResponse.json({ message: "Thank you! Your question has been submitted." });
  }

  const { name, district, topic, question } = parsed.data;
  const saved = saveMinisterQuestion({ name, district: district || undefined, topic: topic || undefined, question });
  const emailResult = await notifyMinisterQuestion({
    name,
    district: district || undefined,
    topic: topic || undefined,
    question,
  });

  return NextResponse.json({
    message: "Thank you! Your question has been submitted and may be featured on an upcoming episode.",
    persisted: saved.persisted,
    emailed: emailResult.sent,
  });
}

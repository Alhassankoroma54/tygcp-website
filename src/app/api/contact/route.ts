import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }

  await notify("New contact form message", body);

  return NextResponse.json({
    message: "Thank you — your message has been received. We'll get back to you soon.",
  });
}

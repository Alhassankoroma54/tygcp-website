import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.phone || !body.event) {
    return NextResponse.json({ error: "Please share your name and phone number." }, { status: 400 });
  }

  await notify(`New event registration: ${body.event}`, body);

  return NextResponse.json({ message: "You're registered! We'll be in touch with more details." });
}

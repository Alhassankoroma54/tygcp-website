import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = body?.email;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  await notify("New newsletter subscriber", { email });

  return NextResponse.json({ message: "You're subscribed! Watch your inbox for episode alerts." });
}

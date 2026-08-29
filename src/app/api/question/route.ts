import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.question) {
    return NextResponse.json({ error: "Please share your name and your question." }, { status: 400 });
  }

  await notify("New audience question", body);

  return NextResponse.json({
    message: "Thank you! Your question has been submitted and may be featured on an upcoming episode.",
  });
}

/**
 * Outbound email notifications for form submissions (contact, Ask the
 * Minister question, RSVP, newsletter signup).
 *
 * Durable storage now happens separately, in src/lib/db.ts — this file's
 * only job is telling a human at YIGSIL that something came in. The two are
 * intentionally decoupled: a submission is saved to the database (when
 * persistence is available, see db.ts) regardless of whether email succeeds,
 * and email is attempted regardless of whether the database write succeeded,
 * so a problem with one never causes a submission to be silently lost.
 *
 * Configuration: set RESEND_API_KEY and NOTIFY_TO_EMAIL as environment
 * variables (see .env.example) — both server-only, never sent to the client,
 * never referenced from any "use client" file. Free tier: https://resend.com
 *
 * Without them, every call below still logs to the server console (visible
 * in Vercel → your project → Deployments → the deployment → Functions →
 * Logs) and returns `{ sent: false }` — the API route can inspect that
 * return value rather than assuming email succeeded.
 */

type NotifyResult = { sent: boolean; error?: string };

async function sendEmail(subject: string, html: string, text: string): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_TO_EMAIL;

  if (!apiKey || !to) {
    return { sent: false, error: "RESEND_API_KEY/NOTIFY_TO_EMAIL not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "TYGCP Website <onboarding@resend.dev>",
        to,
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, error: `Resend API responded ${res.status}: ${body.slice(0, 300)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRows(fields: Record<string, string | undefined>): string {
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#5b6572;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(
          label
        )}</td><td style="padding:4px 0">${escapeHtml(value as string).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");
}

function wrapHtml(heading: string, bodyHtml: string): string {
  return `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:#0a1b33;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
      <p style="margin:0;font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:#86efac;font-weight:700">TYGCP Website</p>
      <h1 style="margin:6px 0 0;font-size:18px">${escapeHtml(heading)}</h1>
    </div>
    <div style="border:1px solid #e5e9f0;border-top:none;border-radius:0 0 12px 12px;padding:20px 24px">
      <table style="border-collapse:collapse;font-size:14px;color:#0e1b2c">${bodyHtml}</table>
    </div>
  </div>`;
}

export async function notifyContactSubmission(data: {
  name: string;
  email: string;
  reason: string;
  message: string;
}): Promise<NotifyResult> {
  console.log("[TYGCP submission] contact", data);
  const html = wrapHtml("New contact form message", fieldRows(data));
  const text = `New contact message\nName: ${data.name}\nEmail: ${data.email}\nReason: ${data.reason}\n\n${data.message}`;
  return sendEmail(`New contact message from ${data.name}`, html, text);
}

export async function notifyMinisterQuestion(data: {
  name: string;
  district?: string;
  topic?: string;
  question: string;
}): Promise<NotifyResult> {
  console.log("[TYGCP submission] question", data);
  const html = wrapHtml("New audience question", fieldRows(data));
  const text = `New question\nName: ${data.name}\nDistrict: ${data.district ?? "—"}\nTopic: ${
    data.topic ?? "—"
  }\n\n${data.question}`;
  return sendEmail(`New question from ${data.name}`, html, text);
}

export async function notifyNewsletterSignup(email: string, alreadySubscribed: boolean): Promise<NotifyResult> {
  console.log("[TYGCP submission] newsletter", { email, alreadySubscribed });
  if (alreadySubscribed) return { sent: false, error: "already subscribed, no notification sent" };
  const html = wrapHtml("New newsletter subscriber", fieldRows({ Email: email }));
  return sendEmail(`New newsletter subscriber: ${email}`, html, `New newsletter subscriber: ${email}`);
}

export async function notifyRsvp(data: {
  name: string;
  phone: string;
  district?: string;
  event: string;
}): Promise<NotifyResult> {
  console.log("[TYGCP submission] rsvp", data);
  const html = wrapHtml(`New RSVP: ${data.event}`, fieldRows(data));
  const text = `New RSVP for ${data.event}\nName: ${data.name}\nPhone: ${data.phone}\nDistrict: ${
    data.district ?? "—"
  }`;
  return sendEmail(`New RSVP: ${data.event}`, html, text);
}

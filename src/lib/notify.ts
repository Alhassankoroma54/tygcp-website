/**
 * Central place for form submissions (contact, question, newsletter, RSVP).
 *
 * Vercel's serverless functions have no persistent filesystem or database, so this
 * currently just validates input and logs to the function's console (visible in the
 * Vercel dashboard under Deployments → Functions → Logs).
 *
 * To actually receive these submissions by email, sign up for a free Resend account
 * (https://resend.com), add RESEND_API_KEY and NOTIFY_TO_EMAIL as environment
 * variables in the Vercel project settings, and uncomment the fetch call below.
 * Alternatively, swap this for Formspree, a Google Sheet via Apps Script, or any
 * database of your choice (e.g. Vercel Postgres, Supabase, Airtable).
 */
export async function notify(subject: string, data: Record<string, unknown>) {
  console.log(`[TYGCP submission] ${subject}`, data);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_TO_EMAIL;

  if (!apiKey || !to) {
    // Not configured yet — submission is logged only. See comment above.
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "TYGCP Website <onboarding@resend.dev>",
        to,
        subject: `TYGCP website: ${subject}`,
        text: JSON.stringify(data, null, 2),
      }),
    });
  } catch (err) {
    console.error("Failed to send notification email", err);
  }
}

import { z } from "zod";

/**
 * Shared honeypot field: a form field that's visually hidden from real users
 * (via CSS, not `type="hidden"`, so basic bots that skip hidden inputs still
 * fill it) but present in the DOM for scripted submitters to find and fill.
 * Any non-empty value here means the submission is treated as spam.
 *
 * Deliberately unconstrained here (not `.max(0)`): each API route checks
 * `parsed.data.company` itself and returns a normal-looking success response
 * without saving anything, so a scripted submitter gets no signal that it
 * was caught. An earlier version of this field rejected a non-empty value
 * at the schema level with a distinctive "Spam check failed" 400 error —
 * which defeated that goal by handing bots exactly the tell they weren't
 * supposed to get, and never actually reached each route's fake-success
 * branch at all. Real users never see this field, so it doesn't need
 * message-quality validation of its own.
 */
const honeypot = z.string().optional();

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  reason: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1, "Please enter a message.").max(5000),
  company: honeypot,
});

export const questionSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200),
  district: z.string().trim().max(200).optional().or(z.literal("")),
  topic: z.string().trim().max(200).optional().or(z.literal("")),
  question: z.string().trim().min(1, "Please enter your question.").max(3000),
  company: honeypot,
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  company: honeypot,
});

export const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200),
  phone: z.string().trim().min(3, "Please enter a valid phone number.").max(40),
  district: z.string().trim().max(200).optional().or(z.literal("")),
  event: z.string().trim().min(1).max(300),
  eventSlug: z.string({ error: "Something went wrong — please refresh and try again." }).trim().min(1).max(200),
  company: honeypot,
});

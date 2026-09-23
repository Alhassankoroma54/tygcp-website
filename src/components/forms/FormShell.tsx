"use client";

import { useState } from "react";

export type FormStatus = "idle" | "loading" | "success" | "error";

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");

  /**
   * Submits `data` to `endpoint`. Returns `true` on success and `false` on
   * failure so callers can decide what to do next — in particular, resetting
   * the form's own field state only when the submission actually succeeded.
   * `status === "loading"` is also exposed so a submit button can be
   * disabled for the duration, preventing duplicate submissions from a
   * second click or an impatient double-tap.
   */
  async function submit(data: Record<string, unknown>): Promise<boolean> {
    if (status === "loading") return false;
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      setMessage(json.message || "Thank you — we received your submission.");
      return true;
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      return false;
    }
  }

  return { status, message, submit, reset: () => setStatus("idle") };
}

export function FormNote({ status, message }: { status: FormStatus; message: string }) {
  if (status === "idle" || status === "loading") return null;
  return (
    <p
      role={status === "success" ? "status" : "alert"}
      aria-live="polite"
      className={
        status === "success"
          ? "rounded-lg bg-green-ink/10 px-3 py-2 text-sm font-medium text-green-ink"
          : "rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
      }
    >
      {message}
    </p>
  );
}

/**
 * Honeypot field shared by every form: visually hidden (not `type="hidden"`,
 * so unsophisticated bots that skip actual hidden inputs still find and fill
 * it) but present in the DOM and reachable by scripted submitters. A human
 * using a mouse, keyboard, or screen reader never encounters it — it's
 * removed from the tab order and hidden from assistive tech. Any non-empty
 * value here is treated as spam by the API route (see src/lib/validation.ts).
 */
export function Honeypot({
  value,
  onChange,
  idPrefix = "form",
}: {
  value: string;
  onChange: (value: string) => void;
  /** Distinguishes this field's id when a form (e.g. RsvpForm) can render
   *  more than once on the same page, avoiding duplicate DOM ids. */
  idPrefix?: string;
}) {
  const id = `${idPrefix}-company`;
  return (
    <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

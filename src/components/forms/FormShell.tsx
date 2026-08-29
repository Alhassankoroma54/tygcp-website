"use client";

import { useState } from "react";

export type FormStatus = "idle" | "loading" | "success" | "error";

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");

  async function submit(data: Record<string, unknown>) {
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      setMessage(json.message || "Thank you — we received your submission.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return { status, message, submit, reset: () => setStatus("idle") };
}

export function FormNote({ status, message }: { status: FormStatus; message: string }) {
  if (status === "idle" || status === "loading") return null;
  return (
    <p
      className={
        status === "success"
          ? "rounded-lg bg-green/10 px-3 py-2 text-sm font-medium text-green"
          : "rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
      }
    >
      {message}
    </p>
  );
}

"use client";

import { useState } from "react";
import { useFormSubmit, FormNote, Honeypot } from "./FormShell";
import Button from "../Button";

export default function NewsletterForm({ light = false }: { light?: boolean }) {
  const [email, setEmail] = useState("");
  const [hpCheck, setHpCheck] = useState("");
  const { status, message, submit } = useFormSubmit("/api/newsletter");
  const inputId = light ? "newsletter-email-light" : "newsletter-email";

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const ok = await submit({ email, hp_check: hpCheck });
        if (ok) setEmail("");
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={
            light
              ? "w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-green focus:outline-none"
              : "w-full rounded-full border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-foreground/60 focus:border-green focus:outline-none"
          }
        />
        <Button type="submit" variant="primary" className="shrink-0" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Subscribe"}
        </Button>
      </div>
      <Honeypot value={hpCheck} onChange={setHpCheck} />
      <FormNote status={status} message={message} />
    </form>
  );
}

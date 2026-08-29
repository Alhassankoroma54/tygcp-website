"use client";

import { useState } from "react";
import { useFormSubmit, FormNote } from "./FormShell";
import Button from "../Button";

export default function NewsletterForm({ light = false }: { light?: boolean }) {
  const [email, setEmail] = useState("");
  const { status, message, submit } = useFormSubmit("/api/newsletter");

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit({ email });
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={
            light
              ? "w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-green focus:outline-none"
              : "w-full rounded-full border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-foreground/40 focus:border-green focus:outline-none"
          }
        />
        <Button type="submit" variant="primary" className="shrink-0">
          {status === "loading" ? "Sending…" : "Subscribe"}
        </Button>
      </div>
      <FormNote status={status} message={message} />
    </form>
  );
}

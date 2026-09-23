"use client";

import { useState } from "react";
import { useFormSubmit, FormNote, Honeypot } from "./FormShell";
import Button from "../Button";

const emptyForm = { name: "", phone: "", district: "", company: "" };

export default function RsvpForm({ eventTitle, eventSlug }: { eventTitle: string; eventSlug: string }) {
  const [form, setForm] = useState(emptyForm);
  const { status, message, submit } = useFormSubmit("/api/rsvp");
  const idPrefix = `rsvp-${eventSlug}`;

  return (
    <form
      className="grid gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const ok = await submit({ ...form, event: eventTitle, eventSlug });
        if (ok) setForm(emptyForm);
      }}
    >
      <label htmlFor={`${idPrefix}-name`} className="sr-only">
        Full name
      </label>
      <input
        id={`${idPrefix}-name`}
        required
        autoComplete="name"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="input"
      />
      <label htmlFor={`${idPrefix}-phone`} className="sr-only">
        Phone number
      </label>
      <input
        id={`${idPrefix}-phone`}
        required
        type="tel"
        autoComplete="tel"
        placeholder="Phone number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="input"
      />
      <label htmlFor={`${idPrefix}-district`} className="sr-only">
        District / location
      </label>
      <input
        id={`${idPrefix}-district`}
        placeholder="District / location"
        value={form.district}
        onChange={(e) => setForm({ ...form, district: e.target.value })}
        className="input"
      />
      <Honeypot value={form.company} onChange={(company) => setForm({ ...form, company })} idPrefix={idPrefix} />
      <Button type="submit" variant="primary" className="w-fit" disabled={status === "loading"}>
        {status === "loading" ? "Registering…" : "Register to Attend"}
      </Button>
      <FormNote status={status} message={message} />
    </form>
  );
}

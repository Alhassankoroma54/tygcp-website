"use client";

import { useState } from "react";
import { useFormSubmit, FormNote } from "./FormShell";
import Button from "../Button";

const reasons = [
  "General enquiry",
  "Partnership / sponsorship",
  "Be a guest",
  "Media enquiry",
  "Complaint / feedback",
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", reason: reasons[0], message: "" });
  const { status, message, submit } = useFormSubmit("/api/contact");

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit(form);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Email address">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
          />
        </Field>
      </div>
      <Field label="Reason for contact">
        <select
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="input"
        >
          {reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input resize-none"
        />
      </Field>
      <Button type="submit" variant="primary" className="w-fit">
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>
      <FormNote status={status} message={message} />
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
      {label}
      {children}
    </label>
  );
}

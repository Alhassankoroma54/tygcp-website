"use client";

import { useState } from "react";
import { useFormSubmit, FormNote, Honeypot } from "./FormShell";
import Button from "../Button";

const emptyForm = { name: "", district: "", topic: "", question: "", company: "" };

export default function QuestionForm() {
  const [form, setForm] = useState(emptyForm);
  const { status, message, submit } = useFormSubmit("/api/question");

  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const ok = await submit(form);
        if (ok) setForm(emptyForm);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name">
          <input
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="District / location">
          <input
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            className="input"
          />
        </Field>
      </div>
      <Field label="Topic">
        <input
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          placeholder="e.g. Youth employment, local governance"
          className="input"
        />
      </Field>
      <Field label="Your question or topic suggestion">
        <textarea
          required
          rows={4}
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="input resize-none"
        />
      </Field>
      <Honeypot value={form.company} onChange={(company) => setForm({ ...form, company })} />
      <Button type="submit" variant="primary" className="w-fit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Submit Your Question"}
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

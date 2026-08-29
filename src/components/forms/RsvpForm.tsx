"use client";

import { useState } from "react";
import { useFormSubmit, FormNote } from "./FormShell";
import Button from "../Button";

export default function RsvpForm({ eventTitle }: { eventTitle: string }) {
  const [form, setForm] = useState({ name: "", phone: "", district: "" });
  const { status, message, submit } = useFormSubmit("/api/rsvp");

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit({ ...form, event: eventTitle });
      }}
    >
      <input
        required
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="input"
      />
      <input
        required
        placeholder="Phone number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="input"
      />
      <input
        placeholder="District / location"
        value={form.district}
        onChange={(e) => setForm({ ...form, district: e.target.value })}
        className="input"
      />
      <Button type="submit" variant="primary" className="w-fit">
        {status === "loading" ? "Registering…" : "Register to Attend"}
      </Button>
      <FormNote status={status} message={message} />
    </form>
  );
}

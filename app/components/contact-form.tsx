"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
      form.reset();
      toast.success("Message received. I'll get back to you.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        <span className="mono">name</span>
        <Input name="name" required maxLength={100} autoComplete="name" />
      </label>
      <label>
        <span className="mono">email</span>
        <Input name="email" type="email" required maxLength={200} autoComplete="email" />
      </label>
      <label>
        <span className="mono">message</span>
        <textarea name="message" required rows={5} maxLength={2000} />
      </label>
      <Button type="submit" disabled={sending} className="justify-self-start">
        {sending ? "sending…" : "send →"}
      </Button>
    </form>
  );
}

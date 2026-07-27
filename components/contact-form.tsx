"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { GlowButton } from "@/components/ui";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErr(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.name?.trim()) return setErr("Your name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) return setErr("A valid email is required.");
    if (!data.message?.trim()) return setErr("Tell us how we can help.");

    setBusy(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "information_request", company: data.name, ...data }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "The message could not be delivered.");
      setSent(true);
      form.reset();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "The message could not be delivered. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-vanguard-teal/40 bg-vanguard-teal/10 p-6 text-center" role="status">
        <CheckCircle className="mx-auto text-vanguard-teal" />
        <div className="mt-2 font-semibold text-bone">Message sent</div>
        <p className="mt-1 text-sm text-muted">Your inquiry was saved securely and sent to the Vanguard team.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 text-xs text-vanguard-violet hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <Input name="name" label="Name *" autoComplete="name" required />
      <Input name="email" label="Email *" type="email" autoComplete="email" required />
      <Input name="topic" label="Topic (research, wholesale, partnership…)" autoComplete="off" />
      <label className="block">
        <span className="mb-1 block text-[11px] font-medium text-muted">How can we help? *</span>
        <textarea name="message" rows={5} required placeholder="How can we help?" className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted focus:border-vanguard-violet/60" />
      </label>
      {err && <p className="text-xs text-vanguard-rose" role="alert">{err}</p>}
      <GlowButton type="submit">{busy ? "Sending securely…" : "Send message"}</GlowButton>
    </form>
  );
}

function Input({ name, label, type = "text", autoComplete, required = false }: { name: string; label: string; type?: string; autoComplete?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} required={required} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none focus:border-vanguard-violet/60" />
    </label>
  );
}

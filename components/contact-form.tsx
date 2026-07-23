"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { GlowButton } from "@/components/ui";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (!data.name || !data.email) { setErr("Name and email are required."); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "information_request", company: data.name, ...data }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-vanguard-teal/40 bg-vanguard-teal/10 p-6 text-center">
        <CheckCircle className="mx-auto text-vanguard-teal" />
        <div className="mt-2 font-semibold text-bone">Message sent</div>
        <p className="mt-1 text-sm text-muted">Thanks — we&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input name="name" label="Name *" />
      <Input name="email" label="Email *" type="email" />
      <Input name="topic" label="Topic (demo, wholesale, partnership…)" />
      <textarea name="message" rows={4} placeholder="How can we help?"
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted" />
      {err && <p className="text-xs text-vanguard-rose">{err}</p>}
      <GlowButton type="submit">{busy ? "Sending…" : "Send message"}</GlowButton>
    </form>
  );
}

function Input({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type}
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none" />
    </label>
  );
}

"use client";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { ACTION_LABEL, type OrderingMode } from "@/types";
import { GlowButton } from "@/components/ui";

export function B2BForm({
  product, action, allowed,
}: { product: string; action: OrderingMode; allowed: OrderingMode[] }) {
  const [mode, setMode] = useState<OrderingMode>(action);

  // Honor ?action= from a deep link, but only if it's actually allowed (validated).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("action") as OrderingMode | null;
    if (p && allowed.includes(p)) setMode(p);
  }, [allowed]);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (!data.company || !data.email) { setErr("Company and email are required."); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, mode, ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setErr("Something went wrong. Please try again or email us directly.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-vanguard-teal/40 bg-vanguard-teal/10 p-5 text-center">
        <CheckCircle className="mx-auto text-vanguard-teal" />
        <div className="mt-2 font-semibold text-bone">Request received</div>
        <p className="mt-1 text-sm text-muted">Our team will review your {ACTION_LABEL[mode].toLowerCase()} and follow up shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {allowed.length > 1 && (
        <select value={mode} onChange={(e) => setMode(e.target.value as OrderingMode)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone">
          {allowed.map((a) => <option key={a} value={a} className="bg-ink-1">{ACTION_LABEL[a]}</option>)}
        </select>
      )}
      <Field name="company" label="Company / Practice *" />
      <Field name="name" label="Contact name" />
      <Field name="email" label="Work email *" type="email" />
      <Field name="phone" label="Phone" />
      {(mode === "quote_only" || mode === "po_only") && (
        <div className="grid grid-cols-2 gap-3">
          <Field name="quantity" label="Quantity" />
          <Field name="size" label="Size / format" />
        </div>
      )}
      {mode === "po_only" && <Field name="po_number" label="Customer PO number" />}
      <textarea name="message" rows={3} placeholder="Notes"
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted" />
      {err && <p className="text-xs text-vanguard-rose">{err}</p>}
      <p className="text-[10px] text-muted">A PO number or reference here does not constitute an approved or paid order. All requests are reviewed by our team.</p>
      <GlowButton type="submit">{busy ? "Sending…" : ACTION_LABEL[mode]}</GlowButton>
    </form>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <input name={name} type={type}
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none" />
    </label>
  );
}

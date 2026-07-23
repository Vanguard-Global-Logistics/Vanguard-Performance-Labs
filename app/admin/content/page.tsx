"use client";
import { useState } from "react";
import Link from "next/link";
import { GlassCard, GlowButton } from "@/components/ui";
import { COMPOUNDS } from "@/lib/content";
import type { Article } from "@/lib/articles-store";

export default function ContentQueue() {
  const [token, setToken] = useState("");
  const [items, setItems] = useState<Article[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [draftBody, setDraftBody] = useState("");
  const [compound, setCompound] = useState("");

  async function load(t = token) {
    setErr(null);
    const res = await fetch("/api/admin/drafts", { headers: { Authorization: `Bearer ${t}` } });
    if (!res.ok) { setErr(res.status === 401 ? "Invalid token." : "Failed to load."); return; }
    setItems((await res.json()).articles);
  }

  async function generate() {
    setBusy(true); setErr(null);
    try {
      const res = await fetch("/api/admin/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(compound ? { compoundSlug: compound } : { count: 2 }),
      });
      const d = await res.json();
      if (!res.ok) { setErr(d.error ?? "Generation failed."); return; }
      await load();
    } finally { setBusy(false); }
  }

  async function patch(id: string, payload: Record<string, unknown>) {
    setBusy(true);
    try {
      await fetch("/api/admin/drafts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, ...payload }),
      });
      setEditing(null);
      await load();
    } finally { setBusy(false); }
  }

  if (items === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <GlassCard className="p-6">
          <h1 className="font-display text-xl font-bold text-bone">Content Queue</h1>
          <p className="mt-1 text-xs text-muted">AI drafts articles. You approve before anything publishes.</p>
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()} placeholder="Admin token" aria-label="Admin token"
            className="mt-4 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none" />
          {err && <p className="mt-2 text-xs text-vanguard-rose">{err}</p>}
          <div className="mt-4"><GlowButton onClick={() => load()}>Open Queue</GlowButton></div>
        </GlassCard>
      </div>
    );
  }

  const drafts = items.filter((a) => a.status === "draft");
  const approved = items.filter((a) => a.status === "approved");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-black text-bone">Content Queue</h1>
        <Link href="/admin" className="text-xs text-vanguard-violet hover:underline">← Orders</Link>
        <div className="ml-auto flex items-center gap-2">
          <select value={compound} onChange={(e) => setCompound(e.target.value)}
            aria-label="Compound" className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-xs text-bone">
            <option value="" className="bg-ink-1">Any (2 drafts)</option>
            {COMPOUNDS.map((c) => <option key={c.slug} value={c.slug} className="bg-ink-1">{c.name}</option>)}
          </select>
          <button onClick={generate} disabled={busy}
            className="rounded-lg bg-vg-grad px-4 py-2 text-xs font-bold text-ink-0 disabled:opacity-50">
            {busy ? "Generating…" : "Generate drafts"}
          </button>
        </div>
      </div>
      {err && <p className="mt-2 text-xs text-vanguard-rose">{err}</p>}

      <p className="mt-4 rounded-lg border border-vanguard-amber/30 bg-vanguard-amber/[0.06] px-3 py-2 text-xs text-muted">
        <span className="font-bold text-vanguard-amber">Review before approving.</span> Check every claim, remove
        anything that reads as medical advice, and verify there are no invented statistics or citations.
        Nothing is publicly visible until you approve it.
      </p>

      <h2 className="mt-8 font-display text-lg font-bold text-bone">Awaiting review ({drafts.length})</h2>
      <div className="mt-3 space-y-4">
        {drafts.length === 0 && <p className="text-sm text-muted">No drafts waiting.</p>}
        {drafts.map((a) => (
          <GlassCard key={a.id} className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2 py-0.5 text-[10px] font-semibold text-vanguard-violet">{a.compound_slug}</span>
              <span className="text-[10px] text-muted">{new Date(a.created_at).toLocaleString()}</span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold text-bone">{a.title}</h3>
            <p className="mt-1 text-xs italic text-muted">{a.summary}</p>
            <p className="mt-2 text-xs font-semibold text-vanguard-amber">Evidence: {a.evidence_note}</p>
            {editing === a.id ? (
              <textarea value={draftBody} onChange={(e) => setDraftBody(e.target.value)} rows={12}
                className="mt-3 w-full rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-bone outline-none" />
            ) : (
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                {a.body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {editing === a.id ? (
                <>
                  <button onClick={() => patch(a.id, { body: draftBody })} disabled={busy}
                    className="rounded-lg bg-vg-grad px-3 py-1.5 text-xs font-bold text-ink-0 disabled:opacity-50">Save edits</button>
                  <button onClick={() => setEditing(null)} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold text-bone">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => patch(a.id, { status: "approved" })} disabled={busy}
                    className="rounded-lg bg-vg-grad px-3 py-1.5 text-xs font-bold text-ink-0 disabled:opacity-50">Approve &amp; publish</button>
                  <button onClick={() => { setEditing(a.id); setDraftBody(a.body); }}
                    className="rounded-lg border border-vanguard-violet/40 px-3 py-1.5 text-xs font-bold text-vanguard-violet">Edit</button>
                  <button onClick={() => patch(a.id, { status: "rejected" })} disabled={busy}
                    className="rounded-lg border border-vanguard-rose/40 px-3 py-1.5 text-xs font-bold text-vanguard-rose disabled:opacity-50">Reject</button>
                </>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg font-bold text-bone">Published ({approved.length})</h2>
      <div className="mt-3 space-y-2">
        {approved.map((a) => (
          <div key={a.id} className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2 text-sm">
            <Link href={`/articles/${a.slug}`} className="flex-1 text-bone hover:text-vanguard-violet">{a.title}</Link>
            <button onClick={() => patch(a.id, { status: "draft" })} className="text-[11px] text-muted hover:text-vanguard-rose">Unpublish</button>
          </div>
        ))}
      </div>
    </div>
  );
}

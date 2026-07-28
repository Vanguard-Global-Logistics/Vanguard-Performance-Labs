"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, FileEdit, RefreshCw, Sparkles } from "lucide-react";
import { GlassCard, GlowButton } from "@/components/ui";
import { COMPOUNDS } from "@/lib/content";
import type { Article } from "@/lib/articles-store";

type EditState = {
  id: string;
  title: string;
  summary: string;
  body: string;
  evidence_note: string;
};

export default function ContentQueue() {
  const [token, setToken] = useState("");
  const [items, setItems] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [compound, setCompound] = useState("");

  async function load(value = token) {
    setError(null);
    try {
      const response = await fetch("/api/admin/drafts", {
        headers: { Authorization: `Bearer ${value}` },
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setError(response.status === 401 ? "Invalid admin token." : data.error ?? "The content queue could not be loaded.");
        return;
      }
      setItems(Array.isArray(data.articles) ? data.articles : []);
    } catch {
      setError("The content queue could not reach the server.");
    }
  }

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(compound ? { compoundSlug: compound } : { count: 2 }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setError(data.error ?? `Draft generation failed${data.failed?.length ? ` for ${data.failed.join(", ")}` : ""}.`);
        return;
      }
      if (Array.isArray(data.failed) && data.failed.length) {
        setError(`Generated ${data.created} draft(s); failed: ${data.failed.join(", ")}.`);
      }
      await load();
    } catch {
      setError("Draft generation could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  async function patch(id: string, payload: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/drafts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, ...payload }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setError(data.error ?? "The content update failed.");
        return false;
      }
      setEditing(null);
      await load();
      return true;
    } catch {
      setError("The content update could not reach the server.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  if (items === null) {
    return (
      <div className="launch-page">
        <section className="mx-auto mt-10 max-w-lg">
          <GlassCard className="p-7">
            <div className="launch-kicker">Owner Editorial Access</div>
            <h1 className="mt-3 font-serif text-4xl font-normal text-bone">Vanguard content review queue</h1>
            <p className="mt-3 text-sm leading-7 text-muted">AI creates private drafts only. A human must inspect every claim and explicitly approve publication.</p>
            <input type="password" value={token} onChange={(event) => setToken(event.target.value)} onKeyDown={(event) => event.key === "Enter" && load()} placeholder="Admin token" aria-label="Admin token" autoComplete="current-password" className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-bone outline-none focus:border-vanguard-violet/60" />
            {error && <p className="mt-3 text-xs text-vanguard-rose" role="alert">{error}</p>}
            <div className="mt-5"><GlowButton onClick={() => load()}>Open content queue</GlowButton></div>
          </GlassCard>
        </section>
      </div>
    );
  }

  const drafts = items.filter((article) => article.status === "draft");
  const approved = items.filter((article) => article.status === "approved");
  const rejected = items.filter((article) => article.status === "rejected");

  return (
    <div className="launch-page admin-content-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Owner Editorial Command</div>
          <h1>AI can draft. Only a human can publish.</h1>
          <p>Generate one compound-specific draft or a maximum batch of two, edit every field, verify the evidence, and approve only after the article can survive a skeptical review.</p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{drafts.length}</strong><span>Awaiting review</span></div>
          <div><strong>{approved.length}</strong><span>Published</span></div>
          <div><strong>{rejected.length}</strong><span>Rejected</span></div>
          <div><strong>2 MAX</strong><span>Drafts per request</span></div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-vanguard-amber/30 bg-vanguard-amber/[0.06] p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-vanguard-amber" />
          <div>
            <h2 className="text-sm font-bold text-bone">Publication gate</h2>
            <p className="mt-1 text-xs leading-6 text-muted">Verify every claim, remove medical advice, confirm the evidence note, and reject invented citations or statistics. Generated text is never public until the owner approves it.</p>
          </div>
        </div>
      </section>

      <section className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
        <select value={compound} onChange={(event) => setCompound(event.target.value)} aria-label="Compound for article generation" className="min-w-[240px] flex-1 rounded-xl border border-white/10 bg-[#0b0917] px-3 py-3 text-sm text-bone outline-none">
          <option value="">Generate two catalog drafts</option>
          {COMPOUNDS.map((item) => <option key={item.slug} value={item.slug}>{item.name} — one draft</option>)}
        </select>
        <button type="button" onClick={generate} disabled={busy} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] px-5 py-3 text-sm font-bold text-[#130f08] disabled:opacity-50"><Sparkles size={16} /> {busy ? "Generating…" : "Generate private draft(s)"}</button>
        <button type="button" onClick={() => load()} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-muted hover:text-bone"><RefreshCw size={15} /> Refresh</button>
      </section>

      {error && <p className="mt-4 rounded-xl border border-vanguard-rose/30 bg-vanguard-rose/[0.06] px-4 py-3 text-xs text-vanguard-rose" role="alert">{error}</p>}

      <section className="mt-8">
        <div className="launch-section-heading">
          <div className="launch-kicker">Awaiting human review</div>
          <h2>Private drafts ({drafts.length})</h2>
        </div>
        <div className="mt-4 space-y-4">
          {!drafts.length && <GlassCard className="p-8 text-center text-muted">No drafts are waiting for review.</GlassCard>}
          {drafts.map((article) => {
            const isEditing = editing?.id === article.id;
            return (
              <GlassCard key={article.id} className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-1 text-[10px] font-semibold text-vanguard-violet">{article.compound_slug}</span>
                  <span className="text-[10px] text-muted">{new Date(article.created_at).toLocaleString()}</span>
                </div>

                {isEditing && editing ? (
                  <div className="mt-5 space-y-3">
                    <EditorField label="Title"><input value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} /></EditorField>
                    <EditorField label="Summary"><textarea rows={2} value={editing.summary} onChange={(event) => setEditing({ ...editing, summary: event.target.value })} /></EditorField>
                    <EditorField label="Evidence note"><textarea rows={2} value={editing.evidence_note} onChange={(event) => setEditing({ ...editing, evidence_note: event.target.value })} /></EditorField>
                    <EditorField label="Article body"><textarea rows={18} value={editing.body} onChange={(event) => setEditing({ ...editing, body: event.target.value })} /></EditorField>
                  </div>
                ) : (
                  <>
                    <h3 className="mt-4 font-serif text-3xl font-normal text-bone">{article.title}</h3>
                    <p className="mt-2 text-sm italic leading-6 text-muted">{article.summary}</p>
                    <p className="mt-3 rounded-lg border border-vanguard-amber/25 bg-vanguard-amber/[0.05] px-3 py-2 text-xs font-semibold leading-6 text-vanguard-amber">Evidence: {article.evidence_note}</p>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-muted">{article.body.split("\n\n").map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>)}</div>
                  </>
                )}

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {isEditing && editing ? (
                    <>
                      <button type="button" onClick={() => patch(article.id, { title: editing.title, summary: editing.summary, body: editing.body, evidence_note: editing.evidence_note })} disabled={busy} className="rounded-lg bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] px-4 py-2 text-xs font-bold text-[#130f08] disabled:opacity-50">Save all edits</button>
                      <button type="button" onClick={() => setEditing(null)} className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-bone">Cancel editing</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => { if (window.confirm("Publish this article now? Confirm every claim and evidence statement has been reviewed.")) void patch(article.id, { status: "approved" }); }} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] px-4 py-2 text-xs font-bold text-[#130f08] disabled:opacity-50"><CheckCircle2 size={14} /> Approve and publish</button>
                      <button type="button" onClick={() => setEditing({ id: article.id, title: article.title, summary: article.summary, body: article.body, evidence_note: article.evidence_note })} className="inline-flex items-center gap-2 rounded-lg border border-vanguard-violet/40 px-4 py-2 text-xs font-bold text-vanguard-violet"><FileEdit size={14} /> Edit all fields</button>
                      <button type="button" onClick={() => patch(article.id, { status: "rejected" })} disabled={busy} className="rounded-lg border border-vanguard-rose/40 px-4 py-2 text-xs font-bold text-vanguard-rose disabled:opacity-50">Reject draft</button>
                    </>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="launch-section-heading"><div className="launch-kicker">Public editorial</div><h2>Published articles ({approved.length})</h2></div>
        <div className="mt-4 space-y-2">
          {approved.map((article) => (
            <div key={article.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm">
              <Link href={`/articles/${article.slug}`} className="min-w-0 flex-1 font-semibold text-bone hover:text-vanguard-amber">{article.title}</Link>
              <button type="button" onClick={() => { if (window.confirm("Unpublish this article and return it to draft status?")) void patch(article.id, { status: "draft" }); }} className="text-[11px] text-muted hover:text-vanguard-rose">Unpublish</button>
            </div>
          ))}
          {!approved.length && <GlassCard className="p-6 text-center text-muted">No articles are published yet.</GlassCard>}
        </div>
      </section>

      <div className="mt-8"><Link href="/admin" className="text-xs text-vanguard-violet hover:underline">← Return to order command center</Link></div>
    </div>
  );
}

function EditorField({ label, children }: { label: string; children: React.ReactElement }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-widest text-vanguard-amber">{label}</span>
      <div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-white/[0.04] [&_input]:p-3 [&_input]:text-sm [&_input]:text-bone [&_input]:outline-none [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-white/[0.04] [&_textarea]:p-3 [&_textarea]:text-sm [&_textarea]:leading-7 [&_textarea]:text-bone [&_textarea]:outline-none">{children}</div>
    </label>
  );
}

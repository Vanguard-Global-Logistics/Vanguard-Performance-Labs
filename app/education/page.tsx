"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { GlassCard, EvidenceTag, DisclaimerBanner } from "@/components/ui";
import type { EvidenceLevel } from "@/types";

type Sort = "name" | "evidence";
const EV_RANK: Record<EvidenceLevel, number> = { strong: 0, moderate: 1, limited: 2, insufficient: 3 };

export default function EducationPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [ev, setEv] = useState<"all" | EvidenceLevel>("all");
  const [sort, setSort] = useState<Sort>("name");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    COMPOUNDS.forEach((c) => counts.set(c.category, (counts.get(c.category) ?? 0) + 1));
    return [{ name: "All", n: COMPOUNDS.length }, ...[...counts].map(([name, n]) => ({ name, n }))];
  }, []);

  const list = useMemo(() => {
    const out = COMPOUNDS.filter((c) => {
      const hay = `${c.name} ${c.category} ${c.aliases.join(" ")} ${c.overview}`.toLowerCase();
      const qm = !q || hay.includes(q.toLowerCase());
      const cm = cat === "All" || c.category === cat;
      const em = ev === "all" || c.evidence === ev;
      return qm && cm && em;
    });
    return out.sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : EV_RANK[a.evidence] - EV_RANK[b.evidence]
    );
  }, [q, cat, ev, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <header className="mb-8">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">Peptide Education</div>
        <h1 className="mt-2 font-display text-4xl font-black text-bone">What the Science Actually Says</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Evidence-based information to help you make informed decisions. Every entry is graded honestly —
          including where the research is thin.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
        {/* Filter rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <GlassCard className="p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted">
              <SlidersHorizontal size={13} /> Categories
            </div>
            <ul className="space-y-1">
              {categories.map((c) => {
                const on = cat === c.name;
                return (
                  <li key={c.name}>
                    <button
                      onClick={() => setCat(c.name)}
                      aria-pressed={on}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                        on ? "bg-vanguard-violet/15 text-vanguard-violet" : "text-muted hover:bg-white/5 hover:text-bone"
                      }`}
                    >
                      <span>{c.name === "All" ? "All Peptides" : c.name}</span>
                      <span className="text-[11px] tabular-nums opacity-70">{c.n}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </GlassCard>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4">
              <Search size={16} className="text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search peptides, conditions, or topics…"
                aria-label="Search the education library"
                className="w-full bg-transparent py-3 text-sm text-bone outline-none placeholder:text-muted"
              />
            </div>
            <select
              value={ev}
              onChange={(e) => setEv(e.target.value as "all" | EvidenceLevel)}
              aria-label="Filter by evidence level"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-bone outline-none"
            >
              <option value="all" className="bg-ink-1">All evidence</option>
              <option value="strong" className="bg-ink-1">Strong</option>
              <option value="moderate" className="bg-ink-1">Moderate</option>
              <option value="limited" className="bg-ink-1">Limited</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort results"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-bone outline-none"
            >
              <option value="name" className="bg-ink-1">Sort: A–Z</option>
              <option value="evidence" className="bg-ink-1">Sort: Evidence</option>
            </select>
          </div>

          <div className="mb-3 text-xs text-muted">{list.length} of {COMPOUNDS.length} compounds</div>

          <div className="space-y-4">
            {list.map((c) => (
              <GlassCard key={c.slug} className="card-lift p-5 hover:border-vanguard-violet/40">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-xl font-bold text-bone">{c.name}</h2>
                  <span className="rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-0.5 text-[10px] font-semibold text-vanguard-violet">
                    {c.category}
                  </span>
                  <EvidenceTag level={c.evidence} />
                </div>
                {c.aliases.length > 0 && (
                  <p className="mt-1 font-mono text-[11px] text-muted">{c.aliases.join(" · ")}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.overview}</p>

                <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                    <dt className="text-[10px] font-bold uppercase tracking-wide text-vanguard-violet">Research Focus</dt>
                    <dd className="mt-0.5 text-xs text-muted">{c.areasOfStudy[0] ?? "—"}</dd>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                    <dt className="text-[10px] font-bold uppercase tracking-wide text-vanguard-violet">Status</dt>
                    <dd className="mt-0.5 text-xs text-muted">{c.researchStatus}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/education/${c.slug}`}
                    className="rounded-lg bg-vg-grad px-4 py-2 text-xs font-bold text-ink-0"
                  >
                    View Full Profile
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-vanguard-violet/40 bg-vanguard-violet/10 px-4 py-2 text-xs font-semibold text-vanguard-violet"
                  >
                    <Sparkles size={13} /> Ask Jessie About This
                  </Link>
                </div>
              </GlassCard>
            ))}
            {list.length === 0 && (
              <p className="py-12 text-center text-muted">No results — try a different search or filter.</p>
            )}
          </div>

          <div className="mt-10"><DisclaimerBanner text={DISCLAIMER} /></div>
        </section>
      </div>
    </div>
  );
}

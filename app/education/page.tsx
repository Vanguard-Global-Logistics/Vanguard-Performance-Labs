"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpenCheck, Library, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { COMPOUNDS, DISCLAIMER } from "@/lib/content";
import { publicProductName } from "@/lib/public-product-name";
import { DisclaimerBanner, EvidenceTag, GlassCard } from "@/components/ui";
import type { EvidenceLevel } from "@/types";

type Sort = "name" | "evidence";
const EV_RANK: Record<EvidenceLevel, number> = { strong: 0, moderate: 1, limited: 2, insufficient: 3 };

export default function EducationPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [evidence, setEvidence] = useState<"all" | EvidenceLevel>("all");
  const [sort, setSort] = useState<Sort>("name");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    COMPOUNDS.forEach((compound) => counts.set(compound.category, (counts.get(compound.category) ?? 0) + 1));
    return [{ name: "All", count: COMPOUNDS.length }, ...[...counts].map(([name, count]) => ({ name, count }))];
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return COMPOUNDS.filter((compound) => {
      const haystack = `${publicProductName(compound)} ${compound.name} ${compound.category} ${compound.aliases.join(" ")} ${compound.overview} ${compound.areasOfStudy.join(" ")}`.toLowerCase();
      return (!normalized || haystack.includes(normalized)) &&
        (category === "All" || compound.category === category) &&
        (evidence === "all" || compound.evidence === evidence);
    }).sort((a, b) => sort === "name" ? publicProductName(a).localeCompare(publicProductName(b)) : EV_RANK[a.evidence] - EV_RANK[b.evidence]);
  }, [category, evidence, query, sort]);

  const citedProfiles = COMPOUNDS.filter((compound) => compound.references.some((reference) => reference.citation)).length;

  return (
    <div className="launch-page education-page">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <div className="launch-kicker">Evidence Library</div>
          <h1>Search what the published research actually supports.</h1>
          <p>
            Find a compound by name, alias, category, study area, or evidence level. Every profile separates mechanism, research direction, limitations, FAQs, and verified source records.
          </p>
        </div>
        <div className="launch-metric-grid">
          <div><strong>{COMPOUNDS.length}</strong><span>Compound profiles</span></div>
          <div><strong>{citedProfiles}</strong><span>Profiles with citations</span></div>
          <div><strong>4</strong><span>Evidence grades</span></div>
          <div><strong>0</strong><span>Hidden limitations</span></div>
        </div>
      </section>

      <section className="launch-trust-row" aria-label="Education standards">
        <div><BookOpenCheck /><span><strong>Evidence graded</strong>Strength and limitations stated clearly</span></div>
        <div><Library /><span><strong>Source oriented</strong>Verified references shown where available</span></div>
        <div><Sparkles /><span><strong>Jessie support</strong>Help finding the appropriate research page</span></div>
        <div><SlidersHorizontal /><span><strong>Fast discovery</strong>Search, category, evidence, and sorting</span></div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[250px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <GlassCard className="p-4">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-vanguard-amber"><SlidersHorizontal size={13} /> Research categories</div>
            <ul className="space-y-1">
              {categories.map((item) => {
                const active = category === item.name;
                return (
                  <li key={item.name}>
                    <button type="button" onClick={() => setCategory(item.name)} aria-pressed={active} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${active ? "border border-vanguard-amber/40 bg-vanguard-amber/[0.07] text-vanguard-amber" : "text-muted hover:bg-white/5 hover:text-bone"}`}>
                      <span>{item.name === "All" ? "All profiles" : item.name}</span>
                      <span className="text-[11px] tabular-nums opacity-70">{item.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </GlassCard>
        </aside>

        <div>
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <label className="catalog-search max-w-none">
              <Search size={16} />
              <span className="sr-only">Search the education library</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search compound, alias, category, or study area" />
            </label>
            <select value={evidence} onChange={(event) => setEvidence(event.target.value as "all" | EvidenceLevel)} aria-label="Filter by evidence level" className="rounded-xl border border-white/10 bg-[#0b0917] px-3 py-3 text-sm text-bone outline-none">
              <option value="all">All evidence</option><option value="strong">Strong</option><option value="moderate">Moderate</option><option value="limited">Limited</option><option value="insufficient">Insufficient</option>
            </select>
            <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} aria-label="Sort results" className="rounded-xl border border-white/10 bg-[#0b0917] px-3 py-3 text-sm text-bone outline-none">
              <option value="name">Sort: A–Z</option><option value="evidence">Sort: Evidence</option>
            </select>
          </div>

          <div className="mb-3 text-xs text-muted" aria-live="polite">Showing {results.length} of {COMPOUNDS.length} profiles</div>

          <div className="grid gap-4 xl:grid-cols-2">
            {results.map((compound) => {
              const displayName = publicProductName(compound);
              return (
                <GlassCard key={compound.slug} className="card-lift flex h-full min-h-[320px] flex-col p-6 hover:border-vanguard-violet/40">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-3xl font-normal text-bone">{displayName}</h2>
                    <span className="rounded-full border border-vanguard-violet/35 bg-vanguard-violet/[0.07] px-2.5 py-0.5 text-[9px] font-semibold text-vanguard-violet">{compound.category}</span>
                    <EvidenceTag level={compound.evidence} />
                  </div>
                  {compound.aliases.length > 0 && <p className="mt-1 font-mono text-[10px] text-muted">{compound.aliases.join(" · ")}</p>}
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted">{compound.overview}</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-3"><div className="text-[9px] font-bold uppercase tracking-wide text-vanguard-amber">Research focus</div><div className="mt-1 text-xs text-muted">{compound.areasOfStudy[0] ?? "Not yet summarized"}</div></div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-3"><div className="text-[9px] font-bold uppercase tracking-wide text-vanguard-amber">Published sources</div><div className="mt-1 text-xs text-muted">{compound.references.filter((reference) => reference.citation).length} cited reference(s)</div></div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href={`/education/${compound.slug}`} className="rounded-lg border border-vanguard-amber/55 bg-vanguard-amber/[0.08] px-4 py-2 text-xs font-bold text-vanguard-amber">Open research profile</Link>
                    <Link href={`/products/${compound.slug}`} className="rounded-lg border border-vanguard-violet/35 bg-vanguard-violet/[0.07] px-4 py-2 text-xs font-semibold text-vanguard-violet">View research material</Link>
                  </div>
                </GlassCard>
              );
            })}
            {results.length === 0 && (
              <div className="catalog-empty xl:col-span-2"><h2>No matching research profile</h2><p>Try another compound, alias, study area, evidence level, or category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); setEvidence("all"); }}>Reset library filters</button></div>
            )}
          </div>

          <div className="mt-8"><DisclaimerBanner text={DISCLAIMER} /></div>
        </div>
      </section>
    </div>
  );
}

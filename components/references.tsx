import { ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";
import type { Reference } from "@/types";

const MODEL_LABEL: Record<string, { text: string; tone: string }> = {
  "human-rct": { text: "Human RCT", tone: "border-vanguard-teal/40 bg-vanguard-teal/10 text-vanguard-teal" },
  "human-trial": { text: "Human trial", tone: "border-vanguard-teal/40 bg-vanguard-teal/10 text-vanguard-teal" },
  "human-observational": { text: "Human observational", tone: "border-vanguard-violet/40 bg-vanguard-violet/10 text-vanguard-violet" },
  "systematic-review": { text: "Systematic review", tone: "border-vanguard-violet/40 bg-vanguard-violet/10 text-vanguard-violet" },
  review: { text: "Review", tone: "border-white/15 bg-white/[0.04] text-muted" },
  animal: { text: "Animal model", tone: "border-vanguard-amber/40 bg-vanguard-amber/10 text-vanguard-amber" },
  "in-vitro": { text: "In vitro", tone: "border-vanguard-amber/40 bg-vanguard-amber/10 text-vanguard-amber" },
};

/** Renders the literature list for a compound. Unverified entries are labelled
 *  as such rather than hidden — the reviewer needs to see what still needs checking. */
export function References({ refs }: { refs: Reference[] }) {
  const real = refs.filter((r) => r.citation);
  const placeholders = refs.filter((r) => !r.citation);

  if (real.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center gap-2 text-sm font-bold text-muted">
          <AlertCircle size={15} /> References pending editorial review
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          We publish citations only after a qualified reviewer has verified them against the primary
          literature. We do not list references we have not checked.
          {placeholders.length > 0 ? ` (${placeholders.length} queued.)` : ""}
        </p>
      </div>
    );
  }

  const humanCount = real.filter((r) => r.model?.startsWith("human")).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
        <span className="font-bold text-bone">{real.length} citations</span>
        <span>·</span>
        <span>{humanCount > 0 ? `${humanCount} with human data` : "no human trials identified"}</span>
      </div>

      {real.map((r, i) => {
        const m = MODEL_LABEL[r.model ?? "review"] ?? MODEL_LABEL.review;
        const link = r.pmid
          ? `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`
          : r.nct
            ? `https://clinicaltrials.gov/study/${r.nct}`
            : r.doi
              ? `https://doi.org/${r.doi}`
              : null;
        return (
          <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${m.tone}`}>{m.text}</span>
              {r.verified ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-vanguard-teal">
                  <ShieldCheck size={11} /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-vanguard-amber">
                  <AlertCircle size={11} /> Awaiting verification
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-bone">{r.finding}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted">
              <span className="italic">{r.citation}</span>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-vanguard-violet hover:underline">
                  {r.pmid ? `PMID ${r.pmid}` : r.nct ? r.nct : "DOI"} <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        );
      })}

      <p className="pt-1 text-[10px] leading-relaxed text-muted">
        Citations are provided for educational reference. Study findings describe what was observed under
        the stated conditions and model, and do not imply any effect in humans or any recommended use.
      </p>
    </div>
  );
}

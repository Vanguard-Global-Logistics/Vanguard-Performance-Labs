"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { GlassCard, GlowButton } from "@/components/ui";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="launch-page">
      <section className="mx-auto mt-8 max-w-3xl">
        <GlassCard className="relative overflow-hidden p-8 text-center sm:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(226,93,126,.15),transparent_38%),radial-gradient(circle_at_18%_88%,rgba(168,85,247,.10),transparent_34%)]" />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-vanguard-rose/35 bg-vanguard-rose/[0.08] text-vanguard-rose"><AlertTriangle size={30} /></div>
          <div className="launch-kicker mt-6">Unexpected application error</div>
          <h1 className="mt-3 font-serif text-4xl font-normal text-bone">The page stopped before completing the request.</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">Nothing should be assumed saved or submitted from an interrupted action. Retry once; when the problem continues, use the Contact page and describe what you were doing.</p>
          {process.env.NODE_ENV === "development" && <p className="mx-auto mt-4 max-w-xl break-words rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-[10px] text-muted">{error.message}</p>}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <GlowButton onClick={reset}><RotateCcw size={16} /> Try again</GlowButton>
            <GlowButton href="/contact" variant="secondary">Contact Vanguard</GlowButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

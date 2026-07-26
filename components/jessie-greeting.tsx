"use client";
import { useEffect, useState } from "react";
import { JessiePortrait } from "@/components/brand";
import { readAndMarkVisit, timeGreeting } from "@/lib/visitor";

/** Jessie greeting the visitor on arrival. She is the concierge — she should be
 *  the first thing that speaks to you, not a button waiting in the corner. */
export function JessieGreeting() {
  const [line, setLine] = useState("Welcome to Vanguard. I can point you anywhere.");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const v = readAndMarkVisit();
    setLine(
      v.returning
        ? `${timeGreeting()} — welcome back. Want to pick up where you left off?`
        : `${timeGreeting()}. I'm Jessie. Tell me what you're looking for and I'll take you there.`
    );
    const t = setTimeout(() => setShown(true), 700);
    return () => clearTimeout(t);
  }, []);

  function open() {
    document.querySelector<HTMLButtonElement>('[aria-label^="Open Jessie"]')?.click();
  }

  return (
    <div
      className={`flex items-end gap-3 transition-all duration-700 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <button
        onClick={open}
        aria-label="Talk to Jessie"
        className="group relative shrink-0 rounded-2xl border border-white/12 bg-white/[0.04] p-0.5 backdrop-blur-sm transition hover:border-vanguard-violet/50"
      >
        <span className="absolute -inset-1 -z-10 rounded-2xl bg-vanguard-violet/25 opacity-0 blur-lg transition group-hover:opacity-100" />
        <span className="block h-[86px] w-[74px] overflow-hidden rounded-[14px]">
          <JessiePortrait size={74} variant="hero" />
        </span>
        <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border-2 border-ink-0 bg-vanguard-teal">
          <span className="h-1.5 w-1.5 rounded-full bg-ink-0" />
        </span>
      </button>

      <button onClick={open} className="max-w-xs text-left">
        <span className="block rounded-2xl rounded-bl-sm border border-white/12 bg-white/[0.05] px-4 py-3 backdrop-blur-md transition hover:border-vanguard-violet/40">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-vanguard-teal">
            Jessie · AI Concierge
          </span>
          <span className="block text-sm leading-snug text-bone">{line}</span>
        </span>
      </button>
    </div>
  );
}

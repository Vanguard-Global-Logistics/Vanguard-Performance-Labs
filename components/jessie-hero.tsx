"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JessiePortrait } from "@/components/brand";
import { readAndMarkVisit, timeGreeting } from "@/lib/visitor";

const PROMPTS = [
  { label: "What does the research actually show?", href: "/education" },
  { label: "Show me what you supply", href: "/products" },
  { label: "I run a clinic", href: "/peptastic" },
  { label: "I need something you don't stock", href: "/specialty-request" },
];

/** The hero as a conversation. Jessie is already speaking when you arrive —
 *  she is the thing people come back for, so she opens the site rather than
 *  waiting in a corner. */
export function JessieHero() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const full = useRef("");

  useEffect(() => {
    const v = readAndMarkVisit();
    full.current = v.returning
      ? `${timeGreeting()} — welcome back. Want to pick up where you left off, or start somewhere new?`
      : `${timeGreeting()}. I'm Jessie. I'll take you anywhere on this site — just tell me what you're after.`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(full.current); setDone(true); return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(full.current.slice(0, i));
      if (i >= full.current.length) { clearInterval(id); setDone(true); }
    }, 26);
    return () => clearInterval(id);
  }, []);

  function openDock() {
    document.querySelector<HTMLButtonElement>('[aria-label^="Open Jessie"]')?.click();
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
      {/* Jessie — rim-lit, held at a size her source resolution supports */}
      <div className="relative mx-auto w-[280px] shrink-0 sm:w-[340px] lg:w-[400px]">
        <div className="absolute inset-0 -z-10 rounded-[28px] bg-vanguard-violet/25 blur-3xl" />
        <div className="jessie-rim overflow-hidden rounded-[26px] border border-white/12">
          <JessiePortrait size={400} variant="hero" />
        </div>
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/12 bg-ink-1/90 px-3 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vanguard-teal opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-vanguard-teal" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone">Jessie · Live</span>
        </div>
      </div>

      {/* The conversation */}
      <div className="min-w-0">
        <p className="min-h-[4.5rem] font-display text-2xl font-bold leading-snug text-bone sm:min-h-[5rem] sm:text-3xl">
          {typed}
          {!done && <span className="ml-0.5 inline-block h-6 w-[3px] translate-y-0.5 animate-pulse bg-vanguard-violet" />}
        </p>

        <div className={`mt-6 flex flex-wrap gap-2 transition-all duration-700 ${done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          {PROMPTS.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-bone backdrop-blur-sm transition hover:border-vanguard-violet/60 hover:bg-vanguard-violet/10"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {p.label}
              <ArrowRight size={13} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        <button
          onClick={openDock}
          className={`mt-5 text-sm font-semibold text-vanguard-violet transition hover:underline ${done ? "opacity-100" : "opacity-0"}`}
        >
          …or just ask me something →
        </button>
      </div>
    </div>
  );
}

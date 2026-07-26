"use client";
import { ArrowDown } from "lucide-react";
import { travelTo } from "@/components/journey";

/** The invitation to begin the descent. */
export function JourneyNudge() {
  return (
    <button
      onClick={() => travelTo("library")}
      aria-label="Begin"
      className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      <span className="font-mono text-[9px] tracking-[0.3em] text-muted transition-colors group-hover:text-vanguard-violet">
        BEGIN
      </span>
      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-muted transition-all group-hover:border-vanguard-violet/60 group-hover:text-vanguard-violet">
        <ArrowDown size={15} className="animate-bounce" />
      </span>
    </button>
  );
}

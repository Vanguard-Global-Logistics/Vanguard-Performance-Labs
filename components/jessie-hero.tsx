"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Volume2 } from "lucide-react";
import { JessiePortrait } from "@/components/brand";
import { readAndMarkVisit, timeGreeting } from "@/lib/visitor";

const PROMPTS = [
  { label: "What does the research actually show?", href: "/education" },
  { label: "Explore research materials", href: "/products" },
  { label: "I run a clinic", href: "/peptastic" },
  { label: "I need specialty sourcing", href: "/specialty-request" },
];

export function JessieHero() {
  const [line, setLine] = useState("Welcome to Vanguard Performance Labs.");
  const [speaking, setSpeaking] = useState(false);
  const full = useRef("Welcome to Vanguard Performance Labs.");

  useEffect(() => {
    const visitor = readAndMarkVisit();
    full.current = visitor.returning
      ? `${timeGreeting()} — welcome back. I can help you continue exploring Vanguard's research education, professional services, or Peptastic.`
      : `${timeGreeting()}. I'm Jessie, Vanguard's audio concierge. I can guide you through the research library, professional inquiries, and Peptastic.`;
    setLine(full.current);

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function hearJessie() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(full.current);
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((voice) => /Samantha|Ava|Allison|Jenny|Aria|Zira/i.test(voice.name))
      ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en-us"))
      ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));
    if (preferred) utterance.voice = preferred;
    utterance.lang = preferred?.lang ?? "en-US";
    utterance.rate = 0.98;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function openDock() {
    document.querySelector<HTMLButtonElement>('[aria-label^="Open Jessie"]')?.click();
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
      <div className="relative mx-auto w-[280px] shrink-0 sm:w-[340px] lg:w-[400px]">
        <div className="absolute inset-0 -z-10 rounded-[28px] bg-vanguard-violet/25 blur-3xl" />
        <div className="jessie-rim overflow-hidden rounded-[26px] border border-white/12">
          <JessiePortrait size={400} variant="hero" />
        </div>
        <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/12 bg-ink-1/90 px-3 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-vanguard-teal opacity-70 ${speaking ? "animate-ping" : ""}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-vanguard-teal" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone">Jessie · Audio Concierge</span>
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-display text-2xl font-bold leading-snug text-bone sm:text-3xl">{line}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Jessie uses a still portrait for now. Her voice and specialist routing work without requiring unfinished character video.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={hearJessie}
            className="inline-flex items-center gap-2 rounded-full bg-vg-grad px-4 py-2 text-sm font-bold text-ink-0 shadow-[0_0_24px_rgba(168,85,247,0.28)]"
          >
            <Volume2 size={15} /> {speaking ? "Jessie is speaking…" : "Hear Jessie"}
          </button>
          <button
            onClick={openDock}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-bone transition hover:border-vanguard-violet/60 hover:bg-vanguard-violet/10"
          >
            <MessageSquare size={15} /> Ask Jessie
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {PROMPTS.map((prompt) => (
            <Link
              key={prompt.href}
              href={prompt.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-bone backdrop-blur-sm transition hover:border-vanguard-violet/60 hover:bg-vanguard-violet/10"
            >
              {prompt.label}
              <ArrowRight size={13} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MessageSquare, X, Send, Volume2, VolumeX } from "lucide-react";
import { NAV, DISCLAIMER } from "@/lib/content";
import { VanguardLogo, JessiePortrait } from "@/components/brand";
import { readAndMarkVisit, timeGreeting, type VisitorState } from "@/lib/visitor";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-1">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <VanguardLogo size="lg" tagline />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Veteran-owned research education, professional support, and clinic-operations technology.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-vanguard-gold/40 bg-vanguard-gold/10 px-3 py-1 text-[10px] font-bold tracking-wide text-vanguard-gold">
              ★ VETERAN OWNED · VETERAN RAN
            </div>
          </div>
          <FooterCol title="Explore" links={NAV.slice(1, 7)} />
          <FooterCol title="Business" links={NAV.slice(8, 12)} />
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-bone">Legal</div>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/legal/privacy" className="hover:text-bone">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-bone">Terms of Service</Link></li>
              <li><Link href="/legal/refunds" className="hover:text-bone">Inquiry & Shipping Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-xl border border-vanguard-amber/30 bg-vanguard-amber/[0.06] px-4 py-3 text-xs leading-relaxed text-muted">
          {DISCLAIMER}
        </div>
        <div className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()} Vanguard Global Logistics LLC, DBA Vanguard Performance Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-bone">{title}</div>
      <ul className="space-y-2 text-sm text-muted">
        {links.map((link) => <li key={link.href}><Link href={link.href} className="hover:text-bone">{link.label}</Link></li>)}
      </ul>
    </div>
  );
}

const QUICK = [
  { label: "Explore research", href: "/education" },
  { label: "Book a Peptastic session", href: "/peptastic" },
  { label: "Professional inquiry", href: "/wholesale" },
  { label: "Talk to the team", href: "/contact" },
];

const REFUSE = /(dose|dosing|how much|inject|injection|reconstitut|\bmg\b|mcg|prescri|diagnos|treat my|cure|protocol for me|human use|personal use|take this)/i;

type Msg = {
  role: "user" | "assistant";
  content: string;
  links?: { label: string; href: string }[];
  agentLabel?: string;
};

function preferredVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  const preferredNames = ["Samantha", "Ava", "Allison", "Jenny", "Aria", "Zira"];
  return (
    voices.find((voice) => preferredNames.some((name) => voice.name.includes(name))) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en-us")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ??
    null
  );
}

export function JessieDock() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeAgent, setActiveAgent] = useState("AI Concierge");
  const [visitor, setVisitor] = useState<VisitorState>({ returning: false, visits: 0 });
  const [chat, setChat] = useState<Msg[]>([
    {
      role: "assistant",
      agentLabel: "AI Concierge",
      content: "I'm Jessie. I can guide you through Vanguard's research education, professional services, and Peptastic. What are you looking for today?",
    },
  ]);

  useEffect(() => {
    const v = readAndMarkVisit();
    setVisitor(v);
    setVoiceEnabled(window.localStorage.getItem("vpl-jessie-voice") === "on");
    setChat((current) => {
      if (current.length !== 1 || current[0].role !== "assistant") return current;
      const greet = v.returning
        ? `${timeGreeting()} — welcome back. Want to continue exploring, or find something new?`
        : `${timeGreeting()}! I'm Jessie, Vanguard's audio concierge. I can guide you through the research library, professional inquiries, or Peptastic.`;
      return [{ role: "assistant", agentLabel: "AI Concierge", content: greet }];
    });
  }, []);

  function speak(text: string) {
    if (!("speechSynthesis" in window) || !text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = preferredVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? "en-US";
    utterance.rate = 0.98;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function toggleVoice() {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    window.localStorage.setItem("vpl-jessie-voice", next ? "on" : "off");
    if (!next) {
      window.speechSynthesis?.cancel();
      return;
    }
    const latest = [...chat].reverse().find((item) => item.role === "assistant");
    if (latest) speak(latest.content);
  }

  function addAssistant(message: Msg) {
    setChat((current) => [...current, message]);
    if (message.agentLabel) setActiveAgent(message.agentLabel);
    if (voiceEnabled) speak(message.content);
  }

  async function send() {
    const question = msg.trim();
    if (!question || busy) return;
    setMsg("");

    const userMessage: Msg = { role: "user", content: question };
    const next: Msg[] = [...chat, userMessage];
    setChat(next);

    if (REFUSE.test(question)) {
      addAssistant({
        role: "assistant",
        agentLabel: "Compliance Gate",
        content: "I can't help with dosing, injections, diagnosis, treatment decisions, or human-use instructions. I can show you the published research or connect you with the appropriate professional.",
        links: [
          { label: "Research Library", href: "/education" },
          { label: "Contact", href: "/contact" },
        ],
      });
      return;
    }

    if (!live) {
      addAssistant({
        role: "assistant",
        agentLabel: "AI Concierge",
        content: "Live AI is currently offline, but I can still route you to the right Vanguard resource.",
        links: QUICK.slice(0, 3),
      });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/jessie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
          visitor,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.status === 503) {
        setLive(false);
        addAssistant({
          role: "assistant",
          agentLabel: data.agent?.label ?? "AI Concierge",
          content: "Live AI is warming up. These links will get you to the right place now.",
          links: QUICK.slice(0, 3),
        });
        return;
      }
      if (!res.ok) throw new Error();

      addAssistant({
        role: "assistant",
        agentLabel: data.agent?.label ?? "AI Concierge",
        content: data.reply,
        links: data.links,
      });
    } catch {
      addAssistant({
        role: "assistant",
        agentLabel: "AI Concierge",
        content: "Something hiccuped on my end. Please try again or contact the Vanguard team directly.",
        links: [{ label: "Contact", href: "/contact" }],
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Jessie, the Vanguard audio AI concierge"
        className="vt-dock fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-vg-grad px-4 py-3 text-sm font-semibold text-ink-0 shadow-[0_0_28px_rgba(168,85,247,0.5)]"
      >
        <MessageSquare size={18} /> Ask Jessie
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 flex max-h-[72vh] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-1/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="h-10 w-10 overflow-hidden rounded-lg"><JessiePortrait size={40} variant="avatar" /></div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-bone">Jessie</div>
              <div className="truncate text-[10px] text-vanguard-teal">● {activeAgent} · Audio available</div>
            </div>
            <button
              aria-label={voiceEnabled ? "Mute Jessie" : "Enable Jessie's voice"}
              onClick={toggleVoice}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted hover:border-vanguard-violet/50 hover:text-bone"
            >
              {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button aria-label="Close" onClick={() => setOpen(false)} className="text-muted hover:text-bone"><X size={18} /></button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
            {chat.map((item, index) => (
              <div key={index} className={item.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${item.role === "user" ? "bg-vg-grad text-ink-0" : "bg-white/[0.05] text-bone"}`}>
                  {item.role === "assistant" && item.agentLabel && (
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.15em] text-vanguard-teal">{item.agentLabel}</div>
                  )}
                  {item.content}
                  {item.links && item.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-1 text-[11px] font-medium text-vanguard-violet hover:bg-vanguard-violet/20"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && <div className="text-xs text-muted">Jessie is routing your question…</div>}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={msg}
              onChange={(event) => setMsg(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && send()}
              placeholder="Ask Jessie…"
              aria-label="Message Jessie"
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted"
            />
            <button onClick={send} disabled={busy} aria-label="Send" className="grid h-9 w-9 place-items-center rounded-lg bg-vg-grad text-ink-0 disabled:opacity-50"><Send size={16} /></button>
          </div>
          <p className="px-4 pb-3 text-[10px] leading-relaxed text-muted">
            Educational and business-routing support only. Jessie does not provide medical or legal advice. Voice playback requires your permission.
          </p>
        </div>
      )}
    </>
  );
}

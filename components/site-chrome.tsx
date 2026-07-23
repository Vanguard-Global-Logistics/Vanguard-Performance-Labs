"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { NAV, DISCLAIMER } from "@/lib/content";
import { VanguardLogo, JessiePortrait } from "@/components/brand";
import { readAndMarkVisit, timeGreeting, type VisitorState } from "@/lib/visitor";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-1">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <VanguardLogo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Leading the future of peptide education and clinic technology through science and veteran-led innovation.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-vanguard-gold/40 bg-vanguard-gold/10 px-3 py-1 text-[10px] font-bold tracking-wide text-vanguard-gold">
              ★ VETERAN OWNED · VETERAN RAN
            </div>
          </div>
          <FooterCol title="Explore" links={NAV.slice(1, 6)} />
          <FooterCol title="Business" links={NAV.slice(8, 12)} />
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-bone">Legal</div>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/legal/privacy" className="hover:text-bone">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-bone">Terms of Service</Link></li>
              <li><Link href="/legal/refunds" className="hover:text-bone">Refund & Shipping</Link></li>
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
        {links.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-bone">{l.label}</Link></li>)}
      </ul>
    </div>
  );
}

// Jessie concierge dock — LIVE AI when /api/jessie has a key; scripted routing otherwise.
const QUICK = [
  { label: "Explore research", href: "/education" },
  { label: "Book a Peptastic demo", href: "/peptastic" },
  { label: "Wholesale inquiry", href: "/wholesale" },
  { label: "Talk to sales", href: "/contact" },
];
const REFUSE = /(dose|dosing|how much|inject|reconstitut|\bmg\b|mcg|prescri|diagnos|treat my|cure|protocol for me)/i;

type Msg = { role: "user" | "assistant"; content: string; links?: { label: string; href: string }[] };

export function JessieDock() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState(true); // assume live until the API says otherwise
  const [visitor, setVisitor] = useState<VisitorState>({ returning: false, visits: 0 });
  const [chat, setChat] = useState<Msg[]>([
    { role: "assistant", content: "I'm Jessie. I can guide you through Vanguard, our research education, and Peptastic. What are you looking for today?" },
  ]);

  useEffect(() => {
    const v = readAndMarkVisit();
    setVisitor(v);
    setChat((c) => {
      if (c.length !== 1 || c[0].role !== "assistant") return c;
      const greet = v.returning
        ? `${timeGreeting()} — welcome back. Want to pick up where you left off, or explore something new?`
        : `${timeGreeting()}! I don't think we've met — I'm Jessie, Vanguard's concierge. I can walk you through the research, our products, or Peptastic. What brings you in?`;
      return [{ role: "assistant", content: greet }];
    });
  }, []);

  async function send() {
    const q = msg.trim();
    if (!q || busy) return;
    setMsg("");

    // Client-side guardrail: deflect medical asks before they ever leave the browser.
    if (REFUSE.test(q)) {
      setChat((c) => [...c, { role: "user", content: q }, {
        role: "assistant",
        content: "I can't help with dosing, diagnosis, or individual medical decisions — those belong with a licensed provider. I can walk you through the published research or connect you with our team.",
        links: [{ label: "Education Library", href: "/education" }, { label: "Contact", href: "/contact" }],
      }]);
      return;
    }

    const next: Msg[] = [...chat, { role: "user", content: q }];
    setChat(next);

    if (!live) {
      setChat((c) => [...c, {
        role: "assistant",
        content: "Happy to point you the right way — pick an option below, or head to Contact and the team will route you.",
        links: QUICK.slice(0, 3).map((x) => ({ label: x.label, href: x.href })),
      }]);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/jessie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })), visitor }),
      });
      if (res.status === 503) {
        setLive(false);
        setChat((c) => [...c, {
          role: "assistant",
          content: "Live chat is warming up — meanwhile, these will get you where you need to go.",
          links: QUICK.slice(0, 3).map((x) => ({ label: x.label, href: x.href })),
        }]);
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setChat((c) => [...c, { role: "assistant", content: data.reply, links: data.links }]);
    } catch {
      setChat((c) => [...c, {
        role: "assistant",
        content: "Something hiccuped on my end — try again, or use one of these.",
        links: [{ label: "Contact", href: "/contact" }],
      }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Jessie, the Vanguard AI Concierge"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-vg-grad px-4 py-3 text-sm font-semibold text-ink-0 shadow-[0_0_28px_rgba(168,85,247,0.5)]"
      >
        <MessageSquare size={18} /> Ask Jessie
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 flex max-h-[70vh] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-1/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="h-10 w-10 overflow-hidden rounded-lg"><JessiePortrait size={40} variant="avatar" /></div>
            <div className="flex-1">
              <div className="text-sm font-bold text-bone">Jessie</div>
              <div className="text-[10px] text-vanguard-teal">● Vanguard AI Concierge</div>
            </div>
            <button aria-label="Close" onClick={() => setOpen(false)} className="text-muted hover:text-bone"><X size={18} /></button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {chat.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "bg-vg-grad text-ink-0" : "bg-white/[0.05] text-bone"}`}>
                  {m.content}
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.links.map((l) => (
                        <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)}
                          className="rounded-full border border-vanguard-violet/40 bg-vanguard-violet/10 px-2.5 py-1 text-[11px] font-medium text-vanguard-violet hover:bg-vanguard-violet/20">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && <div className="text-xs text-muted">Jessie is typing…</div>}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={msg} onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask Jessie…"
              aria-label="Message Jessie"
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none placeholder:text-muted"
            />
            <button onClick={send} disabled={busy} aria-label="Send" className="grid h-9 w-9 place-items-center rounded-lg bg-vg-grad text-ink-0 disabled:opacity-50"><Send size={16} /></button>
          </div>
          <p className="px-4 pb-3 text-[10px] leading-relaxed text-muted">
            Educational only. Jessie does not provide medical advice, diagnosis, or dosing.
          </p>
        </div>
      )}
    </>
  );
}

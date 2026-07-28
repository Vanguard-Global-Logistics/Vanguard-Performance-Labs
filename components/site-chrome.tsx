"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageSquare, Send, ShieldCheck, X } from "lucide-react";
import { DISCLAIMER } from "@/lib/content";
import { JessiePortrait, VanguardLogo } from "@/components/brand";
import { readAndMarkVisit, timeGreeting, type VisitorState } from "@/lib/visitor";

const FOOTER_COLUMNS = [
  {
    title: "Research",
    links: [
      { href: "/education", label: "Evidence Library" },
      { href: "/research", label: "Evidence Method" },
      { href: "/articles", label: "Articles" },
      { href: "/videos", label: "Video Library" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "/products", label: "Research Catalog" },
      { href: "/wholesale", label: "Wholesale Accounts" },
      { href: "/specialty-request", label: "Specialty Sourcing" },
      { href: "/professionals", label: "Medical Professionals" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Vanguard" },
      { href: "/peptastic", label: "Peptastic AI OS" },
      { href: "/partnerships", label: "Partnerships" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#070611,#03040b)]">
      <div className="mx-auto max-w-[1480px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,.7fr)]">
          <div>
            <VanguardLogo size="lg" tagline />
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">Research materials, evidence-based education, and AI-assisted operations built around transparent claims and disciplined review.</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-vanguard-amber/40 bg-vanguard-amber/[0.07] px-3 py-1.5 text-[10px] font-bold tracking-wide text-vanguard-amber"><ShieldCheck size={13} /> VETERAN OWNED · VETERAN OPERATED</div>
          </div>

          {FOOTER_COLUMNS.map((column) => <FooterColumn key={column.title} title={column.title} links={column.links} />)}

          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-vanguard-amber">Legal & policy</div>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/legal/privacy" className="transition hover:text-bone">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="transition hover:text-bone">Terms of Service</Link></li>
              <li><Link href="/legal/refunds" className="transition hover:text-bone">Refund & Shipping</Link></li>
              <li><Link href="/contact" className="inline-flex items-center gap-1 transition hover:text-bone">Policy questions <ArrowUpRight size={12} /></Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-vanguard-amber/30 bg-[linear-gradient(135deg,rgba(227,180,90,.06),rgba(168,85,247,.03))] px-4 py-3 text-xs leading-relaxed text-muted"><span className="font-semibold text-vanguard-amber">Research-use notice: </span>{DISCLAIMER}</div>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vanguard Global Logistics LLC, DBA Vanguard Performance Labs. All rights reserved.</span>
          <span>Research with confidence.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-vanguard-amber">{title}</div>
      <ul className="space-y-2.5 text-sm text-muted">
        {links.map((link) => <li key={link.href}><Link href={link.href} className="transition hover:text-bone">{link.label}</Link></li>)}
      </ul>
    </div>
  );
}

const QUICK = [
  { label: "Explore research", href: "/education" },
  { label: "Browse the catalog", href: "/products" },
  { label: "See Peptastic", href: "/peptastic" },
  { label: "Contact Vanguard", href: "/contact" },
];
const RESTRICTED = /\b(dos(?:e|age|ing)|reconstitut(?:e|ion|ing)|inject(?:ion|ing)?|syringe|needle|units?\b|mcg\b|milligrams?\b|protocol|cycle|stack(?:ing)?|combine|human use|take this|how much|diagnos(?:e|is)|treat(?:ment)?|prescri(?:be|ption)|medical advice)\b/i;
type Message = { role: "user" | "assistant"; content: string; links?: { label: string; href: string }[] };

export function JessieDock() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState(true);
  const [visitor, setVisitor] = useState<VisitorState>({ returning: false, visits: 0 });
  const [chat, setChat] = useState<Message[]>([
    { role: "assistant", content: "I’m Jessie. I can help you find Vanguard research, products, business resources, and Peptastic. What are you looking for?" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const state = readAndMarkVisit();
    setVisitor(state);
    setChat((current) => {
      if (current.length !== 1 || current[0].role !== "assistant") return current;
      return [{
        role: "assistant",
        content: state.returning
          ? `${timeGreeting()} — welcome back. What would you like to continue?`
          : `${timeGreeting()}! I’m Jessie, Vanguard’s concierge. I can guide you through the evidence library, research catalog, professional accounts, or Peptastic.`,
      }];
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [busy, chat, open]);

  async function send(event?: FormEvent) {
    event?.preventDefault();
    const question = message.trim().slice(0, 1200);
    if (!question || busy) return;
    setMessage("");

    if (RESTRICTED.test(question)) {
      setChat((current) => [...current, { role: "user", content: question }, {
        role: "assistant",
        content: "I can’t provide dosing, reconstitution, injection, diagnosis, treatment, or other human-use guidance. A licensed medical professional should handle those questions; I can help you review the published research or contact Vanguard.",
        links: [{ label: "Evidence Library", href: "/education" }, { label: "Contact Vanguard", href: "/contact" }],
      }]);
      return;
    }

    const next: Message[] = [...chat, { role: "user", content: question }];
    setChat(next);

    if (!live) {
      setChat((current) => [...current, {
        role: "assistant",
        content: "Live AI is unavailable right now, but these routes can still get you to the right place.",
        links: QUICK.slice(0, 4),
      }]);
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/jessie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })), visitor }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 503) {
        setLive(false);
        setChat((current) => [...current, { role: "assistant", content: "Live AI is temporarily offline. The website remains available, and these routes can help immediately.", links: QUICK.slice(0, 4) }]);
        return;
      }
      if (!response.ok || !data.ok) throw new Error(data.error || "Jessie request failed");
      setChat((current) => [...current, { role: "assistant", content: String(data.reply ?? "I could not generate a response."), links: Array.isArray(data.links) ? data.links : [] }]);
    } catch {
      setChat((current) => [...current, { role: "assistant", content: "I couldn’t complete that request. Try once more or contact the Vanguard team directly.", links: [{ label: "Contact Vanguard", href: "/contact" }] }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={`${open ? "Close" : "Open"} Jessie, the Vanguard AI Concierge`} aria-expanded={open} className="vt-dock fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full border border-vanguard-amber/60 bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] px-4 py-3 text-sm font-bold text-[#130f08] shadow-[0_14px_38px_rgba(227,180,90,.24)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vanguard-amber/70">
        {open ? <X size={18} /> : <MessageSquare size={18} />} {open ? "Close Jessie" : "Ask Jessie"}
      </button>

      {open && (
        <section role="dialog" aria-modal="true" aria-labelledby="jessie-title" className="fixed inset-x-3 bottom-20 z-[59] flex max-h-[76dvh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#090814]/98 shadow-2xl backdrop-blur-2xl sm:left-auto sm:right-5 sm:w-[390px]">
          <header className="flex items-center gap-3 border-b border-white/10 bg-white/[0.025] px-4 py-3">
            <div className="h-11 w-11 overflow-hidden rounded-xl border border-vanguard-violet/30"><JessiePortrait size={44} variant="avatar" /></div>
            <div className="min-w-0 flex-1">
              <div id="jessie-title" className="text-sm font-bold text-bone">Jessie · Vanguard Concierge</div>
              <div className={`text-[10px] ${live ? "text-vanguard-teal" : "text-vanguard-amber"}`}>{live ? "● Live AI and site guidance" : "● Site guidance mode"}</div>
            </div>
            <button type="button" aria-label="Close Jessie" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-white/[0.04] hover:text-bone"><X size={18} /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {chat.map((item, index) => (
              <div key={`${item.role}-${index}`} className={item.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[88%] rounded-xl px-3 py-2.5 text-sm leading-relaxed ${item.role === "user" ? "bg-vanguard-violet text-white" : "border border-white/[0.07] bg-white/[0.04] text-bone"}`}>
                  {item.content}
                  {item.links && item.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.links.map((link) => <Link key={`${link.href}-${link.label}`} href={link.href} onClick={() => setOpen(false)} className="rounded-full border border-vanguard-amber/35 bg-vanguard-amber/[0.06] px-2.5 py-1 text-[11px] font-medium text-vanguard-amber hover:bg-vanguard-amber/[0.12]">{link.label}</Link>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && <div className="flex justify-start"><div className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-xs text-muted">Jessie is reviewing your question…</div></div>}
            <div ref={endRef} />
          </div>

          {chat.length === 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-white/[0.07] px-4 py-3">
              {QUICK.slice(0, 3).map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-full border border-vanguard-violet/30 bg-vanguard-violet/[0.06] px-2.5 py-1 text-[10px] text-vanguard-violet">{item.label}</Link>)}
            </div>
          )}

          <form onSubmit={send} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input ref={inputRef} value={message} maxLength={1200} onChange={(event) => setMessage(event.target.value)} placeholder="Ask Jessie about Vanguard…" aria-label="Message Jessie" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-bone outline-none placeholder:text-muted focus:border-vanguard-violet/60" />
            <button type="submit" disabled={busy || !message.trim()} aria-label="Send message to Jessie" className="grid h-10 w-10 place-items-center rounded-lg bg-[linear-gradient(135deg,#f1d28a,#d39b3c)] text-[#130f08] disabled:cursor-not-allowed disabled:opacity-40"><Send size={16} /></button>
          </form>
          <p className="px-4 pb-3 text-[9px] leading-relaxed text-muted">Educational and navigational support only. Do not submit health records or request diagnosis, treatment, dosing, reconstitution, injection, or human-use guidance.</p>
        </section>
      )}
    </>
  );
}

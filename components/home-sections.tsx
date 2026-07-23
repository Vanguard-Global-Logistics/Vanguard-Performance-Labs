"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Lock, Check, Stethoscope, FlaskConical, GraduationCap, Sparkles, Dumbbell, HeartPulse } from "lucide-react";
import { GlassCard } from "@/components/ui";
import { Reveal, Marquee } from "@/components/motion";

const PILLARS = [
  { title: "Research Products", body: "Explore our premium research peptides and advanced formulas.", cta: "View Products", href: "/products" },
  { title: "Peptide Education", body: "The most comprehensive peptide education platform in the industry.", cta: "Explore Library", href: "/education" },
  { title: "Peptastic OS", body: "AI-powered clinic management software built for the future of healthcare.", cta: "Book a Demo", href: "/peptastic" },
  { title: "Scientific Research", body: "Stay informed with the latest studies, white papers, and insights.", cta: "View Research", href: "/research" },
  { title: "Professionals", body: "Resources and solutions for clinics, practitioners, and researchers.", cta: "Learn More", href: "/professionals" },
];

const TRUSTED = [
  { icon: Stethoscope, label: "Medical Clinics" },
  { icon: FlaskConical, label: "Research Labs" },
  { icon: GraduationCap, label: "Universities" },
  { icon: Sparkles, label: "Wellness Centers" },
  { icon: HeartPulse, label: "Functional Medicine" },
  { icon: Dumbbell, label: "Performance Coaches" },
];

export function PillarRow() {
  return (
    <section className="border-y border-white/10 bg-ink-1/60">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
          <GlassCard className="card-lift flex h-full flex-col p-5 hover:border-vanguard-violet/40">
            <h3 className="font-display text-base font-bold text-bone">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
            <Link href={p.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-vanguard-violet hover:gap-2.5 transition-all">
              {p.cta} <ArrowRight size={14} />
            </Link>
          </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TrustedBy() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-center">
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-vanguard-gold">
        Trusted by Leading Professionals Worldwide
      </h2>
      <Marquee className="mt-7" laneClassName="gap-12 px-6">
        {TRUSTED.map((t) => (
          <div key={t.label} className="flex items-center gap-2.5 text-muted">
            <t.icon size={20} className="text-vanguard-violet" />
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide">{t.label}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function subscribe() {
    setErr(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("Enter a valid email address."); return; }
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "information_request", company: "Newsletter", email, topic: "newsletter" }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="border-t border-white/10 bg-ink-1">
      <Reveal><div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 lg:grid-cols-[1.2fr_1fr_auto]">
        <div className="flex items-start gap-3">
          <Mail size={22} className="mt-0.5 shrink-0 text-vanguard-violet" />
          <div>
            <div className="font-display text-base font-bold text-bone">Stay Ahead of the Science</div>
            <p className="text-sm text-muted">Get the latest research, education, and product updates.</p>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="flex items-center gap-2 rounded-xl border border-vanguard-teal/40 bg-vanguard-teal/10 px-4 py-3 text-sm text-bone">
              <Check size={16} className="text-vanguard-teal" /> Subscribed — thank you.
            </div>
          ) : (
            <>
              <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && subscribe()}
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="w-full bg-transparent px-4 py-3 text-sm text-bone outline-none placeholder:text-muted"
                />
                <button onClick={subscribe} className="bg-vg-grad px-5 text-xs font-bold uppercase tracking-wide text-ink-0">
                  Subscribe
                </button>
              </div>
              {err && <p className="mt-1.5 text-xs text-vanguard-rose">{err}</p>}
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Lock size={15} className="text-vanguard-violet" />
            <span>Secure. Private.<br />Professional.</span>
          </div>
          <div className="rounded-xl border border-vanguard-gold/40 bg-vanguard-gold/10 px-4 py-2.5 text-[11px] font-bold leading-tight tracking-wide text-vanguard-gold">
            ★ VETERAN OWNED.<br />VETERAN RUN.
          </div>
        </div>
      </div></Reveal>
    </section>
  );
}

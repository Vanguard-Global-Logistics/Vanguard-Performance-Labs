"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { EvidenceLevel } from "@/types";

export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export function GlowButton({
  href, children, variant = "primary", onClick, type,
}: {
  href?: string; children: React.ReactNode; variant?: "primary" | "secondary";
  onClick?: () => void; type?: "button" | "submit";
}) {
  const base =
    "btn-sheen inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-vanguard-violet/60";
  const styles =
    variant === "primary"
      ? "bg-vg-grad text-ink-0 shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:shadow-[0_0_32px_rgba(168,85,247,0.65)]"
      : "border border-white/15 bg-white/[0.03] text-bone hover:border-vanguard-violet/60";
  const cls = `${base} ${styles}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type ?? "button"} onClick={onClick} className={cls}>{children}</button>;
}

export function SectionHeading({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker && <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-vanguard-violet">{kicker}</div>}
      <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </div>
  );
}

export function DisclaimerBanner({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-vanguard-amber/30 bg-vanguard-amber/[0.06] px-4 py-3 text-xs leading-relaxed text-muted">
      <span className="font-semibold text-vanguard-amber">Disclaimer: </span>{text}
    </div>
  );
}

const EV: Record<EvidenceLevel, { label: string; color: string }> = {
  strong: { label: "STRONG EVIDENCE", color: "#2ED9B8" },
  moderate: { label: "MODERATE EVIDENCE", color: "#FFB830" },
  limited: { label: "LIMITED EVIDENCE", color: "#FF5D8F" },
  insufficient: { label: "INSUFFICIENT EVIDENCE", color: "#8A93C2" },
};

export function EvidenceTag({ level }: { level: EvidenceLevel }) {
  const e = EV[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide"
      style={{ color: e.color, borderColor: `${e.color}55`, background: `${e.color}12` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.color }} />
      {e.label}
    </span>
  );
}

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type N = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: N[] = [];
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 16000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.4 + 0.4,
      }));
    };
    resize();
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(168,85,247,${0.14 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(192,132,252,0.5)"; ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />;
}

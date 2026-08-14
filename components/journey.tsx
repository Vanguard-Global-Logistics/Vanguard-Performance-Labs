"use client";
import { useEffect, useRef, useState, useCallback } from "react";

export const STATIONS = [
  { id: "arrival", label: "Arrival", depth: "000" },
  { id: "library", label: "Research Library", depth: "120" },
  { id: "catalog", label: "Catalog", depth: "240" },
  { id: "peptastic", label: "Peptastic OS", depth: "360" },
  { id: "standard", label: "The Standard", depth: "480" },
  { id: "contact", label: "Contact", depth: "600" },
];

/** Long eased scroll — the point is that you FEEL the travel, not that you arrive fast. */
export function travelTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView();
    return;
  }
  const start = window.scrollY;
  const end = el.getBoundingClientRect().top + start;
  const distance = end - start;
  const duration = Math.min(1600, Math.max(700, Math.abs(distance) * 0.55));
  const t0 = performance.now();
  document.documentElement.classList.add("travelling");

  function step(now: number) {
    const p = Math.min(1, (now - t0) / duration);
    // easeInOutCubic — accelerate away, decelerate into place
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    window.scrollTo(0, start + distance * e);
    if (p < 1) requestAnimationFrame(step);
    else document.documentElement.classList.remove("travelling");
  }
  requestAnimationFrame(step);
}

/** Fixed depth gauge — which station you're at, and how far down the column. */
export function DepthGauge() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = STATIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = sections.findIndex((s) => s === e.target);
            if (i >= 0) setActive(i);
          }
        }
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      <div className="pointer-events-auto mb-1 font-mono text-[9px] tracking-[0.2em] text-muted">
        DEPTH {STATIONS[active]?.depth ?? "000"}
      </div>
      <div className="relative h-40 w-px bg-white/10">
        <div
          className="absolute left-0 top-0 w-px bg-vg-grad transition-[height] duration-300"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      {STATIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => travelTo(s.id)}
          aria-label={`Go to ${s.label}`}
          aria-current={i === active ? "true" : undefined}
          className="pointer-events-auto group flex items-center gap-2"
        >
          <span
            className={`whitespace-nowrap font-mono text-[9px] tracking-widest transition-opacity ${
              i === active ? "text-vanguard-violet opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
            }`}
          >
            {s.label.toUpperCase()}
          </span>
          <span
            className={`block rounded-full transition-all ${
              i === active ? "h-2 w-2 bg-vanguard-violet shadow-[0_0_10px_rgba(168,85,247,0.9)]" : "h-1.5 w-1.5 bg-white/25"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

/** A full-viewport station in the descent. */
export function Station({
  id, index, label, children, footer, className = "",
}: {
  id: string; index: number; label: string;
  children: React.ReactNode; footer?: React.ReactNode; className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("arrived");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("arrived")),
      { threshold: 0.02, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`station relative flex min-h-screen snap-start flex-col justify-center overflow-hidden px-4 py-24 ${className}`}
    >
      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] tracking-[0.35em] text-white/20 xl:block">
        {String(index).padStart(2, "0")} · {label.toUpperCase()}
      </div>
      <div className="station-content mx-auto w-full max-w-7xl">{children}</div>
      {/* Sits outside station-content: that element is transformed, which would
          otherwise make it the containing block for absolute positioning. */}
      {footer}
    </section>
  );
}

/** Depth layer — moves at its own rate so the scene has real dimension. */
export function Depth({ z = 0, children, className = "" }: { z?: number; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | undefined>(undefined);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const centre = r.top + r.height / 2 - window.innerHeight / 2;
    el.style.transform = `translate3d(0, ${centre * z * -0.06}px, 0)`;
  }, [z]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [update]);

  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
}

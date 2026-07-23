"use client";
import { useEffect, useRef } from "react";

/** Scroll-reveal wrapper. Content is fully visible without JS; with JS it
 *  rises in when it enters the viewport. Respects prefers-reduced-motion
 *  via the global CSS kill-switch. */
export function Reveal({
  children, className = "", delay = 0, variant = "",
}: { children: React.ReactNode; className?: string; delay?: number; variant?: "" | "rv-left" | "rv-right" | "rv-scale" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${variant} ${className}`} style={{ "--rv-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** Infinite marquee: children are rendered twice in separate lanes so keys stay unique. */
export function Marquee({ children, className = "", laneClassName = "" }: {
  children: React.ReactNode; className?: string; laneClassName?: string;
}) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        <div className={`flex shrink-0 items-center ${laneClassName}`}>{children}</div>
        <div className={`flex shrink-0 items-center ${laneClassName}`} aria-hidden>{children}</div>
      </div>
    </div>
  );
}

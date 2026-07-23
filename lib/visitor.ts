"use client";
// Returning-visitor detection via a first-party storage marker.
// Deliberately NOT IP-based: IPs are shared (CGNAT/offices) and rotate on mobile,
// so IP "recognition" mis-greets constantly and creates privacy exposure.
// This marker is per-device, contains no PII, and never leaves the browser
// except as a boolean/count hint to the concierge.

export interface VisitorState { returning: boolean; visits: number }

const KEY = "vpl-visitor-v1";

// Cache per page-load so multiple components (hero rail + dock) see the SAME
// answer — without this, the second caller reads the marker the first just
// wrote and mis-greets a first-time visitor as returning.
let cached: VisitorState | null = null;

export function readAndMarkVisit(): VisitorState {
  if (typeof window === "undefined") return { returning: false, visits: 0 };
  if (cached) return cached;
  try {
    const raw = window.localStorage.getItem(KEY);
    const prev = raw ? (JSON.parse(raw) as { visits: number; last: number }) : null;
    const now = Date.now();
    // count a new "visit" at most once per 30 minutes
    const isNewVisit = !prev || now - prev.last > 30 * 60 * 1000;
    const visits = (prev?.visits ?? 0) + (isNewVisit ? 1 : 0);
    window.localStorage.setItem(KEY, JSON.stringify({ visits, last: now }));
    cached = { returning: !!prev, visits };
    return cached;
  } catch {
    return { returning: false, visits: 0 };
  }
}

export function timeGreeting(d = new Date()): string {
  const h = d.getHours();
  if (h < 5) return "Working late";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

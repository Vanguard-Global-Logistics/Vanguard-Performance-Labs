"use client";

import { APPROVED_HERO } from "@/lib/approved-home-hero";
import { APPROVED_WEIGHT } from "@/lib/approved-home-category-weight";
import { APPROVED_RECOVERY } from "@/lib/approved-home-category-recovery";
import { APPROVED_LONGEVITY } from "@/lib/approved-home-category-longevity";
import { APPROVED_COGNITIVE } from "@/lib/approved-home-category-cognitive";
import { APPROVED_IMMUNE } from "@/lib/approved-home-category-immune";
import { APPROVED_LAB } from "@/lib/approved-home-category-lab";

/**
 * Locks the homepage to the exact artwork extracted from the owner-approved QA
 * website. Do not replace these assets without a new visual approval.
 */
export function ApprovedHomeExactAssets() {
  const css = `
    .home-site-nav .home-nav-brand {
      background-image: url("/images/approved/vanguard-wordmark.webp") !important;
      background-position: left center !important;
      background-repeat: no-repeat !important;
      background-size: 230px 50px !important;
    }
    .home-site-nav .home-nav-brand > img { opacity: 0 !important; }

    .home-hero-cursor-glow,
    .home-hero-grid,
    .home-jessie-radar,
    .home-jessie-scan,
    .home-jessie-rimlight,
    .home-vial-halo,
    .home-embers,
    .home-category-spotlight,
    .home-category-orbit,
    .home-category-particles,
    .home-tool-ambient,
    .home-flag-ripples { display: none !important; }

    .home-jessie-art { position: relative !important; }
    .home-jessie-art > img,
    .home-jessie-art > svg { opacity: 0 !important; }
    .home-jessie-art::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      background-image: url("/images/approved/jessie-approved.webp");
      background-position: center 25%;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .home-vial-scene {
      transform: none !important;
      background-image: url("${APPROVED_HERO}") !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
    }
    .home-vial-scene > .home-hero-vial {
      opacity: 0 !important;
      pointer-events: none !important;
      animation: none !important;
    }

    .home-category > img { opacity: 0 !important; }
    .home-category:nth-child(1) { background-image: url("${APPROVED_WEIGHT}") !important; }
    .home-category:nth-child(2) { background-image: url("${APPROVED_RECOVERY}") !important; }
    .home-category:nth-child(3) { background-image: url("${APPROVED_LONGEVITY}") !important; }
    .home-category:nth-child(4) { background-image: url("${APPROVED_COGNITIVE}") !important; }
    .home-category:nth-child(5) { background-image: url("${APPROVED_IMMUNE}") !important; }
    .home-category:nth-child(6) { background-image: url("${APPROVED_LAB}") !important; }
    .home-category {
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
    }

    @media (max-width: 1023px) {
      .home-site-nav .home-nav-brand { background-size: 205px 48px !important; }
    }
    @media (max-width: 639px) {
      .home-site-nav .home-nav-brand { background-size: 180px auto !important; }
      .home-vial-scene { background-size: contain !important; }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

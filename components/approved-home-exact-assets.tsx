"use client";

import { APPROVED_HERO } from "@/lib/approved-home-hero";
import { APPROVED_WORDMARK } from "@/lib/approved-home-wordmark";
import {
  APPROVED_CATEGORY_COGNITIVE,
  APPROVED_CATEGORY_IMMUNE,
  APPROVED_CATEGORY_LAB,
  APPROVED_CATEGORY_LONGEVITY,
  APPROVED_CATEGORY_RECOVERY,
  APPROVED_CATEGORY_WEIGHT,
  APPROVED_JESSIE,
  APPROVED_VETERAN_MARK,
} from "@/lib/approved-home-assets";

/**
 * Locks the homepage to the exact artwork extracted from the owner-approved QA
 * website. These overrides intentionally remove later substitute art and
 * decorative layers that were not present in the approved reference.
 */
export function ApprovedHomeExactAssets() {
  const css = `
    .home-site-nav .home-nav-brand {
      background-image: url("${APPROVED_WORDMARK}") !important;
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
      background-image: url("${APPROVED_JESSIE}");
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
    .home-category:nth-child(1) { background-image: url("${APPROVED_CATEGORY_WEIGHT}") !important; }
    .home-category:nth-child(2) { background-image: url("${APPROVED_CATEGORY_RECOVERY}") !important; }
    .home-category:nth-child(3) { background-image: url("${APPROVED_CATEGORY_LONGEVITY}") !important; }
    .home-category:nth-child(4) { background-image: url("${APPROVED_CATEGORY_COGNITIVE}") !important; }
    .home-category:nth-child(5) { background-image: url("${APPROVED_CATEGORY_IMMUNE}") !important; }
    .home-category:nth-child(6) { background-image: url("${APPROVED_CATEGORY_LAB}") !important; }
    .home-category {
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
    }

    .home-veteran-copy { position: relative !important; }
    .home-veteran-copy > .home-veteran-mark { opacity: 0 !important; }
    .home-veteran-copy::before {
      content: "";
      position: absolute;
      left: 22px;
      top: 50%;
      width: 66px;
      height: 56px;
      transform: translateY(-50%);
      background-image: url("${APPROVED_VETERAN_MARK}");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      filter: sepia(1) saturate(4) hue-rotate(350deg) brightness(1.22) drop-shadow(0 0 9px rgba(217,168,78,.48));
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

"use client";

import { useEffect } from "react";

const CATEGORY_ART = [
  "/images/approved/category-weight-management.webp",
  "/images/approved/category-recovery.webp",
  "/images/approved/category-longevity.webp",
  "/images/approved/category-cognitive-support.webp",
  "/images/approved/category-immune-support.webp",
  "/images/approved/category-lab-supply.webp",
] as const;

/**
 * Reconnects the real, owner-approved homepage artwork extracted from the
 * approved single-file QA preview. Every large image is now served as a normal
 * binary file from /public, so hydration and browser URL parsing stay reliable.
 */
export function ApprovedHomeExactAssets() {
  useEffect(() => {
    const scene = document.querySelector<HTMLElement>(".home-vial-scene");
    let hero = scene?.querySelector<HTMLImageElement>(".home-approved-hero") ?? null;

    if (scene && !hero) {
      hero = document.createElement("img");
      hero.className = "home-approved-hero";
      hero.alt = "";
      hero.setAttribute("aria-hidden", "true");
      hero.decoding = "async";
      scene.prepend(hero);
    }

    if (hero) hero.src = "/images/approved/hero-winged-vial.webp";

    const categoryImages = document.querySelectorAll<HTMLImageElement>(".home-category > img");
    categoryImages.forEach((image, index) => {
      const source = CATEGORY_ART[index];
      if (!source) return;
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
      image.decoding = "async";
      image.src = source;
    });

    return () => {
      document.querySelector<HTMLImageElement>(".home-approved-hero")?.remove();
    };
  }, []);

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
      background: none !important;
    }
    .home-approved-hero {
      position: absolute;
      inset: 0;
      z-index: 0;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
      object-position: center;
      filter: saturate(1.04) contrast(1.03);
    }
    .home-vial-scene > .home-hero-vial {
      display: none !important;
    }

    .home-category { background-image: none !important; }
    .home-category > img {
      opacity: 1 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
    }

    @media (max-width: 1023px) {
      .home-site-nav .home-nav-brand { background-size: 205px 48px !important; }
    }
    @media (max-width: 639px) {
      .home-site-nav .home-nav-brand { background-size: 180px auto !important; }
      .home-approved-hero { object-fit: contain; }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

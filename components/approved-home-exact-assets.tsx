"use client";

import { useEffect } from "react";

/**
 * Reconnects the real, owner-approved homepage artwork extracted from the
 * approved single-file QA preview. Every large image is served as a normal
 * binary file from /public, so hydration and browser URL parsing stay reliable.
 * Category artwork is rendered directly by Next/Image; this layer must not
 * mutate those image URLs after hydration because doing so aborts valid image
 * optimizer requests in the browser.
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
      background-image: url("/images/approved/hero-winged-vial.webp") !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
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
      .home-vial-scene { background-size: contain !important; }
      .home-approved-hero { object-fit: contain; }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

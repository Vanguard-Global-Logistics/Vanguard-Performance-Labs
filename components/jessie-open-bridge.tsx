"use client";

/**
 * Compatibility bridge for homepage CTA buttons that call the first element
 * whose aria-label begins with "Open Jessie". Keeping the bridge ahead of the
 * page content prevents those CTAs from selecting and recursively clicking
 * themselves. The bridge then targets the real dock toggle explicitly.
 */
export function JessieOpenBridge() {
  function openJessie() {
    const dock = document.querySelector<HTMLButtonElement>(
      'button.vt-dock[aria-label*="Jessie, the Vanguard AI Concierge"]',
    );

    if (!dock || dock.getAttribute("aria-expanded") === "true") return;
    dock.click();
  }

  return (
    <button
      type="button"
      hidden
      tabIndex={-1}
      aria-label="Open Jessie concierge"
      data-jessie-open-bridge
      onClick={openJessie}
    />
  );
}

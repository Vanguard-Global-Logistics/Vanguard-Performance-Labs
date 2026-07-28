import { test, expect } from "@playwright/test";

const ROUTES = [
  "/", "/about", "/products", "/education", "/research", "/articles",
  "/videos", "/peptastic", "/professionals", "/wholesale", "/partnerships", "/contact",
  "/cart", "/checkout", "/legal/terms", "/legal/privacy", "/legal/refunds",
];
const FORBIDDEN = ["Throne", "Jarvis", "SARGE", " Kai "];

test.describe("Vanguard site — launch smoke and guardrails", () => {
  for (const route of ROUTES) {
    test(`loads ${route} with no console errors or forbidden names`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
      page.on("requestfailed", (request) => errors.push(`REQUEST FAILED ${request.url()}: ${request.failure()?.errorText ?? "unknown"}`));
      page.on("response", (response) => {
        if (response.status() >= 400) errors.push(`HTTP ${response.status()} ${response.url()}`);
      });
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page).toHaveTitle(/Vanguard/i);
      const body = (await page.textContent("body")) ?? "";
      for (const forbidden of FORBIDDEN) expect(body).not.toContain(forbidden);
      const safeRoute = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({ path: `test-results/visual/${safeRoute}.png`, fullPage: true });
      expect(errors, `browser errors on ${route}: ${errors.join(" | ")}`).toHaveLength(0);
    });
  }

  test("approved homepage contains Jessie, Research with Confidence, and exact winged-vial artwork", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /research with confidence/i })).toBeVisible();
    await expect(page.getByText(/Jessie · live AI guide/i)).toBeVisible();
    const vialScene = page.locator(".home-vial-scene");
    await expect(vialScene).toBeVisible();
    await expect.poll(() => vialScene.evaluate((element) => {
      const background = getComputedStyle(element).backgroundImage;
      return background.startsWith('url("data:image/webp;base64,') && background.length > 1000;
    })).toBeTruthy();
    await expect(page.getByRole("button", { name: /open Jessie AI guide/i })).toBeVisible();
  });

  test("critical visual assets load successfully", async ({ page }) => {
    for (const route of ["/", "/products", "/about"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      const broken = await page.locator("img").evaluateAll((elements) =>
        (elements as HTMLImageElement[])
          .filter((image) => image.getAttribute("aria-hidden") !== "true")
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.getAttribute("src") ?? image.getAttribute("alt") ?? "unknown image"),
      );
      expect(broken, `broken images on ${route}: ${broken.join(", ")}`).toEqual([]);
    }
  });

  for (const route of ["/", "/products", "/cart", "/checkout", "/education", "/contact"]) {
    test(`no horizontal overflow on mobile: ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflow).toBeFalsy();
    });
  }

  test("mobile navigation opens, traps the page scroll, and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeHidden();
  });

  test("contact form validates and reaches its success state", async ({ page }) => {
    await page.route("**/api/inquiry", async (route) => {
      const payload = route.request().postDataJSON();
      expect(payload).toMatchObject({ company: "Test User", email: "test@example.com", mode: "information_request" });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, status: "received", inquiryId: "VPL-I-TEST" }),
      });
    });
    await page.goto("/contact");
    await page.getByPlaceholder("How can we help?").fill("Test inquiry");
    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 5000 });
  });

  test("catalog strength follows the selected vial into cart and checkout", async ({ page }) => {
    await page.goto("/products");
    const card = page.locator("article").filter({ hasText: "BPC-157" }).first();
    await expect(card).toBeVisible();

    const strength = card.getByRole("button", { name: "10mg", exact: true });
    if (await strength.count()) await strength.click();
    await expect(card.locator('svg[aria-label*="BPC-157"][aria-label*="10mg"]')).toBeVisible();
    await card.getByRole("button", { name: /add to order/i }).click();

    await page.goto("/cart");
    await expect(page.getByText(/BPC-157/).first()).toBeVisible();
    await expect(page.getByText(/10mg/).first()).toBeVisible();
    await page.getByRole("button", { name: /increase BPC-157 quantity/i }).click();
    await expect(page.locator(".quantity-picker span").first()).toHaveText("2");
    await page.getByRole("link", { name: /continue to checkout/i }).click();
    await expect(page.getByRole("heading", { name: /one final review/i })).toBeVisible();
    await expect(page.getByText(/BPC-157 · 10mg × 2/)).toBeVisible();
  });

  test("checkout validates, submits server-authoritative lines, and confirms", async ({ page }) => {
    await page.goto("/products");
    const card = page.locator("article").filter({ hasText: "BPC-157" }).first();
    await card.getByRole("button", { name: /add to order/i }).click();
    await page.goto("/checkout");

    await page.getByRole("button", { name: /submit reviewed order request/i }).click();
    await expect(page.locator(".checkout-error")).toContainText(/company or institution/i);

    await page.route("**/api/orders", async (route) => {
      const request = route.request();
      const payload = request.postDataJSON();
      expect(payload.items[0]).toMatchObject({ slug: "bpc-157", qty: 1 });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          orderId: "VPL-TEST123",
          total: 55,
          settlement: { instructions: "Test settlement instructions." },
        }),
      });
    });

    await page.locator('input[name="company"]').fill("Vanguard Test Lab");
    await page.locator('input[name="contact"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('input[name="ship_line1"]').fill("100 Research Way");
    await page.locator('input[name="ship_city"]').fill("Tampa");
    await page.locator('input[name="ship_state"]').fill("FL");
    await page.locator('input[name="ship_zip"]').fill("33601");
    await page.locator('input[type="checkbox"]').check();
    await page.getByRole("button", { name: /submit reviewed order request/i }).click();
    await expect(page.getByText("VPL-TEST123")).toBeVisible();
    await expect(page.getByText(/test settlement instructions/i)).toBeVisible();
  });
});

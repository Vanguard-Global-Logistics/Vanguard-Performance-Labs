import { test, expect } from "@playwright/test";

const ROUTES = [
  "/", "/about", "/products", "/education", "/research", "/articles",
  "/videos", "/peptastic", "/professionals", "/wholesale", "/partnerships", "/contact",
  "/cart", "/checkout", "/legal/terms", "/legal/privacy", "/legal/refunds",
];

const FORBIDDEN = ["Throne", "Jarvis", "SARGE", " Kai "];

test.describe("Vanguard site — smoke + launch guardrails", () => {
  for (const route of ROUTES) {
    test(`loads ${route} with no console errors or forbidden names`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page).toHaveTitle(/Vanguard/i);
      const body = (await page.textContent("body")) ?? "";
      for (const bad of FORBIDDEN) expect(body).not.toContain(bad);
      await page.screenshot({ path: `test-results/visual${route === "/" ? "/home" : route}.png`, fullPage: true });
      expect(errors, `console errors on ${route}: ${errors.join(" | ")}`).toHaveLength(0);
    });
  }

  test("homepage has Jessie audio concierge and guarded agent network", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/Jessie · Audio Concierge/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /hear jessie/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /one concierge, five narrowly defined responsibilities/i })).toBeVisible();
    await expect(page.locator('img[alt*="Jessie"], svg[aria-label*="Jessie"]').first()).toBeVisible();
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBeFalsy();
  });

  test("contact form validates and shows success", async ({ page }) => {
    await page.goto("/contact");
    await page.getByPlaceholder("How can we help?").fill("Test professional inquiry");
    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 5000 });
  });

  test("catalog is professional inquiry only", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByText(/no consumer checkout/i).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /professional inquiry/i }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /add .* to order/i })).toHaveCount(0);
  });

  test("cart and checkout are disabled launch safeguards", async ({ page }) => {
    await page.goto("/cart");
    await expect(page.getByRole("heading", { name: /public ordering is not enabled/i })).toBeVisible();
    await page.goto("/checkout");
    await expect(page.getByRole("heading", { name: /checkout is intentionally disabled/i })).toBeVisible();
  });
});

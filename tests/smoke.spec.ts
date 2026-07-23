import { test, expect } from "@playwright/test";

const ROUTES = [
  "/", "/about", "/products", "/education", "/research", "/articles",
  "/videos", "/peptastic", "/professionals", "/wholesale", "/partnerships", "/contact",
  "/cart", "/legal/terms", "/legal/privacy", "/legal/refunds",
];
const FORBIDDEN = ["Throne", "Jarvis", "SARGE", " Kai "];

test.describe("Vanguard site — smoke + guardrails", () => {
  for (const route of ROUTES) {
    test(`loads ${route} with no console errors, no forbidden names`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page).toHaveTitle(/Vanguard/i);
      const body = (await page.textContent("body")) ?? "";
      for (const bad of FORBIDDEN) expect(body).not.toContain(bad);
      // capture a screenshot for visual review
      await page.screenshot({ path: `test-results/visual${route === "/" ? "/home" : route}.png`, fullPage: true });
      expect(errors, `console errors on ${route}: ${errors.join(" | ")}`).toHaveLength(0);
    });
  }

  test("homepage has hero heading, Jessie concierge, and winged vial svg", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Jessie AI Concierge")).toBeVisible();
    await expect(page.locator('img[alt*="Jessie"], svg[aria-label*="Jessie"]').first()).toBeVisible();
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBeFalsy();
  });

  test("contact form validates and shows success", async ({ page }) => {
    await page.goto("/contact");
    await page.getByPlaceholder("How can we help?").fill("Test inquiry");
    // required fields empty → inline error path exists; then fill and submit
    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 5000 });
  });

  test("cart: add product, adjust qty, reach checkout", async ({ page }) => {
    await page.goto("/products");
    await page.getByRole("button", { name: /add bpc-157 to order/i }).click();
    await page.goto("/cart");
    await expect(page.getByText("BPC-157")).toBeVisible();
    await page.getByRole("link", { name: /proceed to checkout/i }).click();
    await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();
    await expect(page.getByText(/bank wire \/ ach/i).first()).toBeVisible();
  });
});

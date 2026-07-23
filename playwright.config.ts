import { defineConfig, devices } from "@playwright/test";

// Renders the real site at the four approved viewports (VISUAL-QA.md).
export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results/visual",
  fullyParallel: true,
  reporter: [["list"], ["html", { outputFolder: "test-results/report", open: "never" }]],
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop-1920", use: { viewport: { width: 1920, height: 1080 } } },
    { name: "laptop-1440", use: { viewport: { width: 1440, height: 900 } } },
    { name: "tablet-1024", use: { viewport: { width: 1024, height: 768 } } },
    { name: "mobile-430", use: { ...devices["iPhone 14 Pro Max"], viewport: { width: 430, height: 932 } } },
  ],
});

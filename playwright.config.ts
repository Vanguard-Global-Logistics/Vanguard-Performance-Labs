import { defineConfig, devices } from "@playwright/test";

// Renders the real production build at the four approved viewports.
// Every project uses Chromium so local and CI browser installation stay deterministic.
export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results/visual",
  fullyParallel: true,
  reporter: [["list"], ["html", { outputFolder: "test-results/report", open: "never" }]],
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry", browserName: "chromium" },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop-1920", use: { browserName: "chromium", viewport: { width: 1920, height: 1080 } } },
    { name: "laptop-1440", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
    { name: "tablet-1024", use: { browserName: "chromium", viewport: { width: 1024, height: 768 } } },
    {
      name: "mobile-430",
      use: {
        ...devices["iPhone 14 Pro Max"],
        browserName: "chromium",
        viewport: { width: 430, height: 932 },
      },
    },
  ],
});

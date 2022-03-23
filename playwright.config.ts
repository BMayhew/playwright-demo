import { PlaywrightTestConfig } from "@playwright/test";
require("dotenv").config();

const config: PlaywrightTestConfig = {
  globalSetup: "./global-setup",
  //globalTeardown: './global-teardown',
  use: {
    baseURL: process.env.APP_URL,
    browserName: "chromium",
    headless: true,
    navigationTimeout: 5000,
    actionTimeout: 5000,
    launchOptions: {
      args: [
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
      ],
    },
    screenshot: "only-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    trace: "on",
    extraHTTPHeaders: { playwright: "yes" },
  },
  retries: 0,
  workers: 2,
  reporter: [["list"], ["html"]],
  forbidOnly: !!process.env.CI, //This will fail if 'test.only' is committed to repo
};

export default config;



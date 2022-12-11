import { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const config: PlaywrightTestConfig = {
  globalSetup: "./global-setup",
  use: {
    baseURL: process.env.APP_URL,
    browserName: "chromium",
    headless: true,
    navigationTimeout: 10000,
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
    testIdAttribute: "data-qa",
  },
  testDir: "./tests",
  snapshotPathTemplate:
    "{testDir}/.screenshots/{testFilePath}/{platform}-{projectName}{arg}{ext}",
  retries: 1,
  workers: 2,
  // grep: /@happy|@smoke/,
  reporter: process.env.CI
    ? [
        [
          "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
          {
            channels: ["slack-testing"], // provide one or more Slack channels
            sendResults: "always", // "always" , "on-failure", "off"
          },
        ],
        ["dot"],
        ["list"],
        ["html"],
      ]
    : [["dot"], ["list"], ["html"]],
  forbidOnly: !!process.env.CI, //This will fail if 'test.only' is committed to repo
};

export default config;

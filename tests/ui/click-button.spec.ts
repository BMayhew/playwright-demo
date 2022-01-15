import { test } from "@playwright/test";

test.skip("Clicking the button 3 times", async ({ page }) => {
  await page.goto("https://ministryoftesting.github.io/the-button/");

  //click the button as soon as it's active 3 times
  for (let i = 0; i < 3; i++) {
    await page.locator("#theButton").click();
    await page.waitForSelector('img[src*="green"]');
  }
});

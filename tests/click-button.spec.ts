import { test } from '@playwright/test';

test('Clicking the button 3 times', async ({ page }) => {
  await page.goto('https://ministryoftesting.github.io/the-button/');

  for (let i = 0; i < 3; i++) {
    await page.locator('#theButton').click();
    await page.waitForSelector('img[src*="green"]')
  }
});
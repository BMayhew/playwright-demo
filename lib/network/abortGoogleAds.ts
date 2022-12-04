import { test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/*", (route) => {
      route.request().url().startsWith("https://googleads.g.doubleclick.net")
        ? route.abort() //if true
        : route.continue(); //if false
      return;
    });
    await use(page);
  },
});

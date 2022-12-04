import { test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
    await page.route("**/get_product_picture/**", (route) => route.abort());

    await use(page);
  },
});

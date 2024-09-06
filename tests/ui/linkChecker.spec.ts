// code originally from - https://github.com/checkly/playwright-examples/tree/main/404-detection - with modifications

import { test } from "@playwright/test";
import {
  getAllLinksFromPage,
  checkLinksFromPage,
} from "../../lib/helpers/links";

test.describe("No 404s on WebPages pages", () => {
  test(`The docs have no 404s`, async ({ page }, testInfo) => {
    await page.goto("https://www.checklyhq.com/docs/");
    const linkUrls = await getAllLinksFromPage(page);
    await checkLinksFromPage(linkUrls, page, test, testInfo);
  });
});

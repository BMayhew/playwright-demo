//copyToClipboard.spec.ts

import { test, expect } from "@playwright/test";

test.use({ userAgent: "some custom ua" });

test("Validate Copy to Clipboard 1", async ({ page }) => {
  await page.goto("https://codepen.io/shaikmaqsood/pen/XmydxJ");

  test.step("Click on Copy TEXT 1 button", async () => {
    await page
      .frameLocator("#result")
      .getByRole("button", { name: "Copy TEXT 1" })
      .click();

    let clipboardText1 = await page.evaluate("navigator.clipboard.readText()");
    expect(clipboardText1).toContain("Hello, I'm TEXT 1");
  });

  await page.waitForTimeout(500); //I added this due to the wonky behavior of the 2nd element, I believe the evaluate above was happening too fast

  test.step("Click on Copy TEXT 2 button", async () => {
    await page
      .frameLocator("#result")
      .getByRole("button", { name: "Copy TEXT 2" })
      .click();

    let clipboardText2 = await page.evaluate("navigator.clipboard.readText()");
    expect(clipboardText2).toContain("Hi, I'm the 2nd TEXT");
  });
});

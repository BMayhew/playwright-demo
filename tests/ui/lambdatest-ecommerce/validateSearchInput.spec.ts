import { test, expect } from "@playwright/test";

test("Validate product search input", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  const productName = "Palm Treo Pro";
  const productSearch = page.getByRole("textbox", {
    name: "Search For Products",
  });
  const searchButton = page.getByRole("button", { name: "Search" });

  await productSearch.fill(productName);

  await test.step("persists after running a search", async () => {
    await searchButton.click();
    await expect(productSearch).toHaveValue(productName);
  });

  await test.step("persist after running a search alternate method", async () => {
    await productSearch.click();
    let userAgentInfo = await page.evaluate(() => navigator.userAgent);
    if (userAgentInfo.includes("Mac OS")) {
      await page.keyboard.press("Meta+A");
      await page.keyboard.press("Meta+C");
    } else {
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Control+C");
    }

    let clipboardText = await page.evaluate("navigator.clipboard.readText()");
    expect(clipboardText).toBe(productName);
  });

  await test.step("persists after navigating to the product page", async () => {
    await page.getByRole("link", { name: productName }).nth(1).click();
    await expect(productSearch).toHaveValue(productName);
  });

  await test.step("persists after adding product to cart", async () => {
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(productSearch).toHaveValue(productName);
  });

  await test.step("does not persists when visiting checkout", async () => {
    await page.getByRole("link", { name: "Checkout " }).click();
    await expect(productSearch).not.toHaveValue(productName);
  });
});

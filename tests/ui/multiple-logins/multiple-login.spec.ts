import { test, expect } from "@playwright/test";

let url =
  "https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/page&page_id=9";

test.skip();

test("Find the correct email input box", async ({ page }) => {
  await page.goto(url);

  const mediumSizeDiv = page.locator(".entry-col", {
    has: page.locator("text=Medium size"),
  });

  mediumSizeDiv.locator("id=input-email").fill("1test@test.com");
  mediumSizeDiv.locator("id=input-password").fill("123456");
  mediumSizeDiv.getByRole("button", { name: "Login" }).click();

  await page.waitForURL(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  );

  await expect(page.locator(".alert-danger")).toHaveText(
    "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
    // "Warning: No match for E-Mail Address and/or Password."
  );
});

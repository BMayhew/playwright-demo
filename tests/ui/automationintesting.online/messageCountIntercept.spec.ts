import { test, expect } from "@playwright/test";

test.describe("/admin Checks", async () => {
  test(`Validate Message Count is correct`, async ({ page }) => {
    let message;

    await page.route("**/message/count", async (route) => {
      const response = await route.fetch();
      message = await response.json();
      route.continue();
    });

    await page.goto("https://automationintesting.online/");
    await page.getByRole("button", { name: "Let me hack!" }).click();
    await page.getByRole("link", { name: "Admin panel" }).click();
    await page.locator('[data-testid="username"]').fill("admin");
    await page.locator('[data-testid="password"]').fill("password");
    await page.locator('[data-testid="submit"]').click();
    
    await expect(page.getByRole("link", { name: "Logout" })).toHaveText(
      "Logout"
    );

    const messageCountSpan = page
      .locator('[href*="#/admin/messages"]')
      .locator("span");

    // Wait for the message count to be updated before making an assertion
    await page.waitForResponse("**/message/count")
    await expect(messageCountSpan).toHaveText(`${message.count}`);
  });
});

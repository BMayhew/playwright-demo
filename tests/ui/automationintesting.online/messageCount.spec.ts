import { test, expect, selectors } from "@playwright/test";

test.describe("/admin Checks", async () => {
  let count = "100";

  test.beforeEach(async ({ page }) => {
    selectors.setTestIdAttribute("data-testid");

    // This calls an async function that exists at the bottom of this page, it takes the page instance and a number
    await mockMessageCount(page, count);
    await page.goto("https://automationintesting.online/");
    await page.getByRole("button", { name: "Let me hack!" }).click();
    await page.getByRole("link", { name: "Admin panel" }).click();
    await page.getByTestId("username").fill("admin");
    await page.getByTestId("password").fill("password");
    await page.getByTestId("submit").click();
  });

  test(`Validate Message Count is ${count}`, async ({ page }) => {
    await expect(page.getByRole("link", { name: "Logout" })).toHaveText(
      "Logout"
    );

    const messageCountSpan = page
      .locator('[href*="#/admin/messages"]')
      .locator("span");

    await expect(messageCountSpan).toHaveText(`${count}`);
  });
});

// This function uses the route class and fulfill intercepting what was sent form the server and fulfill it with our provided response (mocking!)
export async function mockMessageCount(page, messageCount) {
  await page.route("**/message/count", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify({ count: messageCount }),
    })
  );
}

import { test, expect } from "@playwright/test";

test.describe("Data Tables", async () => {
  let emailName = "fbach@yahoo.com";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
  });

  test("Based on email return website spec", async ({ page }) => {
    const row = page
      .locator("#table2")
      .locator("tr", { has: page.locator(`text="${emailName}"`) });

    expect(row).toContainText("Bach");
    expect(row).toContainText("Frank");
    expect(row).toContainText("$51.00");
    expect(row).toContainText("http://www.frank.com");

    await row.getByRole("link", { name: "edit" }).click();
    await expect(page).toHaveURL(/.*#edit/);
  });
});

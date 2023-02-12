import { test, expect } from "@playwright/test";

test.describe("Challenging DOM parent", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/challenging_dom");
  });

  test("Find parent element with has option in Playwright locator", async ({
    page,
  }) => {
    await page
      .locator("tr", { has: page.locator('text="Adipisci5"') })
      .getByRole("link", { name: "edit" })
      .click();

    expect(page).toHaveURL(/.*#edit/);
  });

  test("Find parent element with has-text", async ({ page }) => {
    await page.locator('tr:has-text("Adipisci5")').locator("text=edit").click();

    expect(page).toHaveURL(/.*#edit/);
  });

  test("Find parent element with getByRole locator and accessible name", async ({
    page,
  }) => {
    await page
      .getByRole("row", { name: "Adipisci5" })
      .getByRole("link", { name: "edit" })
      .click();

    expect(page).toHaveURL(/.*#edit/);
  });

  test("Find parent element with getByRole locator and filter with regex", async ({
    page,
  }) => {
    await page
      .getByRole("row")
      .filter({ hasText: /Ad.*sci5/ })
      .getByRole("link", { name: "edit" })
      .click();

    expect(page).toHaveURL(/.*#edit/);
  });

  test("Find parent element with xpath", async ({ page }) => {
    await page
      .locator("text=Adipisci5")
      .locator("..")
      .locator("text=edit")
      .click();

    expect(page).toHaveURL(/.*#edit/);
  });

  test("Find parent element with xpath broken down", async ({ page }) => {
    const cell = page.locator("text=Adipisci5");
    const row = cell.locator("..");
    const editLink = row.locator("text=edit");

    await editLink.click();

    expect(page).toHaveURL(/.*#edit/);
  });
});

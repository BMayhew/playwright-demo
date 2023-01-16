import { test, expect } from "@playwright/test";

test.describe("Grep Describe @1", async () => {
  test("Test A @2", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/login");
    expect(page.getByTestId("login-email")).toBeEmpty;
  });

  test("Test B @3", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/login");
    expect(page.getByTestId("login-email")).toBeEmpty;
  });
});

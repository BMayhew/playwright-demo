import { test, expect } from "@playwright/test";
import { createUser, deleteUser } from "../../lib/datafactory/user";

let username = "";
let password = process.env.USER_PASSWORD;

test.describe("/login", async () => {
  test.beforeEach(async ({ context }) => {
    username = await createUser();
    await context.route("**/*", (request) => {
      request.request().url().startsWith("https://googleads.g.doubleclick.net")
        ? request.abort() //if true
        : request.continue(); //if false
      return;
    });
  });

  test.afterEach(async () => {
    await deleteUser(username);
  });

  test("Successfully Login", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/login");

    await page.locator("[data-qa=login-email]").fill(username);
    await page.locator("[data-qa=login-password]").fill(password);
    await page.locator("text=Login").click();
    // await page.locator("button:has-text('Login')").click();
    // await page.locator("[data-qa=login-button]").click();

    expect(page.locator("header")).toContainText("Logged in as Testy");
  });

  test("Successfully Logout", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/login");

    await page.locator("[data-qa=login-email]").fill(username);
    await page.locator("[data-qa=login-password]").fill(password);
    await page.locator("[data-qa=login-button]").click();
    expect(page.locator("header")).toContainText("Logged in as Testy");
    expect(page.locator("[data-qa=login-email]")).toHaveCount(0);

    await page.locator("text=Logout").click();
    expect(page.locator("header")).not.toContainText("Logged in as Test");
    expect(page.locator("[data-qa=login-email]")).toHaveCount(1);
  });
});

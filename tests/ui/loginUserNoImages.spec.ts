import { test } from "../../lib/network/abortImages";
import { expect } from "@playwright/test";
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

  test("Successfully Login @happy", async ({ page, baseURL, headless }) => {
    await page.goto(baseURL + "/login");

    await page.getByTestId("login-email").fill(username);
    await page.getByTestId("login-password").fill(password);
    // await page.locator("text=Login").click();
    // await page.getByTestId("login-button").click();
    await page.locator("button:has-text('Login')").click();
    await page.waitForLoadState("networkidle");

    expect(page.locator("header")).toContainText("Logged in as Testy");

    headless //If headless mode is true compare screenshots else skip
      ? expect(await page.screenshot()).toMatchSnapshot("loginUserNoImages.png")
      : console.log("Running in Headed mode, no screenshot comparison");
  });

  test("Successfully Logout", async ({ page, baseURL }) => {
    await page.goto(baseURL + "/login");

    await page.getByTestId("login-email").fill(username);
    await page.getByTestId("login-password").fill(password);
    await page.getByTestId("login-button").click();
    expect(page.locator("header")).toContainText("Logged in as Testy");
    expect(page.getByTestId("login-email")).toHaveCount(0);

    await page.locator("text=Logout").click();
    expect(page.locator("header")).not.toContainText("Logged in as Test");
    expect(page.getByTestId("login-email")).toHaveCount(1);
  });
});

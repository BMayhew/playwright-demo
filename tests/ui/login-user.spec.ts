import { test, expect } from "@playwright/test";
import { createUser, deleteUser } from "../../lib/datafactory/user";

let username = "";
let password = process.env.USER_PASSWORD;

test.beforeEach(async () => {
  username = await createUser();
});

test.afterEach(async () => {
  await deleteUser(username);
});

test("Successfully Login", async ({ page, baseURL }) => {
  await page.goto(baseURL + "/login");

  await page.locator("[data-qa=login-email]").fill(username);
  await page.locator("[data-qa=login-password]").fill(password);
  await page.locator("button:has-text('Login')").click();
  //await page.locator("text=Login").click();
  //await page.locator("button:has-text('Login1')").click(); //this is currently was broken on purpose

  expect(await page.locator("header")).toContainText("Logged in as Testy");
});

test("Successfully Logout", async ({ page, baseURL }) => {
  await page.goto(baseURL + "/login");

  await page.locator("[data-qa=login-email]").fill(username);
  await page.locator("[data-qa=login-password]").fill(password);
  await page.locator("[data-qa=login-button]").click();
  expect(await page.locator("header")).toContainText("Logged in as Testy");
  expect(await page.locator("[data-qa=login-email]")).toHaveCount(0);

  await page.locator("text=Logout").click();
  expect(await page.locator("header")).not.toContainText("Logged in as Test");
  expect(await page.locator("[data-qa=login-email]")).toHaveCount(1);
});

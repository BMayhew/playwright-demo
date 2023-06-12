import { test, expect } from "@playwright/test";

test("Intercept request postData /validate", async ({ page, context }) => {
  await page.goto("https://automationintesting.online/#/admin");
  await page.getByRole("button", { name: "Let me hack!" }).click();
  await page.locator('[data-testid="username"]').fill("admin");
  await page.locator('[data-testid="password"]').fill("password");
  await page.locator('[data-testid="submit"]').click();

  // I added this wait to slow my test down from opening a new tab/page, without this on a fast machine, the server didn't have the token to authenticate second window. 
  await page.waitForTimeout(500)

  // Now we are authenticated make sure the 'validate' endpoint post data is correct
  // This required a different page context as validate only calls on a hard refresh and Playwright doesn't have that capability yet
  const pageTwo = await context.newPage();

  //Get data from a POST request (notice no await!!)
  const requestPromise = pageTwo.waitForRequest(response =>
    response.url() === "https://automationintesting.online/auth/validate" && response.method() === "POST"
  );

  await pageTwo.goto("https://automationintesting.online/#/admin/");

  const request = await requestPromise;
  const token = request.postDataJSON().token;
  // https://playwright.dev/docs/api/class-page#page-wait-for-request
  // https://playwright.dev/docs/api/class-request
  // https://playwright.dev/docs/api/class-request#request-post-data-json

  expect(typeof token).toBe("string");
  // console.log(token);
});

test("Intercept response data /count /room/", async ({ page }) => {
  await page.goto("https://automationintesting.online/#/admin");
  await page.getByRole("button", { name: "Let me hack!" }).click();
  await page.locator('[data-testid="username"]').fill("admin");
  await page.locator('[data-testid="password"]').fill("password");

  // Now we are authenticated make sure the 'count' endpoint post data is returned and save to variable

  // Start waiting for response before clicking. Note no awaits.
  const responsePromise = page.waitForResponse(
    "https://automationintesting.online/message/count"
  );

  const responsePromise2 = page.waitForResponse(
    "https://automationintesting.online/room/"
  );

  // Initiate the click that makes the network requests
  await page.locator('[data-testid="submit"]').click();

  // Set variable response to the responsePromise
  const response = await responsePromise;

  // Set response Body (JSON) to variable - body
  const body = await response.json();
  // console.log(body); // body = { count: 1 }

  // Set count variable to count value
  let count = body.count.toString();

  expect(page.locator('[href*="#/admin/messages"]').locator("span")).toHaveText(
    count
  );

  const response2 = await responsePromise2;
  const body2 = await response2.json();
  expect(body2.rooms[0].roomid).toBe(1);
  // console.log(body2);
});

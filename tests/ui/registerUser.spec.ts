import { test, expect } from "@playwright/test";

let name = "Happy McPathy";
let email =
  Date.now() + (Math.floor(Math.random() * 90000) + 10000) + "test@asdf.comx";
let password = "P@$$w0rD";

test.beforeEach(async ({ context }) => {
  await context.route("**/*", (request) => {
    request.request().url().startsWith("https://googleads.g.doubleclick.net")
      ? request.abort() //if true
      : request.continue(); //if false
    return;
  });
});

test("Register a new user @smoke", async ({ page, baseURL }, testInfo) => {
  await page.goto(baseURL + "/login");

  //Visit New User Signup Page
  await page.getByTestId("signup-name").fill(name);
  await page.getByTestId("signup-email").fill(email);
  await page.getByTestId("signup-button").click();

  // Find element by class and validate text exists
  expect(await page.locator(".login-form")).toContainText(
    "Enter Account Information"
  );

  // https://playwright.dev/docs/api/class-locator#locator-set-checked
  await page.locator('text="Mr."').setChecked(true);
  expect(await page.getByTestId("name")).toHaveAttribute("value", name);
  expect(await page.getByTestId("email")).toHaveAttribute("value", email);
  await page.getByTestId("password").fill(password);

  //https://playwright.dev/docs/api/class-locator#locator-select-text  -- note the select option is using value not text here
  await page.getByTestId("days").selectOption("1");
  await page.getByTestId("months").selectOption("6");
  await page.getByTestId("years").selectOption("1901");

  await page.getByTestId("first_name").fill("Happy");
  await page.getByTestId("last_name").fill("McPathy");
  await page.getByTestId("company").fill("HappyPath Studios");

  //https://playwright.dev/docs/selectors  -- Showing off different ways of using selectors to resolve DOM elements

  //CSS Selector
  await page.locator("[data-qa=address]").fill("100 Testing Way");

  //BY ID
  await page.locator("#address1").fill("Via ID Testing Way");

  //BY NAME
  await page.locator("input[name=address1]").fill("Via INPUT NAME Testing Way");

  //BY ID & CLASS
  await page
    .locator("#address1.form-control")
    .fill("Via ID & CLASS Testing Way");

  await page.locator("[data-qa=address2]").fill("Address line 2");
  await page.locator("[data-qa=country]").selectOption("United States");
  await page.locator("[data-qa=state]").fill("Georgia");
  await page.locator("[data-qa=city]").fill("Roswell");
  await page.locator("[data-qa=zipcode]").fill("30009");
  await page.locator("[data-qa=mobile_number]").fill("1231231231");
  await page.locator("[data-qa=create-account]").click();

  expect(await page.locator("body")).toContainText("Account Created!");
  const screenshot = await page.screenshot();
  await testInfo.attach("screenshot", {
    body: screenshot,
    contentType: "image/png",
  });
  // expect(await page.screenshot()).toMatchSnapshot("account_created.png");

  await page.locator("[data-qa=continue-button]").click();
  await page.locator("text=Logout").click();
  expect(await page.locator("header")).not.toContainText("Logged in as Test");
  expect(await page.locator("[data-qa=login-email]")).toHaveCount(1);
});

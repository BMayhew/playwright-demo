import { test, expect } from "@playwright/test";

test.use({ userAgent: "some custom ua" });

test("test", async ({ page }) => {
  await page.goto("https://codepen.io/bmayhew/pen/eYLdwVg");

  // Create variables for the elements we will interact with
  const codePenFrame = page.frameLocator('iframe[name="CodePen"]');
  const textInput = codePenFrame.getByPlaceholder("fill me");
  const button = codePenFrame.getByRole("button", { name: "Click Me" });
  const result = codePenFrame.locator("id=result");

  // Disabled attribute is active
  expect(button).toHaveAttribute("disabled", "true");

  await textInput.fill("Testing 1234");
  await page.keyboard.press("Tab");

  // Disabled attribute is no longer active
  expect(button).not.toHaveAttribute("disabled", "true");

  await button.click();
  expect(result).toHaveText("You clicked the button");
});

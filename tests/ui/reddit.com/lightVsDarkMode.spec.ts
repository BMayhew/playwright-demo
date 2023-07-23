import { test, selectors, expect } from "@playwright/test";

test.describe("Reddit.com", () => {
  test("Validate dark and light CSS", async ({ page }) => {
    selectors.setTestIdAttribute("data-testid");

    await page.goto("https://www.reddit.com/");

    const postContainer = page.getByTestId("post-container").first();

    await page.emulateMedia({ colorScheme: "dark" });
    await expect(postContainer).toHaveCSS(
      "background-color",
      "rgba(26, 26, 27, 0.8)"
    );

    await page.screenshot({
      path: `tests/ui/reddit.com/screenshot/reddit-home-dark.png`,
    });

    await page.emulateMedia({ colorScheme: "light" });
    await expect(postContainer).toHaveCSS(
      "background-color",
      "rgba(255, 255, 255, 0.8)"
    );

    await page.screenshot({
      path: `tests/ui/reddit.com/screenshot/reddit-home-light.png`,
    });
  });

  test("Exploring other options", async ({ page, browser }) => {
    // Create context with dark mode
    const context = await browser.newContext({
      colorScheme: "dark", // or 'light'
    });

    // Create page with dark mode
    const newPage = await browser.newPage({
      colorScheme: "dark", // or 'light'
    });

    await newPage.goto("https://www.reddit.com/");

    await newPage.screenshot({
      path: `tests/ui/reddit.com/screenshot/reddit-home-dark-context.png`,
    });

    await context.close();
  });
});

test("Exploring other options", async ({ page, browser }) => {
  // Create context with dark mode
  const context = await browser.newContext({
    colorScheme: "dark", // or 'light'
  });

  // Create page with dark mode
  const newPage = await browser.newPage({
    colorScheme: "dark", // or 'light'
  });

  await newPage.goto("https://www.reddit.com/");

  await newPage.screenshot({
    path: `tests/ui/reddit.com/screenshot/reddit-home-dark-context.png`,
  });

  await context.close();
});

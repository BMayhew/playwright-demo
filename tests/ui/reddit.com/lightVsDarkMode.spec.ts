import { test, selectors, expect } from "@playwright/test";

test.describe.skip("Reddit.com", () => {
  test("Validate dark and light CSS", async ({ page }) => {
    selectors.setTestIdAttribute("data-testid");

    await page.goto("https://www.reddit.com/");

    const themeElement = page.locator(".theme-beta").first();

    await page.emulateMedia({ colorScheme: "dark" });
    await expect(themeElement).toHaveCSS("background-color", "rgb(11, 20, 22)");

    await page.screenshot({
      path: `tests/ui/reddit.com/screenshot/reddit-home-dark.png`,
    });

    await page.emulateMedia({ colorScheme: "light" });
    await expect(themeElement).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
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

test.skip("Exploring other options", async ({ page, browser }) => {
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

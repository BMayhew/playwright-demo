import { test, expect } from "@playwright/test";

test.describe(
  "report tests",
  {
    annotation: { type: "category", description: "report" },
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        annotation: [
          {
            type: "issue",
            description: "https://github.com/microsoft/playwright/issues/23180",
          },
          { type: "performance", description: "very slow test!" },
        ],
      },
      async ({ page }) => {
        // ...
      }
    );
  }
);

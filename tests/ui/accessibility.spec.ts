import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.skip("Visit home page and run an axe test @axe", async ({
  page,
}, testInfo) => {
  await page.goto("https://broken-workshop.dequelabs.com/");

  //Analyze the page with axe
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  //Attached the violations to the test report
  await testInfo.attach("accessibility-scan-results", {
    body: JSON.stringify(accessibilityScanResults.violations, null, 2),
    contentType: "application/json",
  });

  //Console log the violations
  let violation = accessibilityScanResults.violations;
  violation.forEach(function (entry) {
    console.log(entry.impact + " " + entry.description);
  });

  //Expect violations to be empty
  expect(accessibilityScanResults.violations).toEqual([]);
});

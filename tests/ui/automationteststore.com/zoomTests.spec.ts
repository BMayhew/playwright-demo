// import { test, expect } from "@playwright/test";

// test("test", async ({ page }) => {
//   await page.goto("https://automationteststore.com/");

//   await page.screenshot({ path: "100-screenshot.png" });

//   await page.waitForTimeout(1000);
//   await page.keyboard.down("Meta");
//   await page.waitForTimeout(500);
//   await page.keyboard.press("+");
//   await page.keyboard.up("Meta");
//   await page.waitForTimeout(1000);
//   await page.screenshot({ path: "200-screenshot.png" });

//   await page.waitForTimeout(1000);
//   await page.setViewportSize({ width: 400, height: 800 });
//   await page.screenshot({ path: "600-screenshot.png" });

//   await page.evaluate("document.body.style.zoom=2.0");
//   await page.waitForTimeout(1000);
//   await page.screenshot({ path: "300-screenshot.png" });

//   await page.evaluate("document.body.style.zoom=1.0");

//   await page.waitForTimeout(1000);

//   await page.evaluate(() => {
//     document.body.style.transform = "scale(0.75)";
//   });
//   await page.screenshot({ path: "400-screenshot.png" });

//   await page.waitForTimeout(1000);
//   await page.setViewportSize({ width: 1920, height: 1080 });
//   await page.screenshot({ path: "500-screenshot.png" });
// });

// // https://github.com/microsoft/playwright/issues/2497

// /*
// await page.keyboard.down('Control');

//   for (let i = 0; i < 7; i++) {
//     await page.keyboard.press('+');
//   }

//   await page.keyboard.up('Control');
// */

/*eslint no-empty-function: ["error", { "allow": ["functions"] }]*/

import { chromium } from "@playwright/test";

async function globalTearDown() {
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // await page.goto("https://google.com");
  // //execute javascript within playwright browser
  // await page.evaluate(() => {
  //   const message = new SpeechSynthesisUtterance("Tests are done");
  //   speechSynthesis.speak(message);
  // });
  // const sleep = (ms: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };
  // await sleep(2000);
  // await browser.close();
  // setTimeout(function () {}, 5000);
}

export default globalTearDown;

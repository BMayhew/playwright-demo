import { test, expect, Locator } from "@playwright/test";

/*
The web page works by randomly choosing if the Gallery links renders.
When it does render the below test will use it as the locator.
When it doesn't render it will fall back to Portfolio link.
This is all made possible by Promise.race() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
*/

test("Click one of the elements in the array using promise.race", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/disappearing_elements");

  // Builds a promise that can then be passed into the Array of promises
  const waitForLocator = (locator: Locator): Promise<Locator> => {
    return locator.waitFor().then(() => locator);
  };

  let returnedLocator = await Promise.race(
    // Array promises/locators
    [
      waitForLocator(page.getByRole("link", { name: "Gallery" })),
      waitForLocator(page.getByRole("link", { name: "Portfolio" })),
    ]
  );

  // console.log(await returnedLocator.innerText());
  await returnedLocator.click();

  // console.log(page.url());
  expect(page).toHaveURL(/.*gallery|.*portfolio/);
});

test("Click one of the elements that is visible out of two", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/disappearing_elements");

  let gallery = page.getByRole("link", { name: "Gallery" });
  let portfolio = page.getByRole("link", { name: "Portfolio" });
  let visibleLocator;

  if (await gallery.isVisible()) {
    visibleLocator = gallery;
  } else if (await portfolio.isVisible()) {
    visibleLocator = portfolio;
  } else {
    console.log("No elements found");
  }

  await visibleLocator.click();
  expect(page).toHaveURL(/.*gallery|.*portfolio/);
});

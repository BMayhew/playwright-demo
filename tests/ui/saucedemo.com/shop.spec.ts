import { test, selectors, expect } from "@playwright/test";
import { InventoryPage } from "../../../lib/pages/saucedemo.com/inventory.page";

test.describe("Saucedemo.com checks", () => {
  test.beforeEach(async ({ page }) => {
    selectors.setTestIdAttribute("data-test");
  });

  test("Successful checkout flow", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();

    // Utilizing a page object for Inventory Page
    const inventoryPage = new InventoryPage(page);

    // Demonstrating how to build a function to take action on the page
    await inventoryPage.addItemByTextToCart("Sauce Labs Bolt T-Shirt");

    // Demonstrating how to return a locator back from a function
    await inventoryPage.addItemByDataIdToCart("backpack").click();

    await inventoryPage.shoppingCartLink.click();
    await inventoryPage.checkout.click();

    await page.getByTestId("firstName").fill("Testy");
    await page.getByTestId("lastName").fill("Mctester");
    await page.getByTestId("postalCode").fill("35124");
    await page.getByTestId("continue").click();
    await page.getByTestId("finish").click();

    // Send back to inventory page

    // "Thank you for your order!"
    // "Your order has been dispatched, and will arrive just as fast as the pony can get"
    await page.getByTestId("back-to-products").click();
  });
});

import { Page, selectors } from "@playwright/test";

selectors.setTestIdAttribute("data-test");

export class InventoryPage {
  readonly checkout = this.page.locator('[data-test="checkout"]');
  readonly shoppingCartLink = this.page.locator(".shopping_cart_link");
  readonly shoppingCartBadge = this.page.locator(".shopping_cart_badge");
  readonly inventoryContainer = this.page.locator(".inventory_container");
  readonly inventoryItemDescription = this.page.locator(
    ".inventory_item_description"
  );
  readonly inventoryItemName = this.page.locator(".inventory_item_name");

  /**
   *
   * Pass in the text of the item you want to add to the cart.
   *
   * @param itemName
   * @example await inventoryPage.addItemByTextToCart("Sauce Labs Bolt T-Shirt");
   *
   */
  async addItemByTextToCart(itemName: string) {
    const inventorySquare = this.inventoryContainer
      .locator(".inventory_item")
      .filter({ hasText: itemName });

    await inventorySquare.getByRole("button").click();
  }

  readonly addItemByDataIdToCart = (itemName: string) =>
    this.page.locator(`[data-test="add-to-cart-sauce-labs-${itemName}"]`);

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  constructor(private readonly page: Page) {}
}

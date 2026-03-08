import { getByDataCy } from "../support/selectors";

export class CartPage {
  private cartItems = "cart-items";

  assertCartItemsVisible() {
    getByDataCy(this.cartItems).should("be.visible");
  }
}

export const cartPage = new CartPage();

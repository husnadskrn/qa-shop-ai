import { getByDataCy } from "../support/selectors";

export class ProductDetailPage {
  private addToCartButton = "add-to-cart";
  private goToCartButton = "detail-go-to-cart";

  assertOnProductDetail() {
    cy.url().should("include", "product-detail.html");
  }

  addToCart() {
    getByDataCy(this.addToCartButton).click();
  }

  goToCart() {
    getByDataCy(this.goToCartButton).click();
  }
}

export const productDetailPage = new ProductDetailPage();

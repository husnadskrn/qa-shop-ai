import { getByDataCy } from "../support/selectors";

export class ProductsPage {
  private productCard = "product-card";
  private productDetailButton = "product-detail-btn";

  visit() {
    cy.visit("/products.html");
  }

  assertProductListVisible() {
    getByDataCy(this.productCard).should("have.length.greaterThan", 0);
  }

  openFirstProductDetail() {
    getByDataCy(this.productDetailButton).eq(0).click();
  }

  assertOnProductDetail() {
    cy.url().should("include", "product-detail.html");
  }
}

export const productsPage = new ProductsPage();

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "../../pages/LoginPage";
import { productsPage } from "../../pages/ProductsPage";
import { productDetailPage } from "../../pages/ProductDetailPage";
import { cartPage } from "../../pages/CartPage";
import { validUser } from "../../support/testData";

// ---------- GIVEN ----------

Given("I am logged in", () => {
  loginPage.visit();
  loginPage.loginWith(validUser);
  loginPage.assertRedirectedToProducts();
});

// ---------- WHEN / THEN FOR PRODUCTS LIST ----------

When("I open the products page", () => {
  productsPage.visit();
});

Then("I should see the product list", () => {
  productsPage.assertProductListVisible();
});

// ---------- WHEN / THEN FOR PRODUCT DETAIL ----------

When("I click on a product", () => {
  productsPage.openFirstProductDetail();
});

Then("I should see product detail", () => {
  productDetailPage.assertOnProductDetail();
});

When("I open product detail", () => {
  productsPage.openFirstProductDetail();
  productDetailPage.assertOnProductDetail();
});

// ---------- WHEN / THEN FOR CART ----------

When("I add product to cart", () => {
  productDetailPage.addToCart();
});

Then("product should appear in cart", () => {
  productDetailPage.goToCart();
  cartPage.assertCartItemsVisible();
});


import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "../../pages/LoginPage";
import { validUser, invalidUser } from "../../support/testData";

// ---------- GIVEN ----------

Given("I open the login page", () => {
  loginPage.visit();
  loginPage.assertOnLoginPage();
});

Given("I am logged in", () => {
  loginPage.visit();
  loginPage.loginWith(validUser);
  loginPage.assertRedirectedToProducts();
});

// ---------- WHEN ----------

When("I log in with valid credentials", () => {
  loginPage.loginWith(validUser);
});

When("I log in with invalid credentials", () => {
  loginPage.loginWith(invalidUser);
});

When("I try to login without email", () => {
  loginPage.loginWithoutEmail(validUser.password);
});

When("I try to login without password", () => {
  loginPage.loginWithoutPassword(validUser.email);
});

When("I try to login with empty form", () => {
  loginPage.submitEmptyForm();
});

// ---------- THEN ----------

Then("I should be redirected to the products page", () => {
  loginPage.assertRedirectedToProducts();
});

Then("I should see the login error message", () => {
  loginPage.assertLoginErrorVisible("Geçersiz kullanıcı bilgisi");
});

Then("I should see email required error", () => {
  loginPage.assertValidationErrorVisible();
});

Then("I should see password required error", () => {
  loginPage.assertValidationErrorVisible();
});

Then("I should see validation errors", () => {
  loginPage.assertValidationErrorVisible();
});

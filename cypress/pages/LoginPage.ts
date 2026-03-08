import { getByDataCy } from "../support/selectors";

type Credentials = {
  email: string;
  password: string;
};

export class LoginPage {
  private emailInput = "email";
  private passwordInput = "password";
  private loginButton = "login-btn";
  private loginMessage = "login-message";
  private pageTitle = "login-page-title";

  visit() {
    cy.visit("/login.html");
  }

  assertOnLoginPage() {
    getByDataCy(this.pageTitle).should("be.visible");
  }

  fillEmail(email: string) {
    getByDataCy(this.emailInput).type(email);
  }

  fillPassword(password: string) {
    getByDataCy(this.passwordInput).type(password);
  }

  submit() {
    getByDataCy(this.loginButton).click();
  }

  loginWith(credentials: Credentials) {
    this.fillEmail(credentials.email);
    this.fillPassword(credentials.password);
    this.submit();
  }

  loginWithoutEmail(password: string) {
    this.fillPassword(password);
    this.submit();
  }

  loginWithoutPassword(email: string) {
    this.fillEmail(email);
    this.submit();
  }

  submitEmptyForm() {
    this.submit();
  }

  assertRedirectedToProducts() {
    cy.url().should("include", "/products.html");
    getByDataCy("products-page-title").should("be.visible");
  }

  assertLoginErrorVisible(expectedText: string) {
    getByDataCy(this.loginMessage).should("be.visible").and("contain", expectedText);
  }

  assertValidationErrorVisible() {
    getByDataCy(this.loginMessage).should("be.visible");
  }
}

export const loginPage = new LoginPage();

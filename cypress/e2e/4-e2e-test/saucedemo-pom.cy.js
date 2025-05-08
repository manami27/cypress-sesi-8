require("cypress-xpath");
import loginPage from "../../pages/loginPage";
import inventoryPage from "../../pages/inventoryPage";

describe("Saucedemo Web Test", function () {
  this.beforeEach(() => {
    cy.fixture("loginData").as("data");
    cy.fixture("productData").as("products");
  });

  it("Login with valid data-1", function () {
    loginPage.visit();
    loginPage.fillUsername(this.data.validUser.username);
    loginPage.fillPassword(this.data.validUser.password);
    loginPage.clickLogin();
    loginPage.verifyLoginSuccess();
  });

  it("Login with valid data-2", function () {
    loginPage.loginUser(this.data.validUser);
    loginPage.verifyLoginSuccess();
  });

  it("Login with locked out user", function () {
    loginPage.loginUser(this.data.lockedOutUser);
    loginPage.verifyLoginFailed(this.data.lockedOutUser);
  });

  it("Login with invalid User", function () {
    loginPage.loginUser(this.data.invalidUser);
    loginPage.verifyLoginFailed(this.data.invalidUser);
  });

  it("Add to Cart", function () {
    loginPage.loginUser(this.data.validUser);
    inventoryPage.verifyInventoryPage();

    // Add to cart 2 products
    inventoryPage.addProductToCart(this.products.productNames);

    // Verify products
    inventoryPage.verifyCartItemCount(this.products.productNames.length);
  });

  it("Add to Cart with Custom Command Login", function () {
    cy.login(Cypress.env("valid_username"), Cypress.env("valid_password"));
    inventoryPage.verifyInventoryPage();

    // Add to cart 2 products
    inventoryPage.addProductToCart(this.products.productNames);

    // Verify products
    inventoryPage.verifyCartItemCount(this.products.productNames.length);
  });
});

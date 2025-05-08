require("cypress-xpath");
import loginPage from "../../pages/loginPage";
import inventoryPage from "../../pages/inventoryPage";

describe("Saucedemo Web Test", function () {
  this.beforeEach(() => {
    cy.fixture("loginData").as("data");
    cy.fixture("productData").as("products");
    cy.login(Cypress.env("valid_username"), Cypress.env("valid_password"));
  });

  it("Add to Cart until checkput", function () {
    inventoryPage.verifyInventoryPage();
    // Add to cart 2 products
    inventoryPage.addProductToCart(this.products.productNames);

    // Verify products
    inventoryPage.verifyCartItemCount(this.products.productNames.length);

    //checkout test case + verify
  });

  it("Filter Products", function () {
    inventoryPage.verifyInventoryPage();

    // Add to cart 2 products
    inventoryPage.addProductToCart(this.products.productNames);

    // Verify products
    inventoryPage.verifyCartItemCount(this.products.productNames.length);
  });
});

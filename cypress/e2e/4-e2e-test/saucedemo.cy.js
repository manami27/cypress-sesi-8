require("cypress-xpath");
describe("Saucedemo Web Test", function () {
  it("Login with valid data", function () {
    cy.visit("/");

    //login
    //cy.get("#user-name").type("standard_user");
    cy.xpath('//input[@id="user-name"]').type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get(".app_logo").should("have.text", "Swag Labs");
  });

  it("Add to Cart", function () {
    cy.visit("/");

    //login
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get(".app_logo").should("have.text", "Swag Labs");

    // Add to cart 2 products
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get("#add-to-cart-sauce-labs-bike-light").click();

    // Verify products
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");
  });
});

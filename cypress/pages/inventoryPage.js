class inventoryPage {
  verifyInventoryPage() {
    cy.url().should("include", "/inventory.html");
    cy.get(".app_logo").should("have.text", "Swag Labs");
  }

  addProductToCart(productNames) {
    productNames.forEach((name) => {
      // cy.get("#add-to-cart-sauce-labs-backpack").click();
      cy.get(`#add-to-cart-${name}`).click();
    });
  }

  verifyCartItemCount(expectedCount) {
    cy.get('[data-test="shopping-cart-badge"]').should(
      "have.text",
      `${expectedCount}`
    );
  }
}

export default new inventoryPage();

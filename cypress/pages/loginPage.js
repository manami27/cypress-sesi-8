class loginPage {
  visit() {
    cy.visit("/");
  }

  fillUsername(username) {
    cy.get("#user-name").clear().type(username);
  }

  fillPassword(password) {
    cy.get("#password").clear().type(password);
  }

  clickLogin() {
    cy.get('[data-test="login-button"]').click();
  }

  loginUser(userData) {
    this.visit();
    this.fillUsername(userData.username);
    this.fillPassword(userData.password);
    this.clickLogin();
  }

  verifyLoginSuccess() {
    cy.url().should("include", "/inventory.html");
    cy.get(".app_logo").should("have.text", "Swag Labs");
  }

  verifyLoginFailed(userData) {
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", userData.errorMsg);
  }
}

export default new loginPage();

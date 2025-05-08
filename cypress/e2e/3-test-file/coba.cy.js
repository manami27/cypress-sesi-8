context("nyoba UI testing", function () {
  describe("e2e testing", function () {
    it("bisa masuk ke web", function () {
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
      cy.xpath("//input[@name='username']").type("Admin");
      // cy.get("[placeholder='Username']").clear().type("Admin");
      let password = cy.xpath(`//input[@placeholder='Password']`);
      password.type("admin123");

      // cy.xpath("//input[contains(@name,'password')]").type('admin123');
      cy.xpath("//button[@type='submit']").click();
    });
  });
});

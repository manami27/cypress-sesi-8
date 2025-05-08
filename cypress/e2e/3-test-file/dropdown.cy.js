context("Advance UI testing", function () {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Ignore AngularJS errors
  });

  describe("e2e testing", function () {
    it("1-Static Dropdown By Index", function () {
      let url = "https://demo.automationtesting.in/Register.html";
      let dropdown = `#Skills`;
      let dropdownXpath = `//select[@id='Skills']`;

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error

      //cy.get(dropdown).select(3);
      cy.xpath(dropdownXpath).select(10);
    });
    it("2-Static Dropdown By Visible Text", function () {
      let url = "https://demo.automationtesting.in/Register.html";
      let dropdown = `#Skills`;
      let dropdownXpath = `//select[@id='Skills']`;

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error

      cy.get(dropdown).select("Art Design");
    });
    it("3-Static Dropdown By Value", function () {
      let url = "https://demo.automationtesting.in/Register.html";
      let dropdown = `#Skills`;
      let dropdownXpath = `//select[@id='Skills']`;

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error

      cy.get(dropdown).select("Adobe Photoshop");
    });
    it("4-Static Dropdown By Value-2", function () {
      let url = "https://demoqa.com/select-menu";
      let dropdown = `#oldSelectMenu`;

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error

      cy.get(dropdown).select(4, { force: true });
    });
    it("5-Static Dropdown By Value-2", function () {
      let url = "https://demoqa.com/select-menu";
      let dropdown = `#withOptGroup`;
      let reactInput = `react-select-2-input`;

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error

      cy.get(dropdown).click();
      cy.get("#react-select-2-option-0-0").click();
      // cy.get(reactInput);
    });
    it("6-Dropdown Looping", function () {
      let url = "https://demo.automationtesting.in/Register.html";
      let dropdown = `#Skills`;
      let optionList = [];
      let skill = ["Adobe InDesign", "Content Managment", "Data Analytics"];

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error
      cy.get(dropdown)
        .find("option")
        .each(function (option) {
          const optionValue = option.val(); // Get value dari opstion
          optionList.push(optionValue);
        });

      cy.wrap(optionList).should("include.members", skill);
      cy.get(dropdown)
        .select("Content Managment")
        .should("have.value", "Content Managment");
    });
    it("7-Auto Suggestive Dropdown", function () {
      let url = "https://demo.automationtesting.in/Register.html";
      let suggestion = `//span[@class='selection']`;
      let searchSuggestion = `//input[contains(@class,'select2-search__field')]`;
      let searchList = `//li[contains(@class,'select2-results__option')]`;

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error
      cy.xpath(suggestion).click();
      cy.xpath(searchSuggestion).type("De");
      cy.wait(5000);
      cy.xpath(searchList).contains("Denmark").click();
    });
    it("8-Checkbox", function () {
      let url = "https://demo.automationtesting.in/Register.html";
      let checkbox = `//input[@type='checkbox']`;

      cy.visit(url, { failOnStatusCode: false }); // Ignore load error
      cy.xpath(checkbox).first().check().should("be.checked");
      cy.xpath(checkbox).check("Movies").should("be.checked");
      cy.xpath(checkbox).eq(2).check().should("be.checked");
      cy.xpath(checkbox).eq(1).uncheck().should("not.be.checked");
    });
    it("9-Date set text", function () {
      let url = "https://jqueryui.com/datepicker/";
      let datepicker = `//input[@id='datepicker']`;
      let date = "02/05/2025";

      cy.visit(url);
      cy.get("iframe.demo-frame").then(($iframe) => {
        const body = $iframe.contents().find("body");
        cy.wrap(body).xpath(datepicker).type(date).should("have.value", date);
      });
    });
    it.only("10-Date from date picker", function () {
      cy.visit("https://jqueryui.com/datepicker/");

      // Masuk ke iframe
      cy.get("iframe.demo-frame").then(($iframe) => {
        const body = $iframe.contents().find("body");
        cy.wrap(body).as("iframeBody");
      });

      // Klik input date
      cy.get("@iframeBody").find("#datepicker").click();

      const targetMonth = "May";
      const targetYear = "2025";
      const targetDay = "3";

      function selectMonthYear() {
        cy.get("@iframeBody")
          .find(".ui-datepicker-title")
          .then(($el) => {
            const currentMonth = $el.find(".ui-datepicker-month").text().trim();
            const currentYear = $el.find(".ui-datepicker-year").text().trim();

            if (currentMonth !== targetMonth || currentYear !== targetYear) {
              cy.get("@iframeBody").find(".ui-datepicker-next").click();
              selectMonthYear(); // recursive check again
            }
          });
      }

      // Jalankan pemilihan bulan & tahun
      selectMonthYear();

      // Setelah bulan & tahun sesuai, klik tanggal
      cy.get("@iframeBody")
        .find(".ui-datepicker-calendar td:not(.ui-datepicker-other-month)")
        .contains(targetDay)
        .click();

      // Verifikasi hasil input
      cy.get("@iframeBody")
        .find("#datepicker")
        .should("have.value", "05/03/2025");
    });
  });
});

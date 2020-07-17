describe("Workbook files and folders", () => {
  it("checks if files and folders open without any errors", () => {
    cy.visit("localhost:3000/workbooks");
  });
  it("checks addition and deletion of workbook file", () => {
    cy.get(".rstcustom__rowContents")
      .its("length")
      .then((lenBeforeAddition) => {
        addItem('file')
        cy.get(".rstcustom__rowContents")
          .its("length")
          .then((lenAfterAddition) => {
            expect(lenAfterAddition).to.eq(lenBeforeAddition + 1);
          });
        cy.wait(2500);
        cy.get(".trash-icon").eq(lenBeforeAddition).click();
        cy.get(".rstcustom__rowContents")
          .its("length")
          .then((lenAfterDeletion) => {
            expect(lenAfterDeletion).to.eq(lenBeforeAddition);
          });
      });
  });
  it("checks addition and deletion of workbook folder", () => {
    cy.get(".rstcustom__rowContents")
      .its("length")
      .then((lenBeforeAddition) => {
        addItem('folder')
        cy.get(".rstcustom__rowContents")
          .its("length")
          .then((lenAfterAddition) => {
            expect(lenAfterAddition).to.eq(lenBeforeAddition + 1);
          });
        cy.wait(2500);
        cy.get(".trash-icon").eq(lenBeforeAddition).click();
        cy.get(".rstcustom__rowContents")
          .its("length")
          .then((lenAfterDeletion) => {
            expect(lenAfterDeletion).to.eq(lenBeforeAddition);
          });
      });
  });
  it("checks rename of workbook folder", () => {
    addItem('folder')
    cy.get(".rename")
      .its("length")
      .then((len) => {
        cy.get(".rename")
          .eq(len - 1)
          .click();
        cy.get(".title-input").type("-edited");
        cy.get(".ant-btn.ant-btn-primary").click();
        cy.wait(2500);
        cy.get(".workbook-title")
          .eq(len - 1)
          .contains("sample-folder-edited");
        cy.get(".trash-icon")
          .eq(len - 1)
          .click();
      });
  });
  it("checks rename of workbook file", () => {
    addItem('file')
    cy.get(".rename")
      .its("length")
      .then((len) => {
        cy.get(".rename")
          .eq(len - 1)
          .click();
        cy.get(".title-input").type("-edited");
        cy.get(".ant-btn.ant-btn-primary").click();
        cy.wait(2500);
        cy.get(".workbook-title")
          .eq(len - 1)
          .contains("sample-file-edited");
        cy.get(".trash-icon")
          .eq(len - 1)
          .click();
      });
  });
});

const addItem = (type) => {
  cy.get(`.${type}-add-icon`).click();
  cy.get(".title-input").type(`sample-${type}`);
  cy.get(".ant-btn.ant-btn-primary").click();
  cy.wait(2500);
}

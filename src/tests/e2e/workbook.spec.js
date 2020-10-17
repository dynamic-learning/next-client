const timeout = 10000;

Cypress.on("uncaught:exception", (_err, _runnable) => {
  return false;
});

Cypress.on('window:confirm', () => true);

describe("Workbook", () => {
  it("adds a slide", () => {
    cy.visit("localhost:3000");
    cy.get(".add-button").click();
    cy.get(".slide-button-container").should("have.length", 2);
    cy.get(".slide-delete-button").eq(1).click();
  });
  it("deletes a slide", () => {
    cy.get(".add-button").click();
    cy.get(".slide-delete-button").eq(1).click();
    cy.get(".slide-button-container").should("have.length", 1);
  });
  it("makes a drawing on canvas", () => {
    cy.get(".switch").click();
    cy.get("canvas")
      .eq(1)
      .trigger("mousedown", {
        x: 20,
        y: 20,
        isPrimary: true,
      })
      .trigger("mousemove", { x: 100, y: 100 })
      .trigger("mouseup", { x: 100, y: 100 });
  });
  it("checks if canvas fills its outer container", () => {
    checkIfDimensionsAreEqual(".canvas-container", ".upper-canvas");
    checkIfDimensionsAreEqual(".canvas-container", ".lower-canvas");
  });
  /**
   * To do - write test case for the scaling of canvas
   */
  it("checks the increase in height of canvas", () => {
    cy.get(".canvas-container")
      .invoke("height")
      .then((initialHeight) => {
        cy.get(".slide-menu").trigger("mouseover");
        cy.get(".increase-size", { timeout }).click();
        cy.get(".canvas-container")
          .invoke("height")
          .should("gt", initialHeight);
      });
  });
  it("checks the decrease in height of canvas", () => {
    cy.get(".canvas-container")
      .invoke("height")
      .then((initialHeight) => {
        cy.get(".slide-menu").trigger("mouseover");
        cy.get(".decrease-size", { timeout }).click();
        cy.get(".canvas-container")
          .invoke("height")
          .should("lt", initialHeight);
      });
  });
  it("checks creation of new workbook", () => {
    cy.get(".add-button").click();
    cy.get(".file-menu").trigger("mouseover");
    cy.get(".new-option").click();
    cy.get(".slide-button-container").should("have.length", 1);
  })
  it("checks navigation to login retainment of state", () => {
    cy.get(".add-button").click();
    cy.get(".app-menu").trigger("mouseover");
    cy.get(".login-menu").click();
    cy.location('pathname', {timeout: 60000})
      .should('include', '/login');
    cy.go('back')
    cy.get(".slide-button-container").should("have.length", 2);
  })
  it("checks navigation to signup", () => {
    cy.get(".app-menu").trigger("mouseover");
    cy.get(".signup-menu").click();
    cy.location('pathname', {timeout: 60000})
      .should('include', '/signup');
  })
  it("checks navigation to about menu", () => {
    cy.go('back')
    cy.get(".app-menu").trigger("mouseover");
    cy.get(".about-menu").click();
    cy.location('pathname', {timeout: 60000})
      .should('include', '/about');
    cy.get(".close-button").click();
    cy.location('pathname', {timeout: 60000})
      .should('include', '');
  })
});
const checkIfDimensionsAreEqual = (selector1, selector2) => {
  checkIfPropsAreEqual(selector1, selector2, "width");
  checkIfPropsAreEqual(selector1, selector2, "height");
};

const checkIfPropsAreEqual = (selector1, selector2, prop) => {
  cy.get(selector1)
    .invoke(prop)
    .then((selector1Prop) => {
      cy.get(selector2)
        .invoke(prop)
        .then((selector2Prop) => {
          expect(Math.floor(selector1Prop)).to.eq(Math.floor(selector2Prop));
        });
    });
};

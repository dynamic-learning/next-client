describe("Workbook", () => {
  it("adds a slide", () => {
    cy.visit("localhost:3000");
    cy.get(".add-button").click();
    cy.get(".slide-button-container").should("have.length", 2);
  });
  it("deletes a slide", () => {
    cy.visit("localhost:3000");
    cy.get(".add-button").click();
    cy.get(".slide-delete-button").eq(1).click();
    cy.get(".slide-button-container").should("have.length", 1);
  });
  it("makes a drawing on canvas", () => {
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
});

const checkIfDimensionsAreEqual = (selector1, selector2) => {
  checkIfPropsAreEqual(selector1, selector2, "width");
  checkIfPropsAreEqual(selector1, selector2, "height");
};

const checkIfPropsAreEqual = (selector1, selector2, prop) => {
  cy.get(selector1)
    .invoke(prop)
    .then((propValue) => {
      cy.get(selector2).invoke(prop).should("eq", Math.floor(propValue));
    });
};

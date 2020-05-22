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
  it("draws on canvas", () => {
    cy.get("canvas")
      .eq(1)
      .trigger("touchstart", {
        x: 20,
        y: 20,
        isPrimary: true,
      })
      .trigger("touchmove", { x: 100, y: 100 })
      .trigger("touchup", { x: 100, y: 100 });
  });
});

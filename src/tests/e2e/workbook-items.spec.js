const timeout = 10000;

Cypress.on("uncaught:exception", (_err, _runnable) => {
  return false;
});

describe("Working related to items", () => {
  it("loads the page", () => {
    cy.visit("localhost:3000");
  });
  it("checks addition of an item (here textbox) to the canvas", () => {
    cy.get(".slide-menu").trigger("mouseover");
    cy.get(".add-text-box-option", { timeout }).click();
    cy.get(".slide-menu").trigger("mouseover");
    cy.get(".add-text-box-option", { timeout }).click();
    cy.get("textarea").should("have.length", 2);
  });
  it("checks the deletion of an item (here textbox) in the canvas", () => {
    cy.get(".texbox-delete-button", { timeout }).eq(1).click();
    cy.get("textarea").should("have.length", 1);
  });
  it("checks updation done on an item (here textbox)", () => {
    cy.get("textarea", { timeout }).type("testing!!!");
    cy.get("textarea").should("have.value", "testing!!!");
  });
  it("checks dragging of textbox", () => {
    cy.get(".dragHandle")
      .trigger("mousedown")
      .trigger("mousemove", {
        x: 200,
        y: 100,
        force: true,
      })
      .trigger("mouseup");
    cy.get("textarea").then((el) => {
      expect(el.offset().top).to.not.eq(100);
      expect(el.offset().left).to.not.eq(200);
    });
  });
  it("checks the addition of a simulation", () => {
    cy.get(".slide-menu").trigger("mouseover");
    cy.get(".add-simulation", { timeout }).trigger("mouseover");
    cy.get(".add-p5-url", { timeout }).click();

    cy.get(".p5-sketch-url-input").type(
      '<iframe src="https://editor.p5js.org/jithunni.ks/embed/WSbZvLqts"></iframe>'
    );
    cy.get(".ant-btn", { timeout }).eq(0).click();
    cy.get("iframe").should("have.length", 1);
  });
  it("checks clearing of a slide", () => {
    cy.get(".slide-menu").trigger("mouseover");
    cy.get(".clear-slide").click();
    cy.get("iframe").should("have.length", 0);
    cy.get("textarea").should("have.length", 0);
  });
});

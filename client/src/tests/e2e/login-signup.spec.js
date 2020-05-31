describe("Login and Signup", () => {
  it("checks if login loads without error", () => {
    cy.visit("localhost:3000/login");
  });
  it("checks if signup loads without error", () => {
    cy.visit("localhost:3000/signup");
  });
});

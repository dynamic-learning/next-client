import config from "../../../config";

const { apiRootUrl } = config;

describe("Workbook file folder tests", () => {
  before(() => {
    loginAndSetCookie();
    cy.on('window:confirm', () => true);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("auth_data");
  });

  it("logs in with a user", () => {
    cy.visit("http://localhost:3000/workbooks");
  });

  it("tests addition and deletion of workbook folder ", () => {
    itemAdditionTest({ type: "folder" });
  });
  it("tests rename of workbook", () => {
    itemRenameTest({ type: "file" });
  });
  it("tests rename of workbook", () => {
    itemRenameTest({ type: "folder" });
  });
});

const itemAdditionTest = ({ type }) => {
  cy.get(".rstcustom__rowContents")
    .its("length")
    .then((initialNoOfItems) => {
      addItem({ type });
      cy.get(".rstcustom__rowContents")
        .its("length")
        .then((noOfItemsAfterAddition) => {
          expect(noOfItemsAfterAddition).to.equal(initialNoOfItems + 1);
        });
      cy.get(".trash-icon").eq(initialNoOfItems).click();
    });
};

const itemRenameTest = ({ type }) => {
  cy.get(".rstcustom__rowContents")
    .its("length")
    .then((initialNoOfItems) => {
      addItem({ type });
      cy.get(".rename-icon").eq(initialNoOfItems).click();
      cy.get(".title-input").type(`-edited`);
      cy.get(".ant-btn.ant-btn-primary").click();
      cy.wait(2500);
      cy.get(".workbook-title")
        .eq(initialNoOfItems)
        .contains(`sample-${type}-edited`);
      cy.get(".trash-icon").eq(initialNoOfItems).click();
    });
};

const addItem = ({ type }) => {
  cy.get(".file-add-icon").click();
  cy.get(".title-input").type(`sample-${type}`);
  cy.get(".ant-btn.ant-btn-primary").click();
  cy.wait(2000);
};

const loginAndSetCookie = () => {
  cy.request("POST", `${apiRootUrl}/login`, {
    query: `
      query {
        login (email: "test@test.com", password: "test") {
           userId
           token
           tokenExpiration
           type      
        }
      }
    `,
  }).then((res) => {
    cy.setCookie("auth_data", JSON.stringify(res.body.data.login));
  });
};

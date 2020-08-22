describe("Workbook file folder tests", () => {
  before(() => {
    cy.visit("http://localhost:3000/workbooks");
    addItem({ type:"file" })
  });

  it("tests addition and deletion of workbook", () => {
    itemAdditionTest({ type:'file' })
  });

  it("tests addition and deletion of workbook folder ", () => {
    itemAdditionTest({ type:'folder' })
  });
  it('tests rename of workbook', () => {
    itemRenameTest({ type:'file' })
  })
  it('tests rename of workbook', () => {
    itemRenameTest({ type:'folder' })
  })
  after(()=>{
    cy.get('.trash-icon').its('length').then((initialNoOfItems)=>{
      for(let i=0;i<initialNoOfItems;i++) {
        cy.get('.trash-icon').eq(0).click();
        cy.wait(500)
      }
    })
  })
});

const itemAdditionTest = ({ type }) => {
  cy.get('.rstcustom__rowContents').its('length').then((initialNoOfItems)=>{
    addItem({ type })
    cy.get('.rstcustom__rowContents').its('length').then(noOfItemsAfterAddition => {
      expect(noOfItemsAfterAddition).to.equal(initialNoOfItems+1)
    })
    cy.get('.trash-icon').eq(initialNoOfItems).click()
  })
}

const itemRenameTest = ({ type }) => {
  cy.get('.rstcustom__rowContents').its('length').then((initialNoOfItems)=>{
    addItem({ type })
    cy.get('.rename-icon').eq(initialNoOfItems).click()
    cy.get('.title-input').type(`-edited`)
    cy.get('.ant-btn.ant-btn-primary').click()
    cy.wait(2500)
    cy.get('.workbook-title').eq(initialNoOfItems).contains(`sample-${type}-edited`)
    cy.get('.trash-icon').eq(initialNoOfItems).click()
  })
}

const addItem = ({ type }) => {
  cy.get('.file-add-icon').click()
  cy.get('.title-input').type(`sample-${type}`)
  cy.get('.ant-btn.ant-btn-primary').click()
  cy.wait(2500)
}
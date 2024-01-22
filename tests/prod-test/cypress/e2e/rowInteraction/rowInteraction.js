import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";
const rowsliderPath = "cypress/fixtures/rowslider.text"
const rowrpvPath = "cypress/fixtures/rowrpv.text"
const rownewSliderPath = "cypress/fixtures/rownewSlider.text"
const rownewrpvPath = "cypress/fixtures/rownewrpv.text"


const sometext='';

Given('I open the Oxidation State Analyser website', () => {

  cy.visit(Cypress.config().baseUrl)
  //cy.intercept('POST', '/api', { fixture: 'response.json' })
  
    
});


When('I enter {string} in Chemical composition text box', chemical => {

    cy.log('Entering Chemical in chemical input')
    cy.get('#input-section-chemical-composition').should("be.visible")
      .type(chemical)

});


When('I click Submit',()=> {
    cy.get('#input-section-submit-button')
    .should('be.visible')
    .click()
    cy.wait(5000)
    
});


When('I click row number {int}', (row) => {
    let actualRow=row-1
    let theXpath="//*[@data-rowindex="+actualRow+"]"
    // cy.xpath("//*[@data-id='row' and @data-rowindex='row']").click()
   cy.xpath(theXpath).click()
})


Then('I capture {string} RPV and graph slider position',currentorNew => {
    let filePath="cypress/fixtures/"+currentorNew+"rowrpv.text"
    //cy.get('input[id="ecp-input"]')
    cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]')
    .invoke('val')
    .then(sometext => cy.writeFile(filePath,sometext));
    cy.log('The RPV value at first record is');

    cy.get('[data-rcs="clip-item"]')
    .invoke('attr', 'style').then(some => cy.writeFile(filePath,some, {flag : 'a+'}));
    cy.log('The Slider style value at first record is');
})


Then('I validate the changes in RPV and graph slider position', () => {
    cy.fixture('currentrowrpv.text').then(fixture => {
        cy.readFile('cypress/fixtures/newrowrpv.text').then(download => {
           assert.notEqual(fixture,download, " RPV and Slider Position Changes when row selection changes")
        })
    })
})
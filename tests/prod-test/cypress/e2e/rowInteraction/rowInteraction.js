import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";

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
    if(currentorNew=="current"){
        cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]')
        .invoke('val')
        .then(sometext => {
            let currentRPV = sometext
            cy.wrap(currentRPV).as('currentRPV')
        })    

        cy.get('[data-rcs="clip-item"]')
        .invoke('attr', 'style')
        .then(sometext => {
            let currentSlider = sometext
            cy.wrap(currentSlider).as('currentSlider')
        })    
    }
    else
    {
        cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]')
        .invoke('val')
        .then(sometext => {
            let newRPV = sometext
            cy.wrap(newRPV).as('newRPV')
        })    

        cy.get('[data-rcs="clip-item"]')
        .invoke('attr', 'style')
        .then(sometext => {
            let newSlider = sometext
            cy.wrap(newSlider).as('newSlider')
        }) 
    }
    
})


Then('I validate the changes in RPV and graph slider position', () => {
   cy.get('@currentRPV').then(currentRPV => {
        cy.get('@currentSlider').then(currentSlider => {
            cy.get('@newRPV').then(newRPV => {
                cy.get('@newSlider').then(newSlider => {
                    assert.notEqual(currentRPV,newRPV, "RPV Changes")
                    assert.notDeepEqual(currentSlider,newSlider, "Graph slider position changes")
                })
            })
        })
    })  
})
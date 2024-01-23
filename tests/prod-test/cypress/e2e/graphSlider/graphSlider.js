import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";

Given('I open the Oxidation State Analyser website', () => {

  cy.visit(Cypress.config().baseUrl)
  //cy.intercept('POST', '/api', { fixture: 'response.json' })
  cy.log('NAVIGATING TO OXIDATION ANALYSER WEB')
  cy.wait(10000)
  cy.get('#input-section-chemical-composition').should("be.visible")
  cy.screenshot()
  
    
});


When('I enter LiMn2O4 in Chemical composition text box', () => {
    cy.log('Entering LiMnO4 in chemical input')
    cy.get('#input-section-chemical-composition').should("be.visible")
      .type('LiMn2O4')

}); 


When('I click Submit',()=> {
    cy.get('#input-section-submit-button')
    .should('be.visible')
    .click()
    
});
    

Then('I capture current RPV', () => {
   //cy.get('input[id=":r6:"]')
     cy.wait(3000)
     cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]')
       .invoke('val')
       .then(sometext => {
        let currentRPV = sometext
        cy.wrap(currentRPV).as('currentRPV')
    })  
});

Then('I capture current LE', () => {

    const currentLE = []
    cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
    .each(($li) => {
        currentLE.push($li.text())
      })
    .wrap(currentLE).as('currentLE')
   
})
    

Then('I click on new toggle value', () => {

    cy.wait(5000)
    cy.get("[id='next-nudge']")
    .should('be.visible')
    .click()
    .click()
});


Then('I capture new RPV', () => {
    cy.wait(5000)
   //cy.get('input[id="ecp-input"]')
   cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]')
       .invoke('val')
       .then(sometext => {
        let newRPV = sometext
        cy.wrap(newRPV).as('newRPV')
    })
})


Then('I capture new LE', () => {

    const newLE = []
    cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
    .each(($li) => {
        newLE.push($li.text())
      })
    .wrap(newLE).as('newLE')
})


Then('I verify the RPV and LE changes', () => {

    cy.get('@newLE').then(newLE => {
        cy.get('@currentLE').then(currentLE => {
            assert.notDeepEqual(newLE,currentLE, " LE Changes")
        })
    })
    cy.get('@newRPV').then(newRPV => {
    cy.get('@currentRPV').then(currentRPV => {
        assert.notEqual(newRPV,currentRPV, " RPV Changes")
    })
    })
})


Then('I enter new value in RPV', () => {

    cy.xpath("//*[@class='MuiInputBase-input MuiFilledInput-input css-2bxn45']").type('{selectall}{backspace}')
    cy.xpath("//*[@class='MuiInputBase-input MuiFilledInput-input css-2bxn45']").type('2.00000',{force: true})
    cy.xpath("//*[@id='custom-handle-slider']")
       .should('be.visible')
       .scrollTo('left',{ensureScrollable: false})
      
});


Then('the indicator should move', () => {

    cy.log(' VALIDATING ...')
      
});


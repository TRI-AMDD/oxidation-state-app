import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";
const genFilesPath = "cypress/fixtures/rpv.text"
const leFilesPath = "cypress/fixtures/le.text"
const newRpvPath = "cypress/fixtures/newRpv.text"
const newleFilesPath = "cypress/fixtures/newLe.text"
//cy.writeFile(genFilesPath,'test') tested


const sometext='';

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
       .then(sometext => cy.writeFile(genFilesPath,sometext));
        cy.log('The RPV value at first record is');
     
});

Then('I capture current LE', () => {

    const items = []
    cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
    .each(($li) => items.push($li.text()))
    .then( () => {
       cy.writeFile(leFilesPath,items)
    })
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
                .then(newRpv => cy.writeFile(newRpvPath,newRpv));
        cy.readFile('cypress/fixtures/rpv.text')
})


Then('I capture new LE', () => {

    const items = []
    cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
    .each(($li) => items.push($li.text()))
    .then( () => {
        //cy.log(items.join(','))
        cy.writeFile(newleFilesPath,items)
    })
})


Then('I verify the RPV and LE changes', () => {

    cy.fixture('rpv.text').then(fixture => {
        cy.readFile(newRpvPath).then(download => {
           assert.notEqual(fixture,download, " RPV Changes")
        })
    })

    cy.fixture('le.text').then(oldle => {
        cy.readFile(newleFilesPath).then(newle => {
           assert.notEqual(oldle,newle, "LE Changes")
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


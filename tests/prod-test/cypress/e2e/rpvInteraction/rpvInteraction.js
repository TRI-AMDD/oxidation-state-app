import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";

Given('I open the Oxidation State Analyser website', () => {

  cy.visit(Cypress.config().baseUrl)
  //cy.intercept('POST', '/api', { fixture: 'response.json' })
  
    
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
    

Then('I capture current graph slider position', ()=> {

    cy.get('[data-rcs="clip-item"]')
        .invoke('attr', 'style')
        .then(sometext => {
            let currentSlider = sometext
            cy.wrap(currentSlider).as('currentSlider')
        })  
})


Then('I capture current LE', () => {

    const currentLE = []
    cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
    .each(($li) => {
        currentLE.push($li.text())
      })
    .wrap(currentLE).as('currentLE')
})



Then('I enter new RPV', () => {

       //cy.get('input[id="ecp-input"]').type('{selectall}{backspace}')
        //cy.get('input[id="ecp-input"]').type('5.00000',{force: true})
        cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]').type('{selectall}{backspace}')
        cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]').type('5.00000',{force: true})
        cy.wait(3000)
          
});


Then('I capture new graph slider position', ()=> {

    cy.get('[data-rcs="clip-item"]')
        .invoke('attr', 'style')
        .then(sometext => {
            let newSlider = sometext
            cy.wrap(newSlider).as('newSlider')
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


Then('I verify the graph slider and LE changes', () => {

    cy.get('@currentLE').then(currentLE => {
        cy.get('@currentSlider').then(currentSlider => {
            cy.get('@newLE').then(newLE => {
                cy.get('@newSlider').then(newSlider => {
                    assert.notDeepEqual(currentLE,newLE, "LE Changes")
                    assert.notDeepEqual(currentSlider,newSlider, "Graph slider position changes")
                })
            })
        })
    }) 

})

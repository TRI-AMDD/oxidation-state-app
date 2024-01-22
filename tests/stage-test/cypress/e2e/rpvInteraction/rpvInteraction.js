import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";
const sliderPath = "cypress/fixtures/slider.text"
const RPVIlePath = "cypress/fixtures/le.text"
const newSliderPath = "cypress/fixtures/newSlider.text"
const RPVInewlePath = "cypress/fixtures/newLe.text"


const sometext='';

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
        .then(sometext => cy.writeFile(sliderPath,sometext));
        cy.log('The Slider style value at first record is');
})


Then('I capture current LE', () => {

    const items = []
    cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
    .each(($li) => items.push($li.text()))
    .then( () => {
        //cy.log(items.join(','))
        cy.writeFile(RPVIlePath,items)
    })
})



Then('I enter new RPV', () => {

       cy.get('input[id="ecp-input"]').type('{selectall}{backspace}')
        cy.get('input[id="ecp-input"]').type('5.00000',{force: true})
        cy.wait(3000)
          
});


Then('I capture new graph slider position', ()=> {

    cy.get('[data-rcs="clip-item"]')
        .invoke('attr', 'style')
        .then(sometext => cy.writeFile(newSliderPath,sometext));
        cy.log('The Slider style value is changed to');
})


Then('I capture current LE', () => {

    const items = []
    cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
    .each(($li) => items.push($li.text()))
    .then( () => {
        //cy.log(items.join(','))
        cy.writeFile(RPVInewlePath,items)
    })
})


Then('I verify the graph slider and LE changes', () => {

    cy.fixture('slider.text').then(fixture => {
        cy.readFile(newSliderPath).then(download => {
           assert.notEqual(fixture,download, " Slider Position Changes")
        })
    })

    cy.fixture('le.text').then(oldle => {
        cy.readFile(RPVInewlePath).then(newle => {
           assert.notEqual(oldle,newle, "LE Changes")
        })
    })

})

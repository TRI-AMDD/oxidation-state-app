import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";

Given('I open the Oxidation State Analyser website', () => {
    cy.login()
});


When('I enter {string} in Chemical composition text box and submit', chemical => {
    cy.analyse(chemical)

}); 


Then('I capture {string} RPV', (currentorNew) => {
    cy.captureRPV(currentorNew)   
});

Then('I capture {string} LE', (currentorNew) => {
    cy.captureLE(currentorNew)
})
    

Then('I click on new toggle value', () => {
    cy.setToggle()
});


Then('I verify the {string} and {string} changes', (label1,label2) => {
    cy.verifyChanges(label1)
    cy.verifyChanges(label2)
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


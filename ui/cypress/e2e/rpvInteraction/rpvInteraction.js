import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";

Given('I open the Oxidation State Analyser website', () => {
    cy.login()
});


When('I enter {string} in Chemical composition text box', (chemical) => {
    cy.analyse(chemical)
}); 
  

Then('I capture {string} graph slider position', (currentorNew) => {
    cy.captureGraph(currentorNew)
})


Then('I capture {string} LE', (currentorNew) => {
    cy.captureLE(currentorNew)
})


Then('I enter new RPV {string}', (rpv) => {
    cy.setRPV(rpv)
});

Then('I verify the {string} and {string} changes', (label1,label2) => {
    cy.verifyChanges(label1)
    cy.verifyChanges(label2)
})
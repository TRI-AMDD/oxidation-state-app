import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import "cypress-xpath";

Given('I open the Oxidation State Analyser website', () => {
    cy.login()
});


When('I enter {string} in Chemical composition text box and submit', chemical => {
    cy.analyse(chemical)

});

When('I click row number {int}', (row) => {
    cy.clickRow(row)
})


Then('I capture {string} RPV', (currentorNew) => {
    cy.captureRPV(currentorNew)
})

Then('I capture {string} graph slider position', (currentorNew) => {
    cy.captureGraph(currentorNew)
})


Then('I verify the {string} and {string} changes', (label1,label2) => {
    cy.verifyChanges(label1)
    cy.verifyChanges(label2)
})
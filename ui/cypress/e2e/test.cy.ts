describe('Oxidation State', () => {
    it('Enter chemical composition and view results', () => {
        cy.visit('http://localhost:3000/');

        cy.get('#input-section-chemical-composition').type('LiMn2O4');

        cy.get('[data-testid="input-section-submit-button"]').click();

        // assert values

        cy.get('#ecp-input').should('have.value', '1.98691');

        cy.get('[data-id="row-id-0"] >  [data-field="oxidationState"] > div > :nth-child(1)').should(
            'have.html',
            'Li<sup>1+</sup>'
        );

        cy.get('[data-id="row-id-0"] >  [data-field="oxidationState"] > div > :nth-child(2)').should(
            'have.html',
            'Mn<sup>3+</sup>'
        );

        cy.get('[data-id="row-id-0"] >  [data-field="oxidationState"] > div > :nth-child(3)').should(
            'have.html',
            'Mn<sup>4+</sup>'
        );

        cy.get('[data-id="row-id-0"] >  [data-field="oxidationState"] > div > :nth-child(4)').should(
            'have.html',
            '4O<sup>2-</sup>'
        );
        
        cy.get('[data-id="row-id-0"] > [data-field="likelihoodOptimalElecChemPotential"] > div').should(
            'have.text',
            '0.25'
        );
        cy.get('[data-id="row-id-0"] > [data-field="likelihoodCurrentElecChemPotential"] > div').should(
            'have.text',
            '0.25'
        );
        cy.get('[data-id="row-id-0"] > [data-field="optimalElecChemPotential"] > div').should(
            'have.text',
            '1.99'
        );
        cy.get('[data-id="row-id-0"] > [data-field="globalInstabilityIndex"] > div').should(
            'have.text',
            'N/A'
        );
    });
});

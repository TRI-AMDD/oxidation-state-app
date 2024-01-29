Cypress.Commands.add('login', () => {
    
    cy.log(Cypress.config().ENV)  
    cy.visit(Cypress.config().baseUrl)
    if((Cypress.config().baseUrl).includes('localhost'))
    {
      cy.intercept('POST', '/api', { fixture: 'response.json' })
    }  
    cy.log('NAVIGATING TO OXIDATION ANALYSER WEB')
    cy.wait(10000)
    cy.get('#input-section-chemical-composition').should("be.visible")
    cy.screenshot()
    
})


Cypress.Commands.add('analyse', (chemical) => {
    cy.log('Entering Chemical in chemical input')
    cy.get('#input-section-chemical-composition').should("be.visible")
      .type(chemical)
    cy.get('#input-section-submit-button')
      .should('be.visible')
      .click()
    cy.wait(10000)
})

Cypress.Commands.add('setToggle', () => {
    cy.wait(5000)
    cy.get("[id='next-nudge']")
    .should('be.visible')
    .click()
    .click()
}) 


Cypress.Commands.add('setRPV', (rpv) => {
    if(Cypress.config().ENV == 'prod' || Cypress.config().ENV == 'stage')
    {
        cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]').type('{selectall}{backspace}')
        cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]').type(rpv,{force: true})
        cy.wait(3000)
    }
    else
    {
        cy.get('input[id="ecp-input"]').type('{selectall}{backspace}')
        cy.get('input[id="ecp-input"]').type(rpv,{force: true})
        cy.wait(3000)
    }
})


Cypress.Commands.add('captureRPV',(currentorNew) => {
if(Cypress.config().ENV == "prod" || Cypress.config().ENV == "stage")
    {
        if(currentorNew == 'current')
        {
            cy.get('input[class="MuiInputBase-input MuiFilledInput-input css-2bxn45"]') 
                .invoke('val')
                .then(sometext => {
                    let currentRPV = sometext
                    cy.wrap(currentRPV).as('currentRPV')
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
        }
    }
    else
    {
        if(currentorNew == 'current')
        {
            cy.get('input[id="ecp-input"]')
            .invoke('val')
            .then(sometext => {
            let currentRPV = sometext
            cy.wrap(currentRPV).as('currentRPV')
        })
        }
        else
        {
            cy.get('input[id="ecp-input"]')
                .invoke('val')
                .then(sometext => {
                    let newRPV = sometext
                    cy.wrap(newRPV).as('newRPV')
                })
        }
    }
})

Cypress.Commands.add("captureGraph", (currentorNew) => {
    if(currentorNew == "current")
    {
        cy.get('[data-rcs="clip-item"]')
            .invoke('attr', 'style')
            .then(sometext => {
                let currentSlider = sometext
                cy.wrap(currentSlider).as('currentSlider')
        })
    }
    else
    {
        cy.get('[data-rcs="clip-item"]')
        .invoke('attr', 'style')
        .then(sometext => {
            let newSlider = sometext
            cy.wrap(newSlider).as('newSlider')
        }) 
    }
})

Cypress.Commands.add("captureLE", (currentorNew) => {
    if(currentorNew == "current")
    {
        const currentLE = []
        cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
        .each(($li) => {
        currentLE.push($li.text())
        })
        .wrap(currentLE).as('currentLE')
    }
    else
    {
        const newLE = []
        cy.get('[data-field="likelihoodCurrentElecChemPotential"]')
        .each(($li) => {newLE.push($li.text())})
        .wrap(newLE).as('newLE')
    }
})


Cypress.Commands.add("clickRow", (row) => {
    let actualRow=row-1
    let theXpath="//*[@data-rowindex="+actualRow+"]"
    // cy.xpath("//*[@data-id='row' and @data-rowindex='row']").click()
   cy.xpath(theXpath).click()
})

Cypress.Commands.add("verifyChanges", (labelName) => {
    if(labelName == "RPV")
    {
        cy.get('@newRPV').then(newRPV => {
            cy.get('@currentRPV').then(currentRPV => {
                assert.notEqual(newRPV,currentRPV, " RPV Changes")
            })
        })
    }
    else if(labelName == "LE")
    {
        cy.get('@newLE').then(newLE => {
            cy.get('@currentLE').then(currentLE => {
                assert.notDeepEqual(newLE,currentLE, " LE Changes")
            })
        })
    }
    else if(labelName == "Graph")
    {
        cy.get('@currentSlider').then(currentSlider => {
            cy.get('@newSlider').then(newSlider => {
                assert.notDeepEqual(currentSlider,newSlider, "Graph slider position changes")
            })
        })
    }    
})

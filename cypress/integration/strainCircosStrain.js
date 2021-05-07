import '@testing-library/cypress/add-commands';
import 'cypress-iframe';

describe("Simple Circos Search", () => {
    beforeEach(() => {
        cy.visit("/CircosStrain")
    })

    it("textbox class exists in DOM", () =>{
        cy.get(".textBox").should('exist');
    });
    it("test standard tree", () =>{
        cy.get(".nav-item").should('exist');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').clear();
        cy.get('#asynchronous-demo').type('PA14');
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        // cy.get('.circosFrame',{timeout:15000}).its('0.contentDocument.body').should('be.visible').then(cy.wrap);
        cy.frameLoaded('.circosFrame');
        cy.iframe('.circosFrame').toMatchSnapshot()
        cy.get("table").should('exist');

    });

    it("test download table as csv", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').clear();
        cy.get('#asynchronous-demo').type('PA14');
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('.btn').click();
        cy.get('.react-bs-table-csv-btn').click();
        /* ==== End Cypress Studio ==== */

        cy.readFile('cypress/downloads/spreadsheet.csv').should('exist')

        cy.task('deleteFile', `spreadsheet.csv`)


    });

});
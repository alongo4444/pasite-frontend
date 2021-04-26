import '@testing-library/cypress/add-commands';


describe("check DOM components", () => {
    beforeEach(() => {
        cy.visit("/search")
    })

    it("check DOM components", () =>{
        cy.get("[type=text]").should('exist');
        cy.get('[id=numResults]').should('exist');
    });


    it("test simple search", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get('#numResults').select('25');
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
        cy.get("table").should('exist');
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(4) > :nth-child(3)').click();
        cy.get('[id=p-seq]').parent().should('not.have.class', 'show')
        cy.get('[id=d-seq]').parent().should('have.class', 'show')
        cy.get(':nth-child(2) > .card-header > .btn').click();
        /* ==== End Cypress Studio ==== */
        cy.get('[id=p-seq]').parent().should('have.class', 'show')
        cy.get('[id=d-seq]').parent().should('not.have.class', 'show')
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[aria-label="locus_tag sortable"]').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[aria-label="locus_tag sort desc"]').should('exist')
        cy.get('[aria-label="start sort desc"]').should('not.exist')
    });

});
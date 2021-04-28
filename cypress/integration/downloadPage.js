import '@testing-library/cypress/add-commands';
import * as fs from 'fs'

describe("Genes by Strains", () => {
    beforeEach(() => {
        cy.visit("/download");

    })

    afterEach(() => {
        cy.task('deleteFile', `report.csv`)
        console.log('test')
    })

    it("textbox class exists in DOM", () =>{
        cy.get(".textBox").should('exist');
    });
    it("nav-item class exists in DOM", () =>{
        cy.get(".nav-item").should('exist');
    });
    it("check text in DOM", () =>{
        cy.findByText('Select single/multiple strain/s:').should('exist')
    });
    it("download attempt", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\33 ').uncheck();
        cy.get('#\\36 ').uncheck();
        cy.get('#\\39 ').uncheck();
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(2) > :nth-child(1) > [style="text-align: center;"] > .btn').click();
        /* ==== End Cypress Studio ==== */

        cy.readFile('cypress/downloads/report.csv').should('exist')
    });





});

describe("Genes By Defense Systems", () => {
    beforeEach(() => {
        cy.visit("/download")
        cy.get('#left-tabs-example-tab-second').click();
    })

    afterEach(() => {
        cy.task('deleteFile', `report.csv`)
        console.log('test')
    })

    it("download attempt", () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#all2').uncheck();
        cy.get('#\\39 2').check();
        cy.get('#\\37 2').check();
        cy.get('[for="32"]').click();
        cy.get('#\\33 2').check();
        cy.get('[for="82"]').click();
        cy.get('#\\38 2').check();
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get(':nth-child(1) > :nth-child(1) > [style="text-align: center;"] > .btn').click();
        /* ==== End Cypress Studio ==== */

        cy.readFile('cypress/downloads/genes_by_defense.csv').should('exist')
    });

    it("download attempt using a file", () =>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#left-tabs-example-tab-second').click();

        cy.get(
            ':nth-child(1) > :nth-child(1) > :nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > .rowC > [style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 14px; transition: opacity 0.25s ease 0s; touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); user-select: none;"] > .react-switch-handle'
        ).click();

        cy.get('#exampleFormControlFile1').click();
        cy.get(':nth-child(1) > :nth-child(1) > .chkbxs > div > .lbl').click();
        cy.get('#all2').uncheck();
        cy.get('[for="52"]').click();
        cy.get('#\\35 2').check();
        cy.get('[for="22"]').click();
        cy.get('#\\32 2').check();
        cy.get('[for="72"]').click();
        cy.get('#\\37 2').check();
        cy.get('[for="82"]').click();
        cy.get('#\\38 2').check();
        cy.get(':nth-child(1) > :nth-child(1) > [style="text-align: center;"] > .btn').click();
        /* ==== End Cypress Studio ==== */

        cy.readFile('cypress/downloads/genes_by_defense.csv').should('exist')
    });

});
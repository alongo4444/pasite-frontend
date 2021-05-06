import '@testing-library/cypress/add-commands';

describe("DS vs DS", () => {
    beforeEach(() => {
        cy.visit("/CorrelationSearchPage")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[id=dvd]').click({force: true});
        /* ==== End Cypress Studio ==== */
    })

    it("check DOM components", () =>{
        cy.get("[type=text]").should('exist');
        cy.get(".sidebar").should("exist");
        cy.get("[id=dvdSearch]").should("be.disabled");
        cy.findByText('Defense System vs Defense System').should('exist')

    });


    /* === Test Created with Cypress Studio === */
    it('check simple search 1', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get("[id=dvdSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dvdGraph1.png');
        cy.get("table").should('exist');
    });
    it('check simple search 2', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-7').click();
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=dvdSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dvdGraph2.png');
        cy.get("table").should('exist');
    });
    it('check simple search 3', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-9').click();
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-6').click();
        cy.get("[id=dvdSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dvdGraph3.png');
        cy.get("table").should('exist');
    });
});

describe("DS vs Attr", () => {
    beforeEach(() => {
        cy.visit("/CorrelationSearchPage")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[id=dvc]').click({force: true});
        /* ==== End Cypress Studio ==== */
    })

    it("check DOM components", () =>{
        cy.get("[type=text]").should('exist');
        cy.get(".sidebar").should("exist");
        cy.get("[id=dvcSearch]").should("be.disabled");
        cy.findByText('Defense System vs Attribute').should('exist')

    });


    /* === Test Created with Cypress Studio === */
    it('check simple search 1', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=dvcSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=boxplotdiv]',{timeout:15000}).toMatchImageSnapshot('dvcGraph1.png');
        cy.get("table").should('exist');
    });

    it('check simple search 2', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-5').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-2').click();
        cy.get("[id=dvcSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=boxplotdiv]',{timeout:15000}).toMatchImageSnapshot('dvcGraph2.png');
        cy.get("table").should('exist');
    });


    it('check simple search 3', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get("[id=dvcSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=boxplotdiv]',{timeout:15000}).toMatchImageSnapshot('dvcGraph3.png');
        cy.get("table").should('exist');
    });
});

describe("DS vs Iso", () => {
    beforeEach(() => {
        cy.visit("/CorrelationSearchPage")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[id=dvi]').click({force: true});
        /* ==== End Cypress Studio ==== */
    })

    it("check DOM components", () =>{
        cy.get("[type=text]").should('exist');
        cy.get(".sidebar").should("exist");
        cy.get("[id=dviSearch]").should("be.disabled");
        cy.findByText('Defense System vs Isolation Type').should('exist')

    });


    /* === Test Created with Cypress Studio === */
    it('check simple search 1', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=dviSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dviGraph1.png');
        cy.get("table").should('exist');
    });

    it('check simple search 2', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-6').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get("[id=dviSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dviGraph2.png');
        cy.get("table").should('exist');
    });

    it('check simple search 3', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-9').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=dviSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dviGraph3.png');
        cy.get("table").should('exist');
    });
});

describe("DS vs Cl", () => {
    beforeEach(() => {
        cy.visit("/CorrelationSearchPage")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[id=dvcl]').click({force: true});
        /* ==== End Cypress Studio ==== */
    })

    it("check DOM components", () =>{
        cy.get("[type=text]").should('exist');
        cy.get(".sidebar").should("exist");
        cy.get("[id=dvclSearch]").should("be.disabled");
        cy.findByText('Defense System vs Cluster').should('exist')

    });


    /* === Test Created with Cypress Studio === */
    it('check simple search 1', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get("[id=dvclSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dvclGraph1.png');
        cy.get("table").should('exist');
    });

    it('check simple search 2', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-6').click();
        cy.get("[id=dvclSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dvclGraph2.png');
        cy.get("table").should('exist');
    });

    it('check simple search 3', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-7').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-11').click();
        cy.get("[id=dvclSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */

        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('dvclGraph3.png');
        cy.get("table").should('exist');
    });
});

describe("Cl vs Iso", () => {
    beforeEach(() => {
        cy.visit("/CorrelationSearchPage")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[id=clvi]').click({force: true});
        /* ==== End Cypress Studio ==== */
    })

    it("check DOM components", () =>{
        cy.get("[type=text]").should('exist');
        cy.get(".sidebar").should("exist");
        cy.get("[id=clviSearch]").should("be.disabled");
        cy.findAllByText('Cluster vs Isolation Type').should('exist')

    });


    /* === Test Created with Cypress Studio === */
    it('check simple search 1', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get("[id=clviSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('clviGraph1.png');
        cy.get("table").should('exist');
    });

    it('check simple search 2', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-5').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=clviSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('clviGraph2.png');
        cy.get("table").should('exist');
    });

    it('check simple search 3', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-7').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=clviSearch]").should("not.be.disabled");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
        cy.get('[id=chartdiv]',{timeout:15000}).toMatchImageSnapshot('clviGraph3.png');
        cy.get("table").should('exist');
    });
});
import '@testing-library/cypress/add-commands';

describe("Test Drawer", () => {
    beforeEach(() => {
        cy.visit("/CorrelationSearchPage")
    })

    /* === Test Created with Cypress Studio === */
    it('Open and Close Drawer', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[id=drawerBut]').click();
        cy.get('[id=drawerBut]').click();
        /* ==== End Cypress Studio ==== */
    });
})

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

    it('Error autocomplete test', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.intercept('GET', 'api/v1/defense', {
            statusCode: 500,
        })

        cy.get('#asynchronous-demo').click();
        cy.get('.modal-body').should('be.visible')

        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.modal-footer > .btn').click();
        /* ==== End Cypress Studio ==== */
    })

    it('Error results test', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-5').click();
        cy.intercept('GET', 'api/v1/statistics/*', {
            statusCode: 500,
        })
        cy.get('#dvdSearch').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */
    })
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

    it("check option selection and removal", () =>{
        cy.get("[id=dvcSearch]").should("be.disabled");

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=dvcSearch]").should("not.be.disabled");
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root > path').click({force:true});
        cy.get(':nth-child(3) > .search-form > .form-group > .col').click();
        cy.get("[id=dvcSearch]").should("be.disabled");
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-2').click();
        cy.get("[id=dvcSearch]").should("not.be.disabled");
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force:true});
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click({force:true});
        cy.get("[id=dvcSearch]").should("be.disabled");
        /* ==== End Cypress Studio ==== */
    });

    it('Error results test', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#dvc > .MuiListItemIcon-root > [viewBox="0 0 16 16"] > [d="M8 2.25c.909 0 3.188.685 4.254 1.022a.94.94 0 01.656.773c.814 6.424-4.13 9.452-4.91 9.452V2.25z"]').click({force:true});
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.intercept('GET', 'api/v1/statistics/*', {
            statusCode: 500,
        })
        cy.get('#dvcSearch').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */
    })

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

    it("check option selection and removal", () =>{
        cy.get("[id=dviSearch]").should("be.disabled");
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get("[id=dviSearch]").should("not.be.disabled");
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
        cy.get("[id=dviSearch]").should("be.disabled");
        cy.get('.body_c').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator').click();
        cy.get('.body_c').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get("[id=dviSearch]").should("not.be.disabled");
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('.body_c').click();
        cy.get("[id=dviSearch]").should("be.disabled");
        /* ==== End Cypress Studio ==== */
    });

    it('Error results test', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.intercept('GET', 'api/v1/statistics/*', {
            statusCode: 500,
        })
        cy.get('#dviSearch').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */
    })

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

    it("check option selection and removal", () =>{
        cy.get("[id=dvclSearch]").should("be.disabled");

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-5').click();
        cy.get("[id=dvclSearch]").should("not.be.disabled");
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('.container > :nth-child(3)').click();
        cy.get("[id=dvclSearch]").should("be.disabled");
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-2').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root > path').click();
        cy.get('.container > :nth-child(3)').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.get('#asynchronous-demo-option-1').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force:true});
        cy.get('[labeltext="Choose a Defense System"] > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force:true});
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force:true});
        /* ==== End Cypress Studio ==== */
    });

    it('Error results test', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-2').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.intercept('GET', 'api/v1/statistics/*', {
            statusCode: 500,
        })
        cy.get('#dvclSearch').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */
    })


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

    it("check option selection and removal", () =>{
        cy.get("[id=clviSearch]").should("be.disabled");
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get("[id=clviSearch]").should("not.be.disabled");
        cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force: true});
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root > path').click({force: true});
        cy.get('.container > :nth-child(3)').click();
        cy.get("[id=clviSearch]").should("be.disabled");
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-5').click();
        cy.get('#strains-combo-box').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get("[id=clviSearch]").should("not.be.disabled");
        cy.get('.MuiAutocomplete-root.Mui-focused > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force: true});
        cy.get('.container > :nth-child(3)').click();
        cy.get("[id=clviSearch]").should("be.disabled");
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get("[id=clviSearch]").should("not.be.disabled");
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click({force: true});
        /* ==== End Cypress Studio ==== */
    });

    it('Error results test', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#clvi').click({force: true});
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.intercept('GET', 'api/v1/statistics/*', {
            statusCode: 500,
        })
        cy.get('#clviSearch').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
    })

});


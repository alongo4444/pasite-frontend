import '@testing-library/cypress/add-commands'


describe("one-step actions", () => {
    beforeEach(()=>{
        cy.visit("/browse")
    })
    afterEach(()=>{
        cy.get('img[src*="data:;"]',{timeout:15000}).should('have.attr','src')
        cy.get('img[src*="data:;"]',{timeout:15000}).should('be.visible')
    })
    it("sidebar class exists in DOM", () =>{
        cy.get(".sidebar").should("exist");
    });

    it("check defense systems tab", () =>{
        cy.findByText('Choose the Defense Systems you would like to show:').should('exist')
    })

    it("check drawer switching",() =>{
        cy.findByText('Choose the Defense Systems you would like to show:').should('exist')
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.MuiList-root > :nth-child(2)').click({force:true});
        cy.findByText('Choose the number of genes you would like to show:').should('exist')
        cy.get('div[class="App"]').toMatchImageSnapshot('cluster_mode.png')
        cy.get('.MuiList-root > :nth-child(3)').click({force:true});
        // cy.findByText('choose isolation type').should('exist') // should fail
        cy.get('div[class="App"]').toMatchImageSnapshot('isolationType_mode.png')
        cy.get('.MuiList-root > :nth-child(4)').click({force:true});
        cy.findByText('showing the distribution of distinct count of defense systems of each strain across the tree').should('exist')
        cy.get('div[class="App"]').toMatchImageSnapshot('distinct_count.png')
        /* ==== End Cypress Studio ==== */
    })
    it("check strains file upload",()=>{
        cy.get('.react-switch-bg').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains");
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:;"]',{timeout:15000}).toMatchImageSnapshot('fileSubTree.png');
    })

    it("check manuel strain selection", ()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').clear();
        cy.get('#asynchronous-demo').type('PA14');
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo').clear();
        cy.get('#asynchronous-demo').type('PAO1');
        cy.get('#asynchronous-demo-option-0').click();
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:;"]',{timeout:15000}).toMatchImageSnapshot('manuelSubTree.png');
        /* ==== End Cypress Studio ==== */
    })
    it("check defense system selection",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.css-2b097c-container').click();
        cy.get('#react-select-3-option-0').click();
        cy.get('#react-select-3-option-1').click();
        cy.get('#react-select-3-option-3').click();
        cy.get('#react-select-3-option-10').click();
        cy.get('[style="transition: opacity 400ms ease 0s, transform 400ms ease 0s; transform: none; opacity: 1;"] > :nth-child(1)').click();
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:;"]',{timeout:15000}).toMatchImageSnapshot('4systemsTree.png');
        /* ==== End Cypress Studio ==== */
    })
    it("get tree with MLST coloring",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\31 ').check();
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:;"]',{timeout:15000}).toMatchImageSnapshot('standardTreeMLST.png');
        /* ==== End Cypress Studio ==== */
    })

    it("test zoom operation",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.tools > :nth-child(2) > .MuiIconButton-label > svg').click();
        cy.get(':nth-child(1) > .MuiIconButton-label > svg > [d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"]').click({force:true});
        cy.get(':nth-child(1) > .MuiIconButton-label > svg > [d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"]').click({force:true});
        cy.get(':nth-child(1) > .MuiIconButton-label > svg > [d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"]').click({force:true});
        cy.get(':nth-child(3) > .MuiIconButton-label > svg').click();
        cy.get(':nth-child(3) > .MuiIconButton-label > svg').click();
        /* ==== End Cypress Studio ==== */
    })

    it("screenshot(visual) testing of the standard tree:", ()=>{
        cy.get('div[class="App"]').toMatchImageSnapshot('standardPage.png');
        cy.get('img[src*="data:;"]',{timeout:15000}).toMatchImageSnapshot('standardTree.png');
    })

})
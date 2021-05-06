import '@testing-library/cypress/add-commands'


describe("one-step actions", () => {
    beforeEach(()=>{
        cy.visit("/browse")
    })
    afterEach(()=>{
        cy.get('img[src*="data:;"]',{timeout:10000}).should('have.attr','src')
        cy.get('img[src*="data:;"]',{timeout:10000}).should('be.visible')
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
        cy.get('div[class="App"]').toMatchImageSnapshot({name:'cluster_mode.png'})
        cy.get('.MuiList-root > :nth-child(3)').click({force:true});
        // cy.findByText('choose isolation type').should('exist') // should fail
        cy.get('div[class="App"]').toMatchImageSnapshot({name:'isolationType_mode.png'})
        cy.get('.MuiList-root > :nth-child(4)').click({force:true});
        cy.findByText('showing the distribution of distinct count of defense systems of each strain across the tree').should('exist')
        cy.get('div[class="App"]').toMatchImageSnapshot({name:'distinct_count.png'})
        /* ==== End Cypress Studio ==== */
    })
    it("check strains file upload",()=>{
        cy.get('.react-switch-bg').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains");
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:;"]',{timeout:10000}).toMatchImageSnapshot({name:'fileSubTree.png'});
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
        cy.get('img[src*="data:;"]',{timeout:10000}).toMatchImageSnapshot({name:'manuelSubTree.png'});
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
        cy.get('img[src*="data:;"]',{timeout:10000}).toMatchImageSnapshot({name:'4systemsTree.png'});
        /* ==== End Cypress Studio ==== */
    })
    it("get tree with MLST coloring",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\31 ').check();
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:;"]',{timeout:10000}).toMatchImageSnapshot({name:'standardTreeMLST.png'});
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
        cy.get('div[class="App"]').toMatchImageSnapshot({name:'standardPage.png'});
        cy.get('img[src*="data:;"]',{timeout:10000}).toMatchImageSnapshot({name:'standardTree.png'});
    })
})

describe("check all defense systems:",()=>{
    beforeEach(()=>{
        cy.visit("/browse")

    })

    it("test triplets of defense systems", ()=>{
        let triplets = []
        cy.request('http://localhost:8800/api/v1/defense/triplets').then((response)=>{
            triplets = response.body;
        }).then(()=>{
            console.log(triplets);
            cy.wrap(triplets).each((triple,idx)=>{
                /* ==== Generated with Cypress Studio ==== */
                cy.get('.css-g1d714-ValueContainer').click();
                cy.get('#react-select-3-input').clear();
                cy.get('#react-select-3-input').type(triple[0]);
                cy.get('div[id*="react-select-3"]').first().click() //triple[0]).click();
                cy.get('#react-select-3-input').type(triple[1]);
                cy.get('div[id*="react-select-3"]').first().click() //triple[0]).click();
                cy.get('#react-select-3-input').type(triple[2]);
                cy.get('div[id*="react-select-3"]').first().click() //triple[0]).click();
                cy.get('.react-transform-element').click();
                /* ==== End Cypress Studio ==== */
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:;"]',{timeout:50000}).toMatchImageSnapshot({name:triple.join("_")+'.png'});
                cy.get('div[class*="tlfecz-indicatorContainer"]').first().click()
            })
        });
    })
})


describe("check clusters trees:",()=> {
    beforeEach(() => {
        cy.visit("/browse");
        cy.get('.MuiList-root > :nth-child(2)').click({force:true});
    })

    it("test one cluster at a time:", ()=>{
        let randomGenes = []
        cy.request('http://localhost:8800/api/v1/cluster/get_gene_strain_id/GCF_000014625.1').then((response)=>{
            const shuffled = response.body.sort(() => 0.5 - Math.random());
            randomGenes = shuffled.slice(0,10);
        }).then(()=> {
            console.log(randomGenes);
            cy.wrap(randomGenes).each((gene, idx) => {
                /* ==== Generated with Cypress Studio ==== */
                cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
                // cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
                cy.get('#Choose_num-option-0').click();
                cy.get('#strains-combo-box').clear();
                cy.get('#strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get(':nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
                cy.get(':nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(gene.name);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:;"]',{timeout:50000}).should('have.attr','src')
                cy.get('img[src*="data:;"]',{timeout:50000}).should('be.visible')
                cy.get('img[src*="data:;"]', {timeout: 50000}).toMatchImageSnapshot({name: gene + '_tree.png'});
                /* ==== End Cypress Studio ==== */
            })
        })
    })

    it("test two clusters at a time:", ()=>{
        let doubles = []
        cy.request('http://localhost:8800/api/v1/cluster/get_tuple_genes/GCF_000014625.1').then((response)=>{
            doubles = response.body;
        }).then(()=> {
            cy.wrap(doubles).each((double, idx) => {
                /* ==== Generated with Cypress Studio ==== */
                cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
                // cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
                cy.get('#Choose_num-option-2').click();
                cy.get('#strains-combo-box').clear();
                cy.get('#strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(double[0]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(double[1]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:;"]',{timeout:50000}).should('have.attr','src')
                cy.get('img[src*="data:;"]',{timeout:50000}).should('be.visible')
                cy.get('img[src*="data:;"]', {timeout: 50000}).toMatchImageSnapshot({name: double.join("_")+ + '_tree.png'});
                /* ==== End Cypress Studio ==== */
            })
        })
    })

    it("test three clusters at a time:",()=>{
        let triples = []
        cy.request('http://localhost:8800/api/v1/cluster/get_tuple_genes/GCF_000014625.1?combinations=3').then((response)=>{
            triples = response.body;
        }).then(()=> {
            cy.wrap(triples).each((triple, idx) => {
                cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
                // cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
                cy.get('#Choose_num-option-2').click();
                cy.get('#strains-combo-box').clear();
                cy.get('#strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                /* ==== Generated with Cypress Studio ==== */
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(triple[0]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(triple[1]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').clear();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(triple[2]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:;"]',{timeout:50000}).should('have.attr','src')
                cy.get('img[src*="data:;"]',{timeout:50000}).should('be.visible')
                cy.get('img[src*="data:;"]', {timeout: 50000}).toMatchImageSnapshot({name: triple.join("_")+ + '_tree.png'});
                /* ==== End Cypress Studio ==== */
            })
        })
    })
})
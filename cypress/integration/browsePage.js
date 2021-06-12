import '@testing-library/cypress/add-commands'
import { fixCypressSpec } from '../support'

describe('test catches in code via forcing network error:',()=>{
    it('error onMount', () => {
        cy.intercept('GET', 'api/v1/strains/*', {
            statusCode: 500,
        })
        cy.visit('/browse')
        cy.get('.modal-body').should('be.visible')
    })

    it('throw error on generate button', () => {
        cy.visit('/browse')
        cy.intercept('GET', 'api/v1/strains/*', {
            statusCode: 500,
        })
        cy.get('.GenerateTree').click();
        cy.get('.modal-body').should('be.visible')
    })

    // it('throw error on cluster generate button', () => {
    //     cy.visit('/browse')
    //     cy.get('.MuiList-root > :nth-child(2)').click({force:true});
    //     cy.intercept('GET', 'api/v1/cluster/*', {
    //         statusCode: 500,
    //     })
    //     cy.get('.GenerateTree').click();
    //     cy.get('.modal-body').should('be.visible')
    // })

    it('throw error in distinct system mode on generate button', () => {
        cy.intercept('GET', '/api/v1/strains/*', {
            statusCode: 500,
        })
        cy.visit('/browse')
        cy.get('.MuiList-root > :nth-child(4)').click({force:true});
        cy.get('.modal-body').should('be.visible')
        cy.get('.GenerateTree').click({force:true});
        cy.get('.modal-footer').findByText('Close').click()
        cy.get('.GenerateTree').click();
        cy.get('.modal-body').should('be.visible')
    })
})

describe("one-step actions", () => {
    beforeEach(fixCypressSpec(__filename))
    beforeEach(()=>{
        cy.visit("/browse")
    })
    afterEach(()=>{

        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('have.attr','src')
        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
        cy.get('.downloadButton').should('exist')
        cy.get('.downloadButton').click()
        cy.readFile('cypress/downloads/download.svg').should('exist')
        cy.task('deleteFile','download.svg')

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
        cy.get('.makeStyles-toolbar-13 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click({force:true});
        cy.get('.makeStyles-toolbar-13 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click({force:true});
        cy.get('.MuiList-root > :nth-child(2)').click({force:true});
        cy.findByText('Choose the number of genes you would like to show:').should('exist')
        cy.wait(3000)
        cy.get('div[class="App"]').toMatchImageSnapshot({name:'cluster_mode.png'})
        cy.get('.MuiList-root > :nth-child(3)').click({force:true});
        // cy.findByText('choose isolation type').should('exist') // should fail
        cy.wait(3000)
        cy.get('div[class="App"]').toMatchImageSnapshot({name:'isolationType_mode.png'})
        cy.get('.MuiList-root > :nth-child(4)').click({force:true});
        cy.findByText('showing the distribution of distinct count of defense systems of each strain across the tree').should('exist')
        cy.wait(3000)
        cy.get('div[class="App"]').toMatchImageSnapshot({name:'distinct_count.png'})
        cy.get('.MuiList-root > :nth-child(1)').click({force:true});
        cy.findByText('Choose the Defense Systems you would like to show:').should('not.exist')

        /* ==== End Cypress Studio ==== */
    })
    it("check strains file upload",()=>{
        cy.get('.react-switch-bg').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains");
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).toMatchImageSnapshot({name:'fileSubTree.png'});
    })

    it("check bad parameters",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.react-switch-bg').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/strainsInvalid.txt");
        cy.get('.GenerateTree').click();
        cy.get('.modal-footer > .btn').click();
        cy.get('#exampleFormControlFile1').attachFile("../fixtures/strainsInvalid.txt");
        cy.get('.GenerateTree').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.modal').click();
        /* ==== End Cypress Studio ==== */
    })

    it("check manuel strain selection", ()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').clear();
        cy.get('#asynchronous-demo').type('PA14');
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo').clear();
        cy.get('#asynchronous-demo').type('PAO1');
        cy.get('#asynchronous-demo-option-0').click();
        cy.get('.GenerateTree').click({force: true});
        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).toMatchImageSnapshot({name:'manuelSubTree.png'});
        /* ==== End Cypress Studio ==== */
    })
    it("check defense system selection",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.wait(2000);
        cy.get('.css-2b097c-container').click();
        cy.get('#react-select-3-option-0').click();
        cy.get('#react-select-3-option-1').click();
        cy.get('#react-select-3-option-3').click();
        cy.get('#react-select-3-option-10').click();
        cy.get('[style="transition: opacity 400ms ease 0s, transform 400ms ease 0s; transform: none; opacity: 1;"] > :nth-child(1)').click();
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).toMatchImageSnapshot({name:'4systemsTree.png'});
        /* ==== End Cypress Studio ==== */
    })
    it("get tree with MLST coloring",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\31 ').check();
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).toMatchImageSnapshot({name:'standardTreeMLST.png'});
        /* ==== End Cypress Studio ==== */
    })

    it("Clear inputs from query",()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-0').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('#asynchronous-demo-option-2').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('.react-transform-element').click();
        cy.get(':nth-child(2) > .MuiListItemIcon-root > svg > path').click({force:true});
        cy.get('.MuiList-root > :nth-child(3)').click({force:true});
        cy.get(':nth-child(4) > .MuiListItemIcon-root > svg > path').click({force:true});
        cy.get('.css-1hb7zxy-IndicatorsContainer').click({force:true});
        cy.get('#react-select-3-option-0').click();
        cy.get('#react-select-3-option-11').click();
        cy.get('#react-select-3-option-9').click();
        cy.get('[style="width: 95%; margin-left: 5%;"] > :nth-child(1) > :nth-child(1) > :nth-child(1)').click();
        cy.get('#Choose_num').click();
        cy.get('#Choose_num-option-2').click();
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#asynchronous-demo-option-5').click();
        cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#asynchronous-demo-option-23').click();
        cy.get('#\\31 ').check();
        cy.get('.resetParams').click();
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
        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).toMatchImageSnapshot({name:'standardTree.png'});
    })
})

describe("check all defense systems:",()=>{
    beforeEach(fixCypressSpec(__filename))
    beforeEach(()=>{
        cy.visit("/browse")

    })

    it("test triplets of defense systems", ()=>{
        let triplets = []
        cy.request('http://localhost:8800/api/v1/defense/triplets').then((response)=>{
            triplets = response.body;
        }).then(()=>{
            cy.wrap(triplets).each((triple,idx)=>{
                /* ==== Generated with Cypress Studio ==== */
                cy.get('.css-g1d714-ValueContainer').click();
                cy.get('#react-select-3-input').clear();
                cy.get('#react-select-3-input').type(triple[0],{force: true});
                // cy.get('div[id*="react-select-3"]').findByText(triple[0]).click() //triple[0]).click();
                cy.get('.css-26l3qy-menu').findByText(triple[0]).click() //triple[0]).click();
                cy.get('#react-select-3-input').type(triple[1],{force: true});
                // cy.get('div[id*="react-select-3"]').findByText(triple[1]).click() //triple[0]).click();
                cy.get('.css-26l3qy-menu').findByText(triple[1]).click() //triple[0]).click();
                cy.get('#react-select-3-input').type(triple[2],{force: true});
                // cy.get('div[id*="react-select-3"]').findByText(triple[2]).click() //triple[0]).click();
                cy.get('.css-26l3qy-menu').findByText(triple[2]).click() //triple[0]).click();
                cy.get('.react-transform-element').click();
                /* ==== End Cypress Studio ==== */
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).toMatchImageSnapshot({name:triple.join("_")+'.png'});
                cy.get('div[class*="tlfecz-indicatorContainer"]').first().click()
            })
        });
    })
})


describe("check clusters trees:",()=> {
    beforeEach(fixCypressSpec(__filename))
    beforeEach(() => {
        cy.visit("/browse");
        cy.get('.MuiList-root > :nth-child(2)').click({force:true});
    })

    it("test one cluster at a time:", ()=>{
        let randomGenes = []
        cy.request('http://localhost:8800/api/v1/cluster/get_gene_strain_id/GCF_000014625.1').then((response)=>{
            const shuffled = response.body.sort(() => 0.5 - Math.random());
            randomGenes = shuffled.slice(0,4);
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
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
                cy.get(':nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(gene.name);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('have.attr','src')
                cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
                cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name: gene.name + '_tree.png'});

                cy.get('#csvfile').check()
                cy.get('[style="text-align: left;"] > .btn').click();
                cy.readFile('cypress/downloads/genes_by_cluster.csv').should('exist')
                cy.task('deleteFile','genes_by_cluster.csv')

                cy.get('.col-sm-5 > :nth-child(2) > .form-check-label').click();
                cy.get('#fastafile').check();
                cy.get('[style="text-align: left;"] > .btn').click();
                cy.readFile('cypress/downloads/genes_by_cluster.faa').should('exist')
                cy.task('deleteFile','genes_by_cluster.faa')

                cy.get('#dna').check();
                cy.get('[style="text-align: left;"] > .btn').click();
                cy.readFile('cypress/downloads/genes_by_cluster.faa').should('exist')
                cy.task('deleteFile','genes_by_cluster.faa')
                /* ==== End Cypress Studio ==== */
                if((idx+1) % 3 ==0){
                    cy.get('#\\31 ').check();
                    cy.get('.GenerateTree').click();
                    cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
                    cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name: gene.name + '_MLST_tree.png'});
                    cy.get('#\\31 ').check();
                }
            })
        })
    })

    it("test error download cluster:", ()=>{
        cy.intercept('GET', 'api/v1/genes/*', {
            statusCode: 500,
        })


        /* ==== Generated with Cypress Studio ==== */
        cy.get('#asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-3').click();
        cy.get('#asynchronous-demo-option-4').click();
        cy.get('.col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('.css-g1d714-ValueContainer').click();
        cy.get('#react-select-3-option-1').click();
        cy.get('#react-select-3-option-4').click();
        cy.get(':nth-child(3) > .css-6q0nyr-Svg > path').click({force:true});
        cy.get('#Choose_num').click({force:true});
        cy.get('#Choose_num-option-0').click();
        cy.get('#strains-combo-box').click();
        cy.get('#strains-combo-box-option-1').click();
        cy.get(':nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
        cy.get('#asynchronous-demo-option-1').click();
        cy.get('.GenerateTree').click();
        cy.get('[style="text-align: left;"] > .btn').click();
        cy.get('.modal-body').should('be.visible')
        /* ==== End Cypress Studio ==== */
    })

    it("test two clusters at a time:", ()=>{
        let doubles = []
        cy.request('http://localhost:8800/api/v1/cluster/get_tuple_genes/GCF_000014625.1').then((response)=>{
            doubles = response.body;
            const shuffled = doubles.sort(() => 0.5 - Math.random());
            doubles = shuffled.slice(0,4);
        }).then(()=> {
            cy.wrap(doubles).each((double, idx) => {
                /* ==== Generated with Cypress Studio ==== */
                cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
                // cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
                cy.get('#Choose_num-option-1').click();
                cy.get('#strains-combo-box').clear();
                cy.get('#strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(double[0]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(double[1]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('have.attr','src')
                cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
                cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name: double.join("_") + '_tree.png'});
                cy.get('#fastafile').check();
                cy.get('[style="text-align: left;"] > .btn').click();
                cy.readFile('cypress/downloads/genes_by_cluster.faa').should('exist')
                cy.task('deleteFile','genes_by_cluster.faa')
                cy.get('#dna').check();
                cy.get('[style="text-align: left;"] > .btn').click();
                cy.readFile('cypress/downloads/genes_by_cluster.faa').should('exist')
                cy.task('deleteFile','genes_by_cluster.faa')
                /* ==== End Cypress Studio ==== */
                if((idx+1) % 3 ==0){
                    cy.get('#\\31 ').check();
                    cy.get('.GenerateTree').click();
                    cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
                    cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name: double.join("_") + '_MLST_tree.png'});
                    cy.get('#\\31 ').check();

                }
            })

        })
    })

    it("test three clusters at a time:",()=>{
        let triples = []
        cy.request('http://localhost:8800/api/v1/cluster/get_tuple_genes/GCF_000014625.1?combinations=3').then((response)=>{
            triples = response.body;
            const shuffled = triples.sort(() => 0.5 - Math.random());
            triples = shuffled.slice(0,4);
        }).then(()=> {
            cy.wrap(triples).each((triple, idx) => {
                cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
                // cy.get('container > :nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
                cy.get('#Choose_num-option-2').click();
                cy.get('#strains-combo-box').clear();
                cy.get('#strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get('.react-transform-element').click();
                /* ==== Generated with Cypress Studio ==== */
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(triple[0]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(triple[1]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').clear();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').type('PA14');
                cy.get('#strains-combo-box-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
                cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type(triple[2]);
                cy.get('#asynchronous-demo-option-0').click();
                cy.get('.react-transform-element').click();
                cy.get('.GenerateTree').click();
                cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('have.attr','src')
                cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
                cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name: triple.join("_") + '_tree.png'});
                cy.get('#fastafile').check();
                cy.get('[style="text-align: left;"] > .btn').click();
                cy.readFile('cypress/downloads/genes_by_cluster.faa').should('exist')
                cy.task('deleteFile','genes_by_cluster.faa')
                cy.get('#dna').check();
                cy.get('[style="text-align: left;"] > .btn').click();
                cy.readFile('cypress/downloads/genes_by_cluster.faa').should('exist')
                cy.task('deleteFile','genes_by_cluster.faa')
                /* ==== End Cypress Studio ==== */
                if((idx+1) % 3 ==0){
                    cy.get('#\\31 ').check();
                    cy.get('.GenerateTree').click();
                    cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
                    cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name: triple.join("_") + '_MLST_tree.png'});
                    cy.get('#\\31 ').check();
                }
            })
        })
    })
})

describe("check isolation type trees:",()=> {
    beforeEach(() => {
        cy.visit("/browse");
        cy.get('.MuiList-root > :nth-child(3)').click({force:true});
    })
    it('test isolation type:',()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.GenerateTree').click();
        cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:50000}).should('be.visible')
        cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name:'all_isolation_types.png'});
        /* ==== End Cypress Studio ==== */
    })
})
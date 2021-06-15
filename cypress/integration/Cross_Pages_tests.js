import '@testing-library/cypress/add-commands'

// Cross_Pages_tests.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* === Test Created with Cypress Studio === */
it('ABI BREX research', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/');
  cy.get('.carousel-control-next').click();
  cy.get('.carousel-control-next').click();
  cy.get(':nth-child(1) > .nav-link').click();
  cy.get('.carousel-control-next-icon').click();
  cy.get('.carousel-control-next-icon').click();
  cy.get('.carousel-control-next-icon').click();
  cy.get(':nth-child(2) > .nav-link').click();
  cy.get('#asynchronous-demo').clear();
  cy.get('#asynchronous-demo').type('PA14');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('.btn').click();
  cy.wait(3000);
  cy.get('#pageDropDown').click();
  cy.get('.dropdown-menu').findByText('25').click();
  cy.get(':nth-child(25) > :nth-child(3)').click();
  cy.get(':nth-child(2) > .card-header > .btn').click();
  cy.get('[aria-label="locus_tag sortable"]').click();
  cy.get('[aria-label="start sortable"]').click();
  cy.get('[aria-label="end sortable"]').click();
  cy.get('[aria-label="end sort desc"]').click();
  cy.get(':nth-child(3) > .nav-link').click();
  cy.get('#asynchronous-demo').clear();
  cy.get('#asynchronous-demo').type('PA14');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('.btn').click();
  cy.get('[aria-label="anti crispr sortable"]').click();
  cy.get('#pageDropDown').click();
  cy.get('.dropdown-menu').findByText('10').click();
  cy.get('.react-bs-table-csv-btn').click();
  cy.get(':nth-child(4) > .nav-link').click();
  cy.wait(3000)
  cy.get('.css-2b097c-container').click();
  cy.get('#react-select-3-input').type('ABI');
  cy.get('.css-26l3qy-menu').findByText('ABI').click();
  cy.get('#react-select-3-input').type('BREX');
  cy.get('.css-26l3qy-menu').findByText('BREX').click();
  cy.get('[style="transition: opacity 400ms ease 0s, transform 400ms ease 0s; transform: none; opacity: 1;"] > :nth-child(1)').click();
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)
  cy.get('.react-switch-bg').click();
  cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains");
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)
  cy.get('#\\31 ').check();
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)
  cy.get(':nth-child(4) > .MuiListItemIcon-root > svg').click({force: true});
  cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains");
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)
  cy.get(':nth-child(2) > .MuiListItemIcon-root > svg').click({force: true});
  cy.get('.MuiAutocomplete-endAdornment').click();
  cy.get('#Choose_num').clear();
  cy.get('#Choose_num').type('2');
  cy.get('#Choose_num-option-0').click();
  cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').click();
  cy.get('#strains-combo-box-option-1').click();
  cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-6').click();
  cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #strains-combo-box').click();
  cy.get('#strains-combo-box-option-1').click();
  cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-1').click();
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)

  cy.get('.react-switch-bg').click({force: true});
  cy.get('form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
  cy.get('form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type('PAO1');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
  cy.get('form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type('PA14');
  cy.get('#asynchronous-demo-option-1').click();
  cy.get('form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
  cy.get('form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type('U');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)

  cy.get(':nth-child(3) > .MuiListItemIcon-root > svg').click({force: true});
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)
  cy.get('.react-switch-bg').click({force: true});
  cy.get('#exampleFormControlFile1').attachFile("../fixtures/strains");
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]',{timeout:60000}).should('be.visible')
  cy.wait(3000)

  cy.get(':nth-child(5) > .nav-link').click();
  cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
  cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type('pa14');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
  cy.get(':nth-child(6) > .btn').click();
  cy.get('#left-tabs-example-tab-second').click();
  cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
  cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type('ABI');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
  cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type('brex');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get(':nth-child(2) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
  cy.get(':nth-child(5) > .btn').click();
  cy.get(':nth-child(6) > .nav-link').click();
  cy.get('#asynchronous-demo').clear();
  cy.get('#asynchronous-demo').type('abi');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('#asynchronous-demo').clear();
  cy.get('#asynchronous-demo').type('BRE');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('.MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
  cy.get('#dvdSearch').click();
  cy.get('tbody > tr > :nth-child(4)').click();
  cy.get('#dvc > .MuiListItemIcon-root > [viewBox="0 0 16 16"]').click({force: true});
  cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-0').click();
  cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-2').click();
  cy.get('#dvcSearch').click();
  cy.get('#dvi > .MuiListItemIcon-root > [viewBox="0 0 16 16"]').click({force: true});
  cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-0').click();
  cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-1').click();
  cy.get('#dviSearch').click();
  cy.get('#dvcl > .MuiListItemIcon-root > [role="img"] > path').click({force: true});
  cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').clear();
  cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').type('bREX');
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('#strains-combo-box').click();
  cy.get('#strains-combo-box-option-1').click();
  cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('#dvclSearch').click();
  cy.get('#clvi > .MuiListItemIcon-root > [role="img"]').click({force: true});
  cy.get('#strains-combo-box').clear();
  cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click({force: true});
  cy.get('#strains-combo-box').type('pa14');
  cy.get('#strains-combo-box-option-0').click();
  cy.get(':nth-child(1) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-4').click();
  cy.get(':nth-child(3) > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-0').click();
  cy.get('#clviSearch').click();
  // // /* ==== End Cypress Studio ==== */

});

it('Test PA14 Research', function() {
  cy.visit('http://localhost:3000/');
  /* ==== Generated with Cypress Studio ==== */
  cy.get('.carousel-control-next-icon').click();
  cy.get('.carousel-control-next-icon').click();
  cy.get('.carousel-control-prev-icon').click();
  cy.get('.carousel-control-prev-icon').click();
  cy.get(':nth-child(2) > .nav-link').click();
  cy.get('#asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-1').click();
  cy.get('#numResults').select('30');
  cy.get('.btn').click();
  cy.get(':nth-child(3) > :nth-child(5)').click();
  cy.get('.acrd').click();
  /* ==== Generated with Cypress Studio ==== */
  cy.get(':nth-child(2) > .card-header > .btn').click();
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[aria-label="start sortable"]').click();
  cy.get('#pageDropDown').click({force:true});
  cy.get('[style="height: 100%; width: 90%; margin-left: 5%;"]').click({force:true});
  /* ==== Generated with Cypress Studio ==== */
  cy.get(':nth-child(5) > .nav-link').click();
  cy.get(':nth-child(3) > div.col-sm-4 > :nth-child(1) > .textBox > form > .search-form > .form-group > .col > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-1').click();
  cy.get('#all').uncheck();
  cy.get('[for="3"]').click();
  cy.get('#\\33 ').check();
  cy.get('[for="8"]').click();
  cy.get('#\\38 ').check();
  cy.get('[for="5"]').click();
  cy.get('#\\35 ').check();
  cy.get(':nth-child(6) > .btn').click();
  cy.readFile('cypress/downloads/report.csv').should('exist')
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get(':nth-child(4) > .nav-link').click();
  cy.get('#asynchronous-demo').click();
  cy.get('#asynchronous-demo-option-1').click();
  cy.get('#asynchronous-demo-option-5').click();
  cy.get('#asynchronous-demo').click();
  cy.get('.css-g1d714-ValueContainer').click();
  cy.get('#react-select-3-option-2').click();
  cy.get('#react-select-3-option-7').click();
  cy.get(':nth-child(3) > .css-6q0nyr-Svg > path').click({force: true});
  cy.get('#\\31 ').check();
  cy.get('.GenerateTree').click();
  cy.get('img[src*="data:image/svg+xml;base64,"]', {timeout: 50000}).toMatchImageSnapshot({name: 'CP_MLST_tree.png'});
  /* ==== End Cypress Studio ==== */
});


beforeEach(() => {
  cy.visit('/');

  cy.get('.nav-link').contains('Settings').click();
});

describe('settings', () => {
  it('updates theme setting', () => {
    cy.contains('label', 'Theme').should('be.visible');
    cy.get('#Theme-dropdown').should('have.attr', 'aria-expanded', 'false').as('themeDropdown');

    // assert that theme is not set in local storage
    cy.getAllLocalStorage().then((storageMap) => {
      cy.wrap(Object.keys(storageMap)).should('have.length', 0);
    });

    cy.get('[aria-labelledby="Theme-dropdown"]').should('not.be.visible');

    cy.get('@themeDropdown').click();

    cy.get('@themeDropdown').should('have.attr', 'aria-expanded', 'true');
    cy.get('[aria-labelledby="Theme-dropdown"]')
      .should('be.visible')
      .within(() => {
        cy.contains('Dark').click();

        // assert that theme was stored in local storage
        cy.getAllLocalStorage().then((storageMap) => {
          expect(storageMap).to.deep.equal({
            [Cypress.config('baseUrl') || 'http://localhost:5173']: {
              'top90-theme': 'dark',
            },
          });
        });
      });
  });
});

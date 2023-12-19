describe('tabs', () => {
  it('allows tab navigation', () => {
    cy.visit('/');

    cy.get('.nav-link.active').contains('Home');
    cy.get('[aria-labelledby="home-tab"]').should('be.visible');
    cy.get('[aria-labelledby="fixtures-tab"]').should('not.be.visible');
    cy.get('[aria-labelledby="settings-tab"]').should('not.be.visible');

    cy.get('.nav-link').contains('Fixtures').click();
    cy.get('.nav-link.active').contains('Fixtures');
    cy.get('[aria-labelledby="fixtures-tab"]').should('be.visible');

    cy.get('.nav-link').contains('Settings').click();
    cy.get('.nav-link.active').contains('Settings');
    cy.get('[aria-labelledby="settings-tab"]').should('be.visible');
  });
});

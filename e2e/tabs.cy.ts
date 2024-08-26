describe('tabs', () => {
  it('allows tab navigation', () => {
    cy.visit('/');

    cy.get('.nav-link.active').contains('Home');
    cy.get('[aria-labelledby="home-tab"]').should('be.visible');
    cy.get('[aria-labelledby="fixtures-tab"]').should('not.exist');
    cy.get('[aria-labelledby="settings-tab"]').should('not.exist');

    cy.get('.nav-link').contains('Fixtures').click();
    cy.get('.nav-link.active').contains('Fixtures');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/fixtures');
    });
    cy.get('[aria-labelledby="fixtures-tab"]').should('be.visible');

    cy.get('.nav-link').contains('Settings').click();
    cy.get('.nav-link.active').contains('Settings');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/settings');
    });
    cy.get('[aria-labelledby="settings-tab"]').should('be.visible');
  });
});

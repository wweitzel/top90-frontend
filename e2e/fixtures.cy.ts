beforeEach(() => {
  cy.visit('/fixtures');
  cy.wait('@fixtures');
  cy.get('.nav-link').contains('Fixtures').click();

  cy.get('@fixtures').should('have.property', 'state', 'Complete');
});

describe('fixtures', () => {
  it('displays fixtures', () => {
    cy.get('[data-cy="fixture-group"]')
      .should('have.length', 6)
      .first()
      .within(() => {
        cy.contains('Bundesliga').should('be.visible');
        cy.get('[alt="League Logo"]').should('be.visible');
        cy.get('a')
          .should('have.attr', 'href', '/fixtures/1049002')
          .within(() => {
            cy.get('[alt="Home team logo"]').should('be.visible');
            cy.get('[alt="Away team logo"]').should('be.visible');
            cy.contains('FC Koln').should('be.visible');
            cy.contains('FSV Mainz 05').should('be.visible');
            cy.contains('Sun Dec 10 2023').should('be.visible');
          });
      });
  });

  it('shows goals for fixture', () => {
    cy.get('[data-cy="fixture-group"]').should('have.length', 6).first().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/fixtures/1049002');
    });

    cy.wait(['@goals', '@goals', '@fixture']).then((interceptions) => {
      const reqQuery = JSON.parse(interceptions[1].request.query.json as string);
      cy.wrap(reqQuery).its('filter').its('fixtureId').should('equal', 1049002);
    });

    cy.contains('Barcelona 2 - [4] Girona - Stuani 90').should('be.visible');
  });
});

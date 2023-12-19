const PAGINATION_LIMIT = 5;

beforeEach(() => {
  // keep time static so that the relative timestamps don't change
  const now = new Date(2023, 11, 12); // months are 0-indexed, so this is December 12th, 2023
  cy.clock(now);
});

describe('Goals', () => {
  it('redirects to /goals', () => {
    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/goals');
    });

    cy.get('@goals').should('have.property', 'state', 'Complete');
  });

  it('displays goals', () => {
    cy.visit('/');

    cy.wait('@goals');

    cy.get('[data-cy="goal-container"]')
      .should('have.length', PAGINATION_LIMIT)
      .first()
      .within(() => {
        cy.contains('Barcelona 2 - [4] Girona - Stuani 90').should('be.visible');
        cy.contains('1 day ago').should('be.visible');

        // copy link button
        cy.contains('Copy Link').click();

        cy.window().then((win) => {
          win.navigator.clipboard.readText().then((text) => {
            expect(text).to.eq(
              'https://api.top90.io/message_preview/a6edb899d55b41cbb538660a2f9efda7'
            );
          });
        });

        // comments link
        cy.contains('Comments')
          .should('be.visible')
          .should('have.attr', 'href', 'https://www.reddit.com/r/soccer/comments/18fejfe');
      });
  });

  it('paginates goals', () => {
    cy.visit('/');

    cy.wait('@goals').then((interception) => {
      const reqQuery: {pagination: {skip: string; limit: string}} = JSON.parse(
        interception.request.query.json as string
      );
      cy.wrap(reqQuery).its('pagination').its('skip').should('equal', 0);
      cy.wrap(reqQuery).its('pagination').its('limit').should('equal', PAGINATION_LIMIT);
    });

    cy.get('.pagination-container').scrollIntoView();

    cy.get('.page-item.active').should('contain.text', '1');

    cy.get('[aria-label="Page 2"]').click();

    // wait for the third request to "goals" after click
    cy.wait(['@goals', '@goals']).then((interceptions) => {
      const reqQuery: {pagination: {skip: string; limit: string}} = JSON.parse(
        interceptions[1].request.query.json as string
      );
      cy.wrap(reqQuery).its('pagination').its('skip').should('equal', PAGINATION_LIMIT);
      cy.wrap(reqQuery).its('pagination').its('limit').should('equal', PAGINATION_LIMIT);
    });

    cy.get('.page-item.active').should('contain.text', '2');

    cy.get('[aria-label="Next page"]').click();

    cy.wait('@goals').then((interception) => {
      const reqQuery: {pagination: {skip: string; limit: string}} = JSON.parse(
        interception.request.query.json as string
      );
      cy.wrap(reqQuery)
        .its('pagination')
        .its('skip')
        .should('equal', PAGINATION_LIMIT * 2);
      cy.wrap(reqQuery).its('pagination').its('limit').should('equal', PAGINATION_LIMIT);
    });

    cy.get('.page-item.active').should('contain.text', '3');
  });

  it('allows filtering by league', () => {
    cy.visit('/');

    cy.get('#League-dropdown').as('leagueDropdown');

    cy.get('@leagueDropdown').should('have.attr', 'aria-expanded', 'false');
    cy.get('@leagueDropdown').contains('All');

    cy.get('@leagueDropdown').click();

    cy.get('@leagueDropdown').should('have.attr', 'aria-expanded', 'true');

    cy.contains('Europa League').click();

    // wait for the third request to "goals" after click
    cy.wait(['@goals', '@goals', '@goals']).then((interceptions) => {
      const reqQuery: {leagueId: string} = JSON.parse(
        interceptions[2].request.query.json as string
      );
      cy.wrap(reqQuery).its('filter').its('leagueId').should('equal', 3);
    });
  });

  it('allows filtering by team', () => {
    cy.visit('/');

    cy.get('#Team-dropdown').as('teamsDropdown');

    cy.get('@teamsDropdown').should('have.attr', 'aria-expanded', 'false');
    cy.get('@teamsDropdown').contains('All');

    cy.get('@teamsDropdown').click();

    cy.wait('@teams');

    cy.get('@teamsDropdown').should('have.attr', 'aria-expanded', 'true');

    cy.get('.dropdown-menu.show').within(() => {
      cy.get('.dropdown-item').should('have.length', 587);
    });

    cy.contains('AEK Athens FC').click();

    // wait for the third request to "goals" after click
    cy.wait(['@goals', '@goals', '@goals']).then((interceptions) => {
      const request = interceptions[2].request;
      const parsedQuery = JSON.parse(request.query.json as string);
      cy.wrap(parsedQuery).its('filter').its('teamId').should('equal', 575);
    });

    cy.get('@teamsDropdown').contains('AEK Athens FC');
  });

  it('allows filtering by player', () => {
    cy.visit('/');

    cy.get('#Player-dropdown').as('playerDropdown');

    cy.get('@playerDropdown').should('have.attr', 'aria-expanded', 'false');
    cy.get('@playerDropdown').contains('All');

    cy.get('@playerDropdown').click();

    cy.wait('@players');

    cy.get('@playerDropdown').should('have.attr', 'aria-expanded', 'true');

    cy.get('.dropdown-menu.show').within(() => {
      cy.contains('.dropdown-item', 'R. Lewandowski').click();
    });

    // wait for the third request to "goals" after click
    cy.wait(['@goals', '@goals', '@goals']).then((interceptions) => {
      const request = interceptions[2].request;
      const parsedQuery = JSON.parse(request.query.json as string);
      cy.wrap(parsedQuery).its('filter').its('playerId').should('equal', 521);
    });
  });

  it('allows filtering by keyword', () => {
    cy.visit('/');

    cy.wait('@goals');

    cy.contains('label', 'Keyword Search').siblings().first().as('keywordSearch');

    cy.get('@keywordSearch')
      .should('have.attr', 'placeholder', 'Search anything')
      .type('team{enter}');

    cy.get('@keywordSearch').should('have.value', 'team');

    cy.wait(['@goals', '@goals']).then((interceptions) => {
      const request = interceptions[1].request;
      const parsedQuery = JSON.parse(request.query.json as string);
      cy.wrap(parsedQuery).its('filter').its('searchTerm').should('equal', 'team');
    });
  });
});

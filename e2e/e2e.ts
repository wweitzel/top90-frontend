beforeEach(() => {
  // stub API requests
  cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/teams*`, {fixture: 'teams'}).as('teams');
  cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/players*`, {fixture: 'players'}).as(
    'players'
  );
  cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/leagues*`, {fixture: 'leagues'}).as(
    'leagues'
  );
  cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/fixtures*`, {fixture: 'fixtures'}).as(
    'fixtures'
  );
  cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/goals*`, {fixture: 'goals'}).as('goals');
});

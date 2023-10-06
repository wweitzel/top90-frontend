describe('Goals', () => {
  it('redirects to /goals', () => {
    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/goals');
    });
  });
});

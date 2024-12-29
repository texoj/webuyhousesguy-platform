describe('WeBuyHousesGuy Platform', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the homepage', () => {
    cy.get('h1').should('contain', 'Get Your Cash Offer');
  });

  it('can submit the lead form', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="phone"]').type('555-555-5555');
    cy.get('input[name="address"]').type('123 Test St');
    cy.get('form').submit();
    cy.get('.success-message').should('be.visible');
  });

  it('loads city-specific pages', () => {
    cy.visit('/dallas');
    cy.get('h1').should('contain', 'Dallas');
    cy.get('.neighborhood-list').should('exist');
  });

  it('is mobile responsive', () => {
    cy.viewport('iphone-x');
    cy.get('.mobile-menu').should('be.visible');
  });
});
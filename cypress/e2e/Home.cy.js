describe('Home page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://inner-worlds.onrender.com/', {
      fixture: "userFixture"
    });
    cy.visit('http://localhost:3000/home');
  });

  it('should see a form to enter the details of their dreams', () => {
    cy.get('h2').contains('Dream Journal');
    cy.get('form').should('be.visible');
    cy.get('[type="date"]').should('be.visible');
    cy.get('[type="text"]').should('be.visible');
    cy.get('[placeholder="My Dream Title.."]').should('be.visible');
    cy.get('textarea').should('be.visible');
    cy.get('.multi-select').contains('Select Emotions..');
    cy.get('.multi-select').contains('Select Tags..');
  });

  it('should be able to select a date and type a ttile and description of the dream', () => {
    cy.get('[type="date"]').click().then((text) => {
      expect('1/7/2023')
      cy.get('[placeholder="My Dream Title.."]').type('Prince Humperdinck')
      cy.get('textarea').type('Ray has gone bye-bye')
    })

      it('should be able to select emotions and tags about the dream', () => {
      cy.get('#react-select-3-input').select('Excitement');
      cy.get('#react-select-3-input').select('Happiness');
      cy.get('#react-select-5-placeholder').select('Adventure');
      cy.get('#react-select-5-placeholder').select('Mystery');
    })
  });
});

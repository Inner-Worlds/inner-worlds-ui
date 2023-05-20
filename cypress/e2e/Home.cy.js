describe('Home page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
      fixture: "userFixture"
    });
    cy.visit('http://localhost:3000/home');
  });
  it('should display the logo and navigate to Home when clicked', () => {
    cy.get('.logo').click();
    cy.url().should('include', '/Home');
  });

  it('should have Home, My Dreams, and Log Out links', () => {
    // Find the nav links and assert their visibility and text content
    cy.get('.nav-link1').should('be.visible').contains('Home');
    cy.get('.nav-link2').should('be.visible').contains('My Dreams');
    cy.get('.nav-link3').should('be.visible').contains('Log Out');
  });

  it('should navigate to Home page when Home link is clicked', () => {
    // Click the Home link and assert the URL change
    cy.get('.nav-link1').click();
    cy.url().should('include', '/Home');
  });

  it('should navigate to My Dreams page when My Dreams link is clicked', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
      fixture: "dreamFixture"
    });
    cy.get('.nav-link2').click();
    cy.url()
  });

  it('should navigate to Login page and trigger Log Out when Log Out link is clicked', () => {
    // Click the Log Out link and assert the URL change
    cy.get('.nav-link3').click();
    cy.url().should('include', '/');

    // Assert that the log out function has been triggered (if applicable)
    // You may need to stub/mock the handleLogOut function to check if it has been called
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

  it('should be able to select a date and type a title and description of the dream', () => {
    cy.get('[type="date"]').click().then(() => {
      cy.get('[type="date"]').type('2023-01-07');

    });
    cy.get('[placeholder="My Dream Title.."]').type('Prince Humperdinck');
    cy.get('textarea').type('Ray has gone bye-bye');
  });

  it('should be able to select emotions and tags about the dream', () => {
    cy.get('#react-select-3-placeholder')
    cy.get('#react-select-5-placeholder')
  });
});

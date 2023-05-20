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
    cy.get('.nav-link1').should('be.visible').contains('Home');
    cy.get('.nav-link2').should('be.visible').contains('My Dreams');
    cy.get('.nav-link3').should('be.visible').contains('Log Out');
  });

  it('should navigate to Home page when Home link is clicked', () => {
    cy.get('.nav-link1').click();
    cy.url().should('include', '/Home');
  });

  it('should navigate to My Dreams page when My Dreams link is clicked', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
      fixture: "dreamFixture"
    });
    cy.get('.nav-link2').click();
    cy.url().should('include', '/Dreams');
  });

  it('should navigate to Login page and trigger Log Out when Log Out link is clicked', () => {
    cy.get('.nav-link3').click();
    cy.url().should('include', '/');
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

  it('should be able to select emotions and tags about the dream and the lucidity level', () => {
    cy.get(".multi-select").eq(0).click();
    cy.get(".select-styling__option").eq(0).contains('Happy').click();
    cy.get(".multi-select").eq(1).click();
    cy.get(".select-styling__option").contains('Work').click();
    cy.get('input[type="range"]').invoke("val", 4).trigger("change");
  });

  it('should be able to submit their dream', () => {
    cy.get("button[type='submit']").click();
  });

  it('should handle dream submission error', () => {
    cy.intercept('POST', '/graphql', (req) => {
      req.reply({
        statusCode: 500,
        body: {
          errors: [{ message: 'Please fill out this field' }]
        }
      });
    });
    
    cy.get('[type="date"]').click().then(() => {
      cy.get('[type="date"]');
      cy.get('[placeholder="My Dream Title.."]').type('Prince Humperdinck');
      cy.get('textarea').type('Ray has gone bye-bye');
      cy.get(".multi-select").eq(0).click();
      cy.get(".select-styling__option").eq(0).contains('Happy').click();
      cy.get(".multi-select").eq(1).click();
      cy.get(".select-styling__option").contains('Work').click();
      cy.get('input[type="range"]').invoke("val", 4).trigger("change");
      cy.get("button[type='submit']").click();
    });
  });
});

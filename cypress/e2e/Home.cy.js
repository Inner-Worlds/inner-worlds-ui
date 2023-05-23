describe('Home page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', (req) => {
      if (req.body.operationName === "defaultTags") {
        req.reply({ fixture: 'defaultTags.json' });
      } else if (req.body.operationName === "defaultEmotions") {
        req.reply({ fixture: 'defaultEmotions.json' });
      } else {
        req.continue();
      }
    });

    cy.visit('http://localhost:3000/');
    cy.get('.user1').click();
    cy.url().should('include', '/home');
  });

  it('should have a Logo, Home, My Dreams, and Log Out links', () => {
    cy.get('.nav-link1').should('be.visible').contains('Home');
    cy.get('.nav-link2').should('be.visible').contains('My Dreams');
    cy.get('.nav-link3').should('be.visible').contains('Log Out');
  });

  it('should see a form to enter the details of their dreams', () => {
    cy.get('h2').contains('Dream Journal');
    cy.get('form').should('be.visible');
    cy.get('[type="date"]').should('be.visible');
    cy.get('[type="text"]').should('be.visible');
    cy.get('[placeholder="My Dream Title.."]').should('be.visible');
    cy.get('textarea').should('be.visible');
    cy.get('.multi-select').eq(0).contains('Select Emotions..');
    cy.get('.multi-select').eq(1).contains('Select Tags..');
  });

  it('should be able to fill out and submit a form', () => {
    cy.get('[type="date"]').click().then(() => {
      cy.get('[type="date"]').type('2023-01-14');
    });

    cy.get('[placeholder="My Dream Title.."]').type('Yellin');
    cy.get('textarea').type('We have the tools, and we have the talent!');
    cy.get('.multi-select').eq(0).click();
    cy.get('.select-styling__option').contains('Happy').click();
    cy.get('.multi-select').eq(1).click();
    cy.get('.select-styling__option').contains('School').click();

    cy.get("button[type='submit']").click();
    cy.url().should('include', '/dreams');
  });

  it('should require date, title, and description fields before a user can submit', () => {
    cy.get("button[type='submit']").click()
    cy.url().should('include', '/home');
  });

  it('should navigate to a non-existent page', () => {
    cy.visit('http://localhost:3000/gibberish-nonsense');
    cy.get('.not-found-text').should('be.visible').and('contain', '404 Lost in Space');
    cy.get('.back-button').should('be.visible').and('contain', 'Please Try Again');
    cy.get('.back-button').click()

    cy.url().should('include', '/')
  });  
  
});


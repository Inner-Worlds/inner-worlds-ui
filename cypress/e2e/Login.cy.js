describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('should display the logo', () => {
    cy.get('.login-logo').should('be.visible');
  });

  it('should display User 1 and User 2 buttons', () => {
    cy.get('.user1').should('be.visible').contains('User 1');
    cy.get('.user2').should('be.visible').contains('User 2');
  });

  it('should login as User 1 when User 1 button is clicked', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', (req) => {
      if (req.body.query.includes('user')) {
        req.reply({ fixture: 'userFixture.json' });
      }
    }).as("getUser");
    
    cy.get('.user1').click();
    cy.url().should('contain', '/home');
    cy.get('.nav-link2').click();
  });

  it('should show an error message when the user query fails', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
      statusCode: 500,
      body: {
        errors: [
          {
            message: 'An error occurred',
          },
        ],
      },
    }).as('userError');

    cy.get('.user1').click();

    cy.wait('@userError').then(() => {
      cy.get('.error').should('be.visible').and('contain', 'Something went wrong, please try again.');
    });
  });
});

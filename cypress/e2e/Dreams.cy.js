describe('Dreams page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
      fixture: 'dreamFixture.json'
    });
    cy.visit('http://localhost:3000/');
    cy.get('.user1').click();
    cy.url();
    cy.get('.nav-link2').click();
    cy.url().should('include', '/dreams');
  });

  it('should show a list of the dreams', () => {
      cy.get('.dream-card').should('have.length', 5)
  });
  
  it('should show the details of each of the dreams', () => {
      cy.get('.dream-card').first().contains('1/7/2023')
      cy.get('.dream-card').first().contains('Prince Humperdinck')
      cy.get('.dream-card').first().contains('Ray has gone bye-bye, Egon...')
      cy.get('.emotions-container').first().contains('Happy')
      cy.get('.tags-container').first().contains('Work')

      cy.get('.dream-card').eq(1).contains('4/25/2023')
      cy.get('.dream-card').eq(1).contains('Miracle Max')
      cy.get('.dream-card').eq(1).contains('Do you experience feelings of dread in your basement or attic')
      cy.get('.emotions-container').eq(1).contains('Curious')
      cy.get('.tags-container').eq(1).contains('Water')
  });

  it('should show a message when a user has no dreams', () => {
      cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
        fixture: 'errorFixture.json'
      });
      cy.visit('http://localhost:3000/');
      cy.get('.user1').click();
      cy.url();
      cy.get('.nav-link2').click();
      cy.url().should('include', '/dreams');
      cy.get('.no-dreams').contains('Nothing logged, get dreamin!')
    });

  it('should give an error message when a dream fails to delete', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
        statusCode: 500,
        body: {
          errors: [
            {
              message: 'An error occurred',
            },
          ],
        },
    }).as('deleteError');

    cy.get('.delete-dream-button').first().click()

    cy.wait('@deleteError').then(() => {
      cy.get('.error').should('be.visible').and('contain', 'Error deleting dream, try again later.');
    });
  });

  it('should give an error message when a dream fails to save', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
        statusCode: 500,
        body: {
          errors: [
            {
              message: 'An error occurred',
            },
          ],
        },
    }).as('updateError');

    cy.get('.edit-dream-button').first().click()
    cy.get('.description-edit').first().type('test')
    cy.get('.save-dream-button').first().click()

    cy.wait('@updateError').then(() => {
      cy.get('.error').should('be.visible').and('contain', 'Issue saving, try again later.');
    });
  });
})
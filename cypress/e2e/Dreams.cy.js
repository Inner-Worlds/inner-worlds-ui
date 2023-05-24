describe('Dreams page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', req => {
      if (req.body.query.includes('user')) {
        req.reply({ fixture: 'userFixture.json' });
      } else if (req.body.query.includes('defaultEmotions')) {
        req.reply({ fixture: 'defaultEmotions.json' });
      } else if (req.body.query.includes('defaultTags')) {
        req.reply({ fixture: 'defaultTags.json' });
      } else if (req.body.query.includes('updateDream')) {
        req.reply({ fixture: 'updatedDream.json' });
      } else if (req.body.query.includes('deleteDreamEmotion') || (req.body.query.includes('deleteDreamTag'))) {
        req.reply({ statusCode: 200, body: { data: { test: "successful delete" } } });
      } else if (req.body.query.includes('deleteDream')) {
        req.reply({ fixture: 'deletedDream.json' });
      }
    });
    
    cy.visit('http://localhost:3000/');
    cy.get('.user1').click();
    cy.url().should('include', '/home');
    cy.get('.nav-link2').click();
    cy.url().should('include', '/dreams');
  });
  
  it('should show a list of the dreams', () => {
    cy.get('.dream-card').should('have.length', 3);
  });
  
  it('should show the details of each of the dreams', () => {
    cy.get('.dream-card').first().contains('1/4/2023');
    cy.get('.dream-card').first().contains('Vizzini');
    cy.get('.dream-card').first().contains('I collect spores, molds, and fungus.');
    cy.get('.emotions-container').first().contains('Sad');
    cy.get('.emotions-container').first().contains('Happy');
    cy.get('.tags-container').first().contains('Work');
    cy.get('.tags-container').first().contains('Flying');
  
    cy.get('.dream-card').eq(1).contains('1/14/2023');
    cy.get('.dream-card').eq(1).contains('Yellin');
    cy.get('.dream-card').eq(1).contains('We have the tools, and we have the talent!');
    cy.get('.emotions-container').eq(1).contains('Angry');
    cy.get('.emotions-container').eq(1).contains('Confused');
    cy.get('.tags-container').eq(1).contains('School');
    cy.get('.tags-container').eq(1).contains('Falling');
  });
  
  it('should show a message when a user has no dreams', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', req => {
      if (req.body.query.includes('user')) {
        req.reply({ fixture: 'errorFixture.json' });
      } else if (req.body.query.includes('defaultEmotions')) {
        req.reply({ fixture: 'defaultEmotions.json' });
      } else if (req.body.query.includes('defaultTags')) {
        req.reply({ fixture: 'defaultTags.json' });
      }
    });
    cy.visit('http://localhost:3000/');
    cy.get('.user1').click();
    cy.get('.nav-link2').click();
    cy.url().should('include', '/dreams');
    cy.get('.no-dreams').contains('Nothing logged, get dreamin!');
  });
  
  it('should be able to edit the dream and be told how to get out of edit mode', () => {
    cy.get('.dream-buttons > .edit-dream-button').eq(0).click();
    cy.get('.save-changes-msg').contains('Please save your changes to leave edit mode!');
    cy.get('.date-edit').type('2023-01-14');
    cy.get('.title-edit').type('{selectAll}{backspace}').type('Pizza');
    cy.get('.description-edit').type('{selectAll}{backspace}').type('I had the perfect pizza in a gondola while the dogs shared spaghetti');
    cy.get('.delete-button').first().click();
    cy.get('.lucidity-edit').type('{enter}{downArrow}{enter}');
    cy.get('.save-dream-button').click();
  });
  
  it('should be able to delete the dream', () => {
    cy.get('.delete-dream-button').eq(0).click();
  });
  
  it('should give a message if no dreams have been saved', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', req => {
      if (req.body.query.includes('user')) {
        req.reply({ fixture: 'errorFixture.json' });
      } else if (req.body.query.includes('defaultEmotions')) {
        req.reply({ fixture: 'defaultEmotions.json' });
      } else if (req.body.query.includes('defaultTags')) {
        req.reply({ fixture: 'defaultTags.json' });
      } else if (req.body.query.includes('updateDream')) {
        req.reply({ fixture: 'updatedDream.json' });
      } else if (req.body.query.includes('deleteDreamEmotion') || (req.body.query.includes('deleteDreamTag'))) {
        req.reply({ statusCode: 200, body: { data: { test: "successful delete" } } })
      }
    });
    cy.visit('http://localhost:3000/');
    cy.get('.user1').click();
    cy.url();
    cy.get('.nav-link2').click();
    cy.url().should('include', '/dreams');
    cy.get('.no-dreams').contains('Nothing logged, get dreamin!');
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
  
    cy.get('.delete-dream-button').first().click();
  
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
  
    cy.get('.edit-dream-button').first().click();
    cy.get('.description-edit').first().type('test');
    cy.get('.save-dream-button').first().click();
  
    cy.wait('@updateError').then(() => {
      cy.get('.error').should('be.visible').and('contain', 'Issue saving, try again later.');
    });
  });
  
  it('should give an error message when a tag or an emotion fail to delete', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
      statusCode: 500,
      body: {
        errors: [
        {
          message: 'An error occurred',
        },
        ],
      },
    }).as('deleteTagOrEmotionError');
  
    cy.get('.edit-dream-button').first().click();
    cy.get('.delete-button').first().click();
  
    cy.wait('@deleteTagOrEmotionError').then(() => {
      cy.get('.error').should('be.visible').and('contain', 'Issue deleting, try again later.');
    });
  
    cy.get('.delete-button').last().click();
  
    cy.wait('@deleteTagOrEmotionError').then(() => {
      cy.get('.error').should('be.visible').and('contain', 'Issue deleting, try again later.');
    });
  });
});
  
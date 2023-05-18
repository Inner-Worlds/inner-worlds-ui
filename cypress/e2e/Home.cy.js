import { userJSON } from "../support/dreamFixtureHelper";

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the logo', () => {
    cy.get('.login-logo').should('be.visible');
  });

  it('should display User 1 and User 2 buttons', () => {
    cy.get('.user1').should('be.visible').contains('User 1');
    cy.get('.user2').should('be.visible').contains('User 2');
  });

  it('should login as User 1 when User 1 button is clicked', () => {
    cy.intercept('POST', 'https://inner-worlds.onrender.com', (req) => {
      if (req.body.operationName.includes('getUser')) {
        req.reply(userJSON(req.body.variables.id));
      }
    }).as("getUser");
    cy.get('.user1').click().then(() => {
      cy.url().should('include', '/Home');
    });
    it('should see a form to enter the details of their dreams', () => {
      cy.get('h2').contains('Dream Journal')
      cy.get('form').should('be.visible')
      cy.get('[type="date"]').should('be.visible')
      cy.get('[type="text"]').should('be.visible')
      cy.get('[placeholder="My Dream Title.."]').should('be.visible')
      cy.get('textarea').should('be.visible')
      cy.get('.multi-select').contains('Select Emotions..')
      cy.get(':nth-child(8) > .css-13cymwt-control > .css-1hb7zxy-IndicatorsContainer > .css-1xc3v61-indicatorContainer').click()
      cy.get('#react-select-3-option-0')
      cy.get('.multi-select').contains('Select Tags..')
    })
  })


    

  })

    


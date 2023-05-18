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

  })

  });



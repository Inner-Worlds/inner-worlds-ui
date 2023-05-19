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
    cy.intercept('POST', 'https://inner-worlds.onrender.com/home', (req) => {
      if (req.body.operationName.includes('getUser')) {
        req.reply(userJSON(req.body.variables.id));
      }
    }).as("getUser");
    
    cy.get('.user1').click().then(() => {
      cy.visit('http://localhost:3000/home')
      cy.url();
    });
  });

  // it('should navigate to Home page when Home link is clicked', () => {
  //   cy.get('.nav-link1').click();
  //   cy.url();
  // });

  // it('should navigate to My Dreams page when My Dreams link is clicked', () => {
  //   cy.get('.nav-link2').click();
  //   cy.url().should('include', '/Dreams');
  // });

  // it('should log out when Log Out link is clicked', () => {
  //   cy.get('.nav-link2').click();
  });



  // it('should see a form to enter the details of their dreams', () => {
  //   cy.get('h2').contains('Dream Journal');
  //   cy.get('form').should('be.visible');
  //   cy.get('[type="date"]').should('be.visible');
  //   cy.get('[type="text"]').should('be.visible');
  //   cy.get('[placeholder="My Dream Title.."]').should('be.visible');
  //   cy.get('textarea').should('be.visible');
  //   cy.get('.multi-select').contains('Select Emotions..');
  //   cy.get(':nth-child(8) > .css-13cymwt-control > .css-1hb7zxy-IndicatorsContainer > .css-1xc3v61-indicatorContainer').click();
  //   cy.get('#react-select-3-option-0');
  //   cy.get('.multi-select').contains('Select Tags..');
  // });

  // it('should be able to fill out the form', () => {
  //   cy.intercept('POST', 'https://inner-worlds.onrender.com', (req) => {
  //     cy.visit('http://localhost:3000/');
  //   });
  //   cy.get('[type="date"]').select('5/10/2023');
  // })
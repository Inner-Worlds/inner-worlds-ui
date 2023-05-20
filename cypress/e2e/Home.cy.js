describe('Home page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
      fixture: 'userFixture.json' 
    });
    cy.visit('http://localhost:3000/');
    cy.get('.user1').click();
    cy.url();
  });

  it('should display the logo and navigate to Home when clicked', () => {
    cy.get('.logo').click();
    cy.url().should('include', '/home');
  });

  it('should have Home, My Dreams, and Log Out links', () => {
    cy.get('.nav-link1').should('be.visible').contains('Home');
    cy.get('.nav-link2').should('be.visible').contains('My Dreams');
    cy.get('.nav-link3').should('be.visible').contains('Log Out');
  });

  it('should navigate to Home page when Home link is clicked', () => {
    cy.get('.nav-link1').click();
    cy.url().should('include', '/home');
  });

  it('should navigate to My Dreams page when My Dreams link is clicked', () => {
    cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql');
    cy.get('.nav-link2').click();
    cy.url().should('include', '/dreams');
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
    cy.get('.multi-select').eq(0).contains('Select Emotions..');
    cy.get('.multi-select').eq(1).contains('Select Tags..');
  });
  
  // it('should handle dream submission error', () => {
  //   cy.intercept('POST', '/graphql', (req) => {
  //     req.reply({
  //       statusCode: 500,
  //       body: {
  //         errors: [{ message: 'Please fill out this field' }]
  //       }
  //     });
  //   });
    
  //   cy.get('[placeholder="My Dream Title.."]').type('Vizzini');
  //   cy.get('textarea').type('I collect spores, molds, and fungus.');
  //   cy.get(".multi-select").eq(0).click();
  //   cy.get("#react-select-3-option-0").eq(0).select('Sad').click();
  //   cy.get(".select-styling__option").eq(1).select('Happy').click();
  //   cy.get(".multi-select").eq(1).click();
  //   cy.get(".select-styling__option").eq(0).select('Flying').click();
  //   cy.get(".select-styling__option").eq(1).select('Work').click();
  //   cy.get('input[type="range"]').invoke("val", 2).trigger("change");
  //   cy.get("button[type='submit']").click();
  // });

  it('should be able to select a date and type a title and description of the dream', () => {
    cy.get('[type="date"]').click().then(() => {
      cy.get('[type="date"]').type('2023-01-14');
    });
    cy.get('[placeholder="My Dream Title.."]').type('Yellin');
    cy.get('textarea').type('We have the tools, and we have the talent!');
  });

  it('should be able to select emotions and tags about the dream and the lucidity level', () => {
    cy.get(".multi-select").click();
    cy.get(".select-styling__option").select('Angry').click();
    cy.get(".select-styling__option").select('Confused').click();
    cy.get(".multi-select").click();
    cy.get(".select-styling__option").select('School').click();
    cy.get(".select-styling__option").select('Falling').click();
    cy.get('input[type="range"]').invoke("val", 4).trigger("change");
  });

  it('should be able to submit their dream', () => {
    cy.get("button[type='submit']").click();
  });
});

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

    it('should be able to edit the dream and be told how to get out of edit mode', () => {
        cy.get('.dream-buttons > .edit-dream-button').eq(0).click();
        cy.get('.save-changes-msg').contains('Please save your changes to leave edit mode!')
        cy.get('.date-edit').type('2023-01-14')
        

    })
    // it('should give a message if no dreams have been saved', () => {
    //     cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', {
    //       fixture: 'errorFixture.json'
    //     });
    //     cy.visit('http://localhost:3000/');
    //     cy.get('.user1').click();
    //     cy.url();
    //     cy.get('.nav-link2').click();
    //     cy.url().should('include', '/dreams');
    //     cy.get('.no-dreams').contains('Nothing logged, get dreamin!')
    //   });

})
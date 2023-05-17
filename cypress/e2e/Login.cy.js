describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should display the Inner Worlds and Dream Journal logos', () => {
    cy.get('[alt="Inner Worlds"]').should('have.attr', 'src')
    cy.get('[alt="Dream Journal"]').should('have.attr', 'src')
   
  })
    
  it('should display 2 users', () => {
    cy.get('[alt="orange saturn"]').should('have.attr', 'src')
    cy.get('p').contains('User 1')
    cy.get('[alt="teal saturn"]').should('have.attr', 'src')
    cy.get('p').contains('User 2')
    })
  })
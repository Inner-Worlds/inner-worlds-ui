describe('Login', () => {
  beforeEach(() => {
    cy.intercept('https://inner-worlds.onrender.com/')
    cy.visit('/')
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
    
    it('should link to the Login page when a user is clicked', () => {
      cy.intercept('POST', 'https://inner-worlds.onrender.com', (req) => {
        if(req.body.operationName.includes('user')) {
          req.reply(constructJSON(req.body.variables.user))
        }}).as("user");
      })
    })
      
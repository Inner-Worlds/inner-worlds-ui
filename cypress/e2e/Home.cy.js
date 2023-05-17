describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.user1').click()
    cy.visit('http://localhost:3000/Home')
  })

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
  it('should be able to fill out the form', () => {
  })
})
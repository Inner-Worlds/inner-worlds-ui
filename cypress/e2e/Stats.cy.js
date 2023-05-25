describe('Dreams page', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://inner-worlds-graphql-api.onrender.com/graphql', req => {
            if (req.body.query.includes('user') && !req.body.query.includes('stats')) {
                req.reply({ fixture: 'userFixture.json' });
            } else if (req.body.query.includes('defaultEmotions')) {
                req.reply({ fixture: 'defaultEmotions.json' });
            } else if (req.body.query.includes('defaultTags')) {
                req.reply({ fixture: 'defaultTags.json' }); 
            } else if(req.body.query.includes('stats')){
                req.reply({ fixture: 'statsFixture.json'})
            }
        })
        cy.visit('http://localhost:3000/');
        cy.get('.user1').click();
        cy.get('.nav-link4').click();
        cy.url().should('include', '/stats');
    })
    it('should show the stats of the dream', () => {
        cy.get('.list-head').contains('Dream Stats')
        cy.get('.number-title').contains('Longest Streak')
        cy.get('.number-value').contains('0')
        cy.get('.number-title').contains('Longest Streak')
        cy.get('.number-value').contains('3')
        cy.get('.number-title').contains('Dreams This Month')
        cy.get('.number-value').contains('8')
        cy.get('.number-title').contains('Total Dreams:')
        cy.get('.number-value').contains('8')
        cy.get('.number-title').contains('Average Lucidity:')
        cy.get('.number-value').contains('3.57')
    })
    it('should show a graph of the top 5 emotions and tags', () => {
        cy.get('.chart-container > :nth-child(1)').contains('Top 5 Emotions')
        cy.get('.chart-container > :nth-child(1)').as('Excited')
        cy.get('.chart-container > :nth-child(1)').as('Angry')
        cy.get('.chart-container > :nth-child(1)').as('Confused')
        cy.get('.chart-container > :nth-child(1)').as('Happy')
        cy.get('.chart-container > :nth-child(1)').as('Sad')

        cy.get('.chart-container > :nth-child(2)').contains('Top 5 Tags')
        cy.get('.chart-container > :nth-child(2)').as('future')
        cy.get('.chart-container > :nth-child(2)').as('human')
        cy.get('.chart-container > :nth-child(2)').as('Nature')
        cy.get('.chart-container > :nth-child(2)').as('strange place')
        cy.get('.chart-container > :nth-child(2)').as('other')
    })
})
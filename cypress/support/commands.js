const baseUrl = 'http://localhost:3001/api'

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', `${baseUrl}/testing/reset`)
})

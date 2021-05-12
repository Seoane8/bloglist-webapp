const baseUrl = 'http://localhost:3001/api'

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', `${baseUrl}/testing/reset`)
})

Cypress.Commands.add('addUser', (userInfo) => {
  cy.request('POST', `${baseUrl}/users`, userInfo)
})

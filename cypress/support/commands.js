const baseUrl = 'http://localhost:3001/api'

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', `${baseUrl}/testing/reset`)
})

Cypress.Commands.add('addUser', (userInfo) => {
  cy.request('POST', `${baseUrl}/users`, userInfo)
})

Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', 'http://localhost:3001/api/login', credentials)
    .then(response => {
      const { token, user } = response.body
      const { username, name } = user

      localStorage.setItem(
        'loggedBloglistAppUser',
        JSON.stringify({ token, username, name })
      )

      cy.visit('http://localhost:3000')
    })
})

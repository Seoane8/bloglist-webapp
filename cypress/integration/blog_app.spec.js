describe('Blog app', () => {
  beforeEach(() => {
    cy.resetDB()
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.get('[placeholder="username"]')
    cy.get('[placeholder="password"]')
    cy.contains('Login')
  })
})

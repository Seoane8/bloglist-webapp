const userInfo = {
  name: 'John Doe',
  username: 'JDoe',
  password: 'pswd'
}

describe('Blog app', () => {
  beforeEach(() => {
    cy.resetDB()
    cy.addUser(userInfo)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.get('[placeholder="username"]')
    cy.get('[placeholder="password"]')
    cy.contains('Login')
  })

  describe('Login', () => {
    it('success with correct credentials', () => {
      cy.get('[placeholder="username"]').type(userInfo.username)
      cy.get('[placeholder="password"]').type(userInfo.password)
      cy.get('form').contains('Login').click()
      cy.contains(`Logged by ${userInfo.username}`)
    })

    it('fails with wrong credentials', () => {
      cy.get('[placeholder="username"]').type('username')
      cy.get('[placeholder="password"]').type('password')
      cy.get('form').contains('Login').click()
      cy.contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})

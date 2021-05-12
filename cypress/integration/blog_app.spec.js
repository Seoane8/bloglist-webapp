const userInfo = {
  name: 'John Doe',
  username: 'JDoe',
  password: 'pswd'
}

const blogInfo = {
  title: 'Great blog',
  author: 'Jeanette',
  url: 'https://www.greatblog.com'
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

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({
        username: userInfo.username,
        password: userInfo.password
      })
    })

    it('A blog can be created', () => {
      cy.contains('Create new blog').click()
      cy.get('[placeholder="title"]').type(blogInfo.title)
      cy.get('[placeholder="author"]').type(blogInfo.author)
      cy.get('[placeholder="url"]').type(blogInfo.url)
      cy.contains('Add blog').click()

      cy.contains(`${blogInfo.title} by ${blogInfo.author}`)
      cy.contains('Blog created succesfully')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })
})

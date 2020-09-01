Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes},
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
})

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  const user = {
    name: 'Tester',
    username: 'testUser',
    password: 'password'
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.visit('http://localhost:3000')
})

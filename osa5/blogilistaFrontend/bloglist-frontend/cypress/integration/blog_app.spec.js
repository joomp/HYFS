describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'testUser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is vissible', function() {
    cy.get('#loginForm').should('be.visible')
  })

  describe('Login',function() {
    beforeEach(function() {
      cy.resetDB()
    })
    it('succeeds with correct credentials', function() {
      cy.get('#loginForm').get('input:first').type('testUser')
      cy.get('input:last').type('password')
      cy.get('button').contains('Log in').click()
      cy.get('.notification').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.get('#loginForm').get('input:first').type('wrongusername')
      cy.get('input:last').type('Wrongpassword')
      cy.get('button').contains('Log in').click()
      cy.get('.error').should('be.visible').should('have.css', 'background-color',
        'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.resetDB()
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'testUser', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    it('a new blog can be added', function() {
      cy.contains('Add a blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('www.url.com')
      cy.get('form div button').click()
      cy.get('.notification').should('be.visible')
    })
    it('A blog can be liked', function() {
      cy.createBlog({
        title:'Title',
        author: 'Author',
        url: 'www.url.com'
      })
      cy.visit('http://localhost:3000')
      cy.contains('Title - Author').click()
      cy.get('.additionalInformation ul li button').click()
      cy.contains('likes: 1')
    })
    it('A blog can be removed by its adder', async function() {
      cy.createBlog({
        title:'Title',
        author: 'Author',
        url: 'www.url.com'
      })
      cy.visit('http://localhost:3000')
      cy.contains('Title - Author').click()
      cy.get('.additionalInformation > button').click()
      cy.get('.blogTitle').should('not.exist')
    })
    it('A blogs are ordered by likes', async function() {
      let i = 0
      const likesArr = [3, 5, 6, 0, 4, 66, 46, 49, 65, 0]
      const sortedLikesArr = [...likesArr].sort(function(a, b){return -a+b})
      for (const likes of likesArr){
        i++
        cy.createBlog({
          title:`Title${i}`,
          author: `Author${i}`,
          url: `www.url${i}.com`,
          likes
        })
      }
      cy.visit('http://localhost:3000')
      for (let i = 1; i <= likesArr.length; i++){
        cy.contains(`Title${i} - Author${i}`).click()
      }
      cy.get('.blog').each(function(el, i){
        expect(el).to.contain(sortedLikesArr[i])
      })
    })
  })
})
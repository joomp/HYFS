const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
describe('Blog API', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Blog has id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(element => {
      expect(element.id).toBeDefined()
    })
  })

  test('Blog was added succesfully', async () => {
    newBlog = new Blog({
      title: "Uusi Blogi",
      author: "New author",
      url: "uusiblogi.fi",
      likes: 0,
    })
    const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDatabase()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogs.map(n => {
        return {
          author: n.author,
          title: n.title,
          url: n.url,
          likes: n.likes
        }
    })
    expect(contents).toContainEqual(
      {
        title: "Uusi Blogi",
        author: "New author",
        url: "uusiblogi.fi",
        likes: 0
      }
    )
  })

  test('Likes have default value of 0', async () => {
    newBlog = new Blog({
      title: "Uusi Blogi",
      author: "New author",
      url: "uusiblogi.fi"
    })
    const response = await api.post('/api/blogs').send(newBlog).expect(201)
    const blogs = await helper.blogsInDatabase()

    const contents = blogs.map(n => {
        return {
          author: n.author,
          title: n.title,
          url: n.url,
          likes: n.likes
        }
    })
    expect(contents).toContainEqual(
      {
        title: "Uusi Blogi",
        author: "New author",
        url: "uusiblogi.fi",
        likes: 0
      }
    )
  })

  describe('The blogs must have title, author and url values', () => {
    const newBlog = {
      title: "Uusi Blogi",
      author: "New author",
      url: "uusiblogi.fi",
      likes: 54
    }
    test('Must have title', async () => {
      expect( async () => await api.post('/api/blogs').send({...newBlog, title: undefined}).expect(400))
    })
    test('Must have author', async () => {
      expect ( async () => await api.post('/api/blogs').send({...newBlog, author: undefined}).expect(400))
    })
    test('Must have url', async () => {
      expect ( async () => await api.post('/api/blogs').send({...newBlog, url: undefined}).expect(400))
    })
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

afterAll(() => {
  mongoose.connection.close()
})
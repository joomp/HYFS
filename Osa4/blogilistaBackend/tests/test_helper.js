const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "TestiBlogi",
    author: "T. Testaaja",
    url: "testiblogi.com",
    likes: 555,
  },
  {
    title: "Testauksen salat",
    author: "Testailija",
    url: "testauksensalat.fi",
    likes: 13,
  },
  {
    title: "Best test",
    author: "Beth Test",
    url: "bt.com",
    likes: 1201,
  }
]

const blogsInDatabase = async () => {
  const req = await Blog.find({})
  return req.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDatabase
}
const Blog = require('../models/blog')
const User = require("../models/user")
const bcrypt = require('bcrypt')

const initialUserPassword = 'Password'

const initialUser = async () => {
  return {
    passwordHash: await bcrypt.hash(initialUserPassword, 10),
    name: 'test user name',
    username: 'root'
  }
}

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  blogsInDatabase,
  usersInDb
}
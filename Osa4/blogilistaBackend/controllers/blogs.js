const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blogs => blogs.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const token = request.token
  let decodedToken 
  if (token){
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({...request.body, user: user._id})
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(id)
  if (blog.user.toString() !== decodedToken.id)
    return response.status(401).json({ error: 'only owner of a blog is allowed to remove it' })
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    .then(updated => {
      response.json(updated)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
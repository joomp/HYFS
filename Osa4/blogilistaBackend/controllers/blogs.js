const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blogs => blogs.toJSON()))
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  await Blog.findByIdAndRemove(id)
  .then(() => {
    res.status(204).end()
  })
  .catch(error => next(error))
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
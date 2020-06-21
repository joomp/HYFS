const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  const passwordMinLength = 3
  if (!body.password){
    return  response.status(400).json({ error: 'Path `password` is required' })
  } else if (body.password.length < passwordMinLength){
    return response.status(400).json({ error: `password is shorter than the minimum allowed length (${passwordMinLength}).` })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1})
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
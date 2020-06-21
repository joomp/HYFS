const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('creating a new user when there is already one user at db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('test', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'Testi',
      name: 'Test test',
      password: 'password',
    }
    const usersAtStart = await helper.usersInDb()
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and error message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  describe('creation fails if minium lengths are not satisfied', () => {
    test('creation fails with proper statuscode and error message if username is too short', async () => {
      const newUser = {
        username: 'a',
        name: 'asd',
        password: 'salainen',
      }

      result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('Path `username`')
      expect(result.body.error).toContain('is shorter than the minimum allowed length')
    })
    test('creation fails with proper statuscode and error message if password is too short', async () => {
      const newUser = {
        username: 'asd',
        name: 'asd',
        password: 'a',
      }

      result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password is shorter than the minimum allowed length')
    })
  })

  describe('creation fails with proper error message and status code if required fields are not defined', () => {
    test('username is required', async () => {
      const newUser = {
        name: 'asd',
        password: 'salainensalasana',
      }

      result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('User validation failed: username: Path `username` is required')
    })
    test('password is required', async () => {
      const newUser = {
        username: 'asd',
        name: 'asd'
      }

      result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('Path `password` is required')
    })
  })
})

afterAll(() => {
    mongoose.connection.close()
})
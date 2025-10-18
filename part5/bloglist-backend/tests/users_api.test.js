const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')

const helper = require('../utils/test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

// ================================================================
describe('when there is initially one user in db', () => {
  // ========================================================================================
  // before each test delete all users and create one user
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  // ========================================================================================

  // ========================================================================================
  // test creation fails if username or password is missing or too short
  test('creation fails if username or password is missing or too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUsers = [
      { username: 'ab', name: 'Short Username', password: '12345' },
      { username: 'validUser', name: 'Short Password', password: '12' },
      { name: 'No Username', password: '12345' },
      { username: 'NoPassword', name: 'User Without Password' }
    ]

    for (const user of invalidUsers) {
      const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(
        result.body.error.includes('at least') ||
        result.body.error.includes('missing') ||
        result.body.error.includes('unique')
      )
    }

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  // ========================================================================================


  // ========================================================================================
  // test creation succeeds with a fresh username
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mostafa',
      name: 'Mostafa Dev',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  // ========================================================================================



  // ========================================================================================
  // test creation fails with proper statuscode and message if username already token
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: '12345',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('expected `username` to be unique'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  // ========================================================================================

  // ========================================================================================
  // test creation fails if password if missing or too short
  test('creation fails if password is missing or too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUsers = [
      { username: 'noPassword', name: 'Test User' },
      { username: 'shortPwd', name: 'Test User', password: '12' },
    ]

    for (const user of invalidUsers) {
      const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)

      assert(result.body.error.includes('password must be at least'))
    }

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  // ========================================================================================
})







// ================================================================
after(async () => {
  await mongoose.connection.close()
})
// ================================================================

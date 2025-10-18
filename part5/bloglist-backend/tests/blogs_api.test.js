const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')

const api = supertest(app)

describe('Blogs API with users and authentication', () => {
  let userToken
  let userId
  // ========================================================================================
  // Before each test reset DB and create a test user and login to get token
  beforeEach(async () => {
    // Reset DB
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create a test user and save it in savedUser
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'mostafa', name: 'Mostafa Test', passwordHash })
    const savedUser = await user.save()
    userId = savedUser.id

    // Login to get token and save it in userToken
    const loginResponse = await api.post('/api/login').send({ username: 'mostafa', password: 'sekret' })
    userToken = loginResponse.body.token
    console.log('User Token : ' + userToken)
    // Add initial blogs with this user and save it in blogsWithUser
    const blogsWithUser = helper.initialBlogs.map(blog => ({ ...blog,user: userId }))
    await Blog.insertMany(blogsWithUser)
  })
  // ========================================================================================

  // ========================================================================================
  //  GET blogs list as JSON
  test('blogs are returned as JSON', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })
  // ========================================================================================

  // ========================================================================================
  //  GET all blogs
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
  // ========================================================================================


  // ========================================================================================
  //  GET unique identifier property is named id
  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
  // ========================================================================================

  // ========================================================================================
  //  POST adding new blog testing with valid data and token
  describe('Adding a new blog', () => {
    // test adding new blog with valid data and token
    test('succeeds with valid data and token', async () => {
      const newBlog = {
        title: 'Async/Await Testing',
        author: 'Mostafa Bamoos',
        url: 'https://mostafa.dev/blog',
        likes: 10 ,
        user: userId
      }

      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert.ok(titles.includes('Async/Await Testing'))
    })
    // test defaults like to 0 if missing
    test('defaults likes to 0 if missing', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'Mostafa Bamoos',
        url: 'https://nolikes.com',
        user: userId
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newBlog)
        .expect(201)

      assert.strictEqual(response.body.likes, 0)
    })
    // test fails with status 400 if title or url missing
    test('fails with status 400 if title or url missing', async () => {
      const invalidBlogs = [
        { author: 'No Title', url: 'https://test.com' },
        { title: 'No Url', author: 'Tester' }
      ]

      for (const blog of invalidBlogs) {
        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${userToken}`)
          .send(blog)
          .expect(400)
      }

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })
  // ========================================================================================

  // ========================================================================================
  // test delete blog by owner , mean just user added this blog can delete it
  test('a blog can be deleted by its owner', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  })
  // ========================================================================================

  // ========================================================================================
  // test delete blog by another user, mean user added not this blog can't delete it
  test('a blog cannot be deleted by another user', async () => {
    // Create another user
    const anotherUser = new User({ username: 'other', passwordHash: await bcrypt.hash('pass', 10) })
    await anotherUser.save()

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'other', password: 'pass' })
    const otherToken = loginResponse.body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(403)
  })
  // ========================================================================================

  // ========================================================================================
  // test update blog by owner, mean user added this blog can update it
  test('a blog can be updated by its owner', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = { ...blogToUpdate, likes: blogToUpdate.likes + 5 }

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, blogToUpdate.likes + 5)
  })
  // ========================================================================================
})
// ========================================================================================

after(async () => {
  await mongoose.connection.close()
})

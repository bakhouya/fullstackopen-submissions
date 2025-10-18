const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
// for handle route protected by userExtractor middleware
const { userExtractor } = require('../utils/middleware')

// ================================================================
//  Get all users from database
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  // populate for get all data blogs of any user
  response.json(users)
})
// ================================================================

// ================================================================
// POST (Create new user)
// validate password and username if not valid return status 400 and error message
// validate unique username if not valid return status 400 and error message
// hash password before saved in database using bcrypt
// create new user and return status 201 and the new user
usersRouter.post('/', async (request, response, next) => {
  try {

    const { username, name, password } = request.body

    // validate length password if not valid return status 400 and error message
    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long'
      })
    }

    // validate length username if not valid return status 400 and error message
    if (!username || username.length < 3) {
      return response.status(400).json({
        error: 'username must be at least 3 characters long'
      })
    }

    // validate unique username if not valid return status 400 and error message
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({
        error: 'expected `username` to be unique'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

  } catch (error) {next(error)}
})
// ================================================================


// ================================================================
// GET user by ID
// find user by id and return status 200 and the user
// if user not found return status 404 and empty message handled in next middleware
usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate('blogs')
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  }catch (error) {next(error)}
})
// ================================================================



// ================================================================
// PUT (Update user data)
usersRouter.put('/:id', userExtractor, async (request, response, next) => {
  try {
    const userIdToUpdate = request.params.id
    const authenticatedUser = request.user

    if (!authenticatedUser || authenticatedUser.id.toString() !== userIdToUpdate.toString()) {
      return response.status(403).json({ error: 'Sorry you can\'t update this user' })
    }

    const { name, password } = request.body
    let updateFields = { name }

    if (password) {
      if (password.length < 3) {
        return response.status(400).json({ error: 'new password must be at least 3 characters long' })
      }
      const saltRounds = 10
      updateFields.passwordHash = await bcrypt.hash(password, saltRounds)
    }

    if (request.body.username && request.body.username !== authenticatedUser.username) {
      return response.status(400).json({ error: 'Changing the username is not allowed on this route.' })
    }

    const updatedUser = await User.findByIdAndUpdate(
      userIdToUpdate,
      updateFields,
      { new: true, runValidators: true, context: 'query' }
    ).populate('blogs')

    if (updatedUser) {
      response.json(updatedUser)
    } else {
      response.status(404).json({ error: 'User not found' })
    }

  } catch (error) {next(error)}
})
// ================================================================



module.exports = usersRouter
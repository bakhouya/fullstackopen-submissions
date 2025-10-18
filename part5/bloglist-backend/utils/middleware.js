// =================================================================
const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')
// =================================================================

// =================================================================
// Log request details
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
// =================================================================


// =================================================================
// Send 404 if endpoint not found
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// =================================================================

// =================================================================
//  handle errors and send appropriate response
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}
// =================================================================

// =================================================================
//  Extract token from request header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}
// =================================================================

// =================================================================
//  Extract user from token
const userExtractor = async (request, response, next) => {
  const token = request.token

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (decodedToken.id) {
        request.user = await User.findById(decodedToken.id)
      }
    } catch (error) {
      console.error('Token verification failed:', error.message)
      return response.status(401).json({ error: 'token invalid' })
    }
  } else {
    request.user = null
  }

  next()
}
// =================================================================


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
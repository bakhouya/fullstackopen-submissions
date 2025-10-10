const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

const app = express()
// =================================================================
// connections database
info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {
  info('connected to MongoDB')
}).catch((er) => {
  error('error connection to MongoDB:', er.message)
})
// =================================================================

// =================================================================
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
// =============================routers====================================
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
// =============================routers====================================

// =============================middleware====================================
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
// =============================middleware====================================

module.exports = app

express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')

const middleware = require('./utils/middleware')

const app = express()
const path = require('path')
app.use(cors());
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
app.use('/api/blogs', commentsRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// =============================routers====================================

// =============================middleware====================================
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
// =============================middleware====================================

module.exports = app
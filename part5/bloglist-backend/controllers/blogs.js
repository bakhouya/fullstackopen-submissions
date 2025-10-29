const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const multer = require('multer')
const path = require('path')
const { userExtractor } = require('../utils/middleware')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
})
const upload = multer({ storage })


// =================================================================
// GET all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  // populate for get data user forany blog
  response.json(blogs)
})
// =================================================================

// =================================================================
// GET item blog by ID if not found return status 404
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user').populate('comments')
    // populate for get data user for this blog
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  }catch (error) {next(error)}
})
// =================================================================

// =================================================================
// POST new blog if title or url is missing return status 400
// else create new blog and return status 201 and the new blog
// if likes is missing set it to 0
// add try / cache to handle errors
blogsRouter.post('/', upload.single('image'), userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    if (!request.body.title || !request.body.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
        title: request.body.title,
        description: request.body.description,
        image: request.file ? `/uploads/${request.file.filename}` : null,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

  }catch (error) {next(error)}
})
// =================================================================

// =================================================================
//  DELETE blog by ID if not found return status 404
blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {

    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'permission denied: not the owner' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch (error) {next(error)}
})

// =================================================================

// =================================================================
//  PUT blog by ID if not found return status 404
//  else update blog and return status 200 and the update blog
//  runValidators: true to validate the update blog
// speed up the update process by setting new: true
blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true }
    )

    if (updatedBlog) {
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {next(error)}
})
// =================================================================

module.exports = blogsRouter
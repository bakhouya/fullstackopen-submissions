const express = require('express')
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

const commentsRouter = express.Router()

// =======================================================================

commentsRouter.post('/:id/comments', userExtractor, async (req, res) => {
  try {
    const { content } = req.body
    const blogId = req.params.id

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Comment content is required' })
    }
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    const comment = new Comment({
      content,
      blog: blog._id,
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    res.status(201).json(savedComment)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})
// =======================================================================

commentsRouter.get('/:id/comments', async (req, res) => {
  try {
    const blogId = req.params.id
    const comments = await Comment.find({ blog: blogId })
        .populate('user', { username: 1, name: 1 })
        .sort({ createdAt: -1 })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' })
  }
})

module.exports = commentsRouter

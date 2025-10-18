const Blog = require('../models/blog')
const User = require('../models/user')

// ========================================================================================
const initialBlogs = [
  {
    title: 'First blog',
    author: 'Mostafa',
    url: 'https://example.com/first',
    likes: 5,
    user: '68e81508ea72709a884fda75',
  },
  {
    title: 'Second blog',
    author: 'John Doe',
    url: 'https://example.com/second',
    likes: 10,
    user: '68e81508ea72709a884fda75',
  },
]
// ========================================================================================


// ========================================================================================
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
// ========================================================================================

// ========================================================================================
const nonExistingId = async () => {
  const blog = new Blog({ title: 'temp', author: 'temp', url: 'temp.com' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}
// ========================================================================================


// ========================================================================================
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
// ========================================================================================


// ========================================================================================
module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,

  usersInDb,
}

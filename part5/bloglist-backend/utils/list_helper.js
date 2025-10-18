// =================================================================
const dummy = (blogs) => {
  console.log(blogs)
  return 1
}
// =================================================================

// =================================================================
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
// =================================================================

// =================================================================
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((fav, blog) =>
    blog.likes > fav.likes ? blog : fav
  )
}
// =================================================================

// =================================================================
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const counts = {}
  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })

  const topAuthor = Object.entries(counts).reduce((a, b) => b[1] > a[1] ? b : a)
  return { author: topAuthor[0], blogs: topAuthor[1] }
}
// =================================================================

// =================================================================
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesByAuthor = {}
  blogs.forEach(blog => {
    likesByAuthor[blog.author] = (likesByAuthor[blog.author] || 0) + blog.likes
  })

  const top = Object.entries(likesByAuthor).reduce((a, b) => b[1] > a[1] ? b : a)
  return { author: top[0], likes: top[1] }
}
// =================================================================

// =================================================================
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
// =================================================================

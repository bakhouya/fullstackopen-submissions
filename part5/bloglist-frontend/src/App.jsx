import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/login'
import CreateForm from './components/create'
import Alert from './components/alert'
import Togglable from './components/Togglable'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // State : from nitifications meesages when succsess or error operations
  const [notification, setNotification] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
      // loginService.verifyToken(user.token).then(res => {
      //     if (res.valid) {
      //       setUser(user)
      //       blogService.setToken(user.token)
      //       blogService.getAll().then(blogs => setBlogs(blogs))
      //     } else {
      //       handleLogout()
      //     }
      //   }).catch(() => handleLogout())
    }
  }, [])


  const handleLogin = async (loginData) => {

    const user = await loginService.login(loginData)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    const blogs = await blogService.getAll()
    setBlogs(blogs)

  }
  const handleCreate = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    const blogWithUser = { ...newBlog, user: { username: user.username, name: user.name, id: user.id } }
    setBlogs(blogs.concat(blogWithUser))
    showNotification(`A new blog "${newBlog.title}" added`, 'success')
    blogFormRef.current.toggleVisibility()
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    showNotification('Session expired, please log in again.', 'error')
  }
  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1, user: typeof blog.user === 'object' ? blog.user.id : blog.user }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      const blogWithUser = { ...returnedBlog, user: blog.user }
      setBlogs(blogs.map(b => b.id === blog.id ? blogWithUser : b))
      showNotification('liked successfully', 'success')
    } catch {
      showNotification('somthing worning', 'error')
    }
  }
  const handleDelete = async (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  // ================================================================================
  //  handle show notification message
  const showNotification = (message, type) => {
    const id = Date.now()
    setNotification({ id, message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }
  // ================================================================================









  if (user === null) {
    return <LoginForm onLogin={handleLogin}  />
  }
  return (

    <div>

      <div className="header_app">
        <h1 className="title_page">Blogs</h1>
        <div className="actions_app">
          <p>{user.name}: <button onClick={handleLogout}>Logout</button></p>
        </div>
      </div>

      <div className="container_app">
        <div className="">
          {notification && <Alert message={notification.message} type={notification.type} />}

          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <CreateForm createBlog={handleCreate}/>
          </Togglable>

          <div className="wrapper_blogs">
            {[...blogs].sort((a, b) => b.likes - a.likes).map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                onLike={handleLike}
                onDelete={handleDelete}
                user={user}
              />
            ))
            }
          </div>

        </div>
      </div>

    </div>

  )


}

export default App
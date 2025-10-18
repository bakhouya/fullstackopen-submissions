// ==================================================================================
// import models and component and logic for app
// ==================================================================================
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/login'
import CreateForm from './components/create'
import Alert from './components/alert'
import Togglable from './components/Togglable'
import RegisterForm from './components/Register'
import playClickSound from './utils/sonClick'
import Hero from './components/Hero'

// ==================================================================================


// ==================================================================================
// render or return app component 
// ==================================================================================
const App = () => {
  const blogFormRef = useRef()
  // State: blogs to gived all blogs item 
  const [blogs, setBlogs] = useState([])
  // State: user to gived data and token when user logeed the systeme
  const [user, setUser] = useState(null)
  // State: notification gived data | success or error
  const [notification, setNotification] = useState([])
  // State: if user want register gived true if not gived false
  const [register, setRegister] = useState(false) 
  const [search, setSearch] = useState("") 

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

  // ==================================================================================
  // handle register user to the blog 
  // call function register from services loginService path ./services/login => register
  // send data user in registerData object to register services
  const handleRegister = async (registerData) => {
    const register = await loginService.register(registerData)
    if(register){console.log('register successfuly')}
  }
  // ==================================================================================

  // ==================================================================================
  // handle login user to the blog 
  // // call function login from services loginService path ./services/login => login
  // if login successfully I saved data user in the localStorage 
  // send token to services setToken path ./services/blog => setToken and gived to state user
  // get all blogs from blogService path ./services/blog => getAll and gived to to state blogs 
  const handleLogin = async (loginData) => {
    const user = await loginService.login(loginData)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  // ==================================================================================
  // ==================================================================================
  // handle create new blog
  // send data blogObject to the BlogService create ./services/blog => create
  // gived data user has logged to response data 
  // add new data blog with data user added to the state blogs
  // hide the model form blog
  const handleCreate = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    const blogWithUser = { ...newBlog, user: { username: user.username, name: user.name, id: user.id } }
    setBlogs(blogs.concat(blogWithUser))
    blogFormRef.current.toggleVisibility()
  }
  // ==================================================================================
  // ==================================================================================
  // handle logout from blog 
  // remove data and token user from localStrorage
  // empty state user , gived to state setUser null
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
  }
  // ==================================================================================
  // ==================================================================================
  // handle like item blog 
  // send data update to blogService path ./services/blog => update 
  // add data user to returedBlog when updated 
  const handleLike = async (blog) => {
    playClickSound()
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
  // ==================================================================================
  // ==================================================================================
  // handle delete item blog 
  //  confirm action delete window.condirm if ok continu if not return null
  // if ok send id blog to blogService path ./services/blog => remove 
  // update state blogs without blog removed 
  // if have any error cache to console
  const handleDelete = async (blog) => {
    playClickSound()
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }
  // ==================================================================================

  // ================================================================================
  // handle show notification message
  // accepted message and type (success, error)
  // handle this alert setimeout 4000 mean 4s
  const showNotification = (message, type) => {
    const id = Date.now()
    setNotification({ id, message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }
  // ================================================================================

  // ================================================================================
  //  toggle regiser form and login form 
  const toggleRegister = () => {
    playClickSound()
    setRegister(!register)
  }
  // ================================================================================





  // ================================================================================
  //  if user not login return form login and if user havn't accout can register
  if (user === null) {
    return (
      <div className="auth_app">
        <div className="">
            <h1 className="title_page header_form_auth">{register === true ? "Register" : "Login"}</h1>
            {register === true ? <RegisterForm onRegister={handleRegister}/> : <LoginForm onLogin={handleLogin}/>}
            <div className="box_toggle_auth">
              <button type="submit" className="toggle_auth" onClick={toggleRegister}>
                {register === true ? "I Have Account : Login" : " I Don't Have Account: Register"}
              </button>
            </div>
        </div>
      </div>  
    )
  }
  // ================================================================================

  // Filter persons by search (case-insensitive)
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )
  // ================================================================================

  // ================================================================================
  // if user login return blogs list where can add new blog and delete and liked some blogs
  return (

    <div>

      <div className="header_app">
          <h1 className="title_page">Blogs</h1>
          <div className="actions_app">
            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
              <CreateForm createBlog={handleCreate}/>
            </Togglable>
            <p>{user.name}: <button onClick={handleLogout}>Logout</button></p>
          </div>
      </div>
      <Hero value={search} change={(e) => setSearch(e.target.value)}/>
      <div className="container_app">
        <div className="">

          {notification && <Alert message={notification.message} type={notification.type} />} 
          <h1 className="title_page text_center">blogs items</h1>
          <div className="wrapper_blogs">
            {[...filteredBlogs].sort((a, b) => b.likes - a.likes).map(blog => (
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
  // ================================================================================


}
// ==================================================================================



// ==================================================================================
// export compoent App to render index.js 
// ==================================================================================
export default App
// ==================================================================================
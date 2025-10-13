
import { useState } from 'react'
import Alert from './alert'

const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [alert, setAlert] = useState(null)

  const handleLoginData = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData,[name]: value })
  }
  const handleLoginBlog = async (e) => {
    e.preventDefault()
    const { username, password } = loginData
    if (!username || !password ) {
      showAlert('username and password are required', 'error')
    }else {
      try {

        await onLogin({ username, password })
        setLoginData({ username: '', password: '' })

      } catch {
        showAlert('password or email not correct.', 'error')
      }
    }

  }
  // ================================================================================
  //  handle show notification message
  const showAlert = (message, type) => {
    const id = Date.now()
    setAlert({ id, message, type })
    setTimeout(() => {
      setAlert(null)
    }, 4000)
  }
  // ================================================================================

  return (
    <div className="auth_app">
      <form onSubmit={handleLoginBlog} className="form_app">
        {alert && <Alert message={alert.message} type={alert.type} />}

        <div className="field_input">
          <label>
            <div className=""> username</div>
            <input type="text"  value={loginData.username} onChange={handleLoginData} name="username" placeholder="username"/>
          </label>
        </div>

        <div className="field_input">
          <label>
            <div className="">password</div>
            <input type="password" value={loginData.password} onChange={handleLoginData} name="password" placeholder="password"/>
          </label>
        </div>

        <button type="submit" className="btn_primary">login</button>
      </form>
    </div>
  )
}
export default LoginForm
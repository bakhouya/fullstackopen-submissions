
import { useState } from 'react'
import Alert from './alert'
import Leading from './Lead'
import playClickSound from '../utils/sonClick'
const RegisterForm = ({ onRegister }) => {
  // State: register data 
  const [registerData, setRegisterData] = useState({ username: '', name: '', password: '' })
  // State: alert message and type 
  const [alert, setAlert] = useState(null)
  // state: toggle password accept string password or text
  const [typePassword, setTypePassword] = useState("password")
  const [leading, setLeading] = useState(false)

  // ================================================================================
  // live change data from input field to state registerData from atrr name 
  const changeValueData = (e) => {
    const { name, value } = e.target
    setRegisterData({ ...registerData,[name]: value })
  }
  // ================================================================================

  // ================================================================================
  // gived data field from registerDtata 
  // validate username, name, password if empty call alert function and gived message and type error
  // if not empty called function from ../app.js => onRegister and gived data 
  // when seved data emty state registerData
  const handleRegister = async (e) => {
    e.preventDefault()
    playClickSound()
    const { username, name, password } = registerData
    if (!username || !name || !password ) {
      showAlert('username, name and password are required', 'error')
    }else {
      try {
        setLeading(true)
        setTimeout(() => {setLeading(false)}, 2000)
        await onRegister({ username, name, password })
        setRegisterData({ username: '', name: '', password: '' })
      } catch {
        showAlert('some error happen for creation.', 'error')
      }
    }
    
  }
  // ================================================================================

  // ================================================================================
  // handle toggle type password
  const handleToggleTypePassword = () => {
    playClickSound()
    typePassword === "password" ? setTypePassword("test") : setTypePassword("password") 
  }
  // ================================================================================

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
    <div className="">
      <form onSubmit={handleRegister} className="form_app">
        
        {/* if any alert return her  */}
        {alert && <Alert message={alert.message} type={alert.type} />}

        {/* field username user */}
        <div className="field_input">
          <label>
            <div className=""> username</div>
            <input type="text"  value={registerData.username} onChange={changeValueData} name="username" placeholder="username"/>
          </label>
        </div>
        {/* field name user  */}
        <div className="field_input">
          <label>
            <div className="">name </div>
            <input type="text"  value={registerData.name} onChange={changeValueData} name="name" placeholder="name"/>
          </label>
        </div>
        {/*  field password user */}
        <div className="field_input">
          <label>
            <div className="">password</div>
            <input type={typePassword} value={registerData.password} onChange={changeValueData} name="password" placeholder="password"/>
            <button className="toggle_show_password" type='button' onClick={handleToggleTypePassword}>
                {typePassword === "password" ? "show" : "hide"} 
            </button>
          </label>
        </div>
        {/*  submit button */}
        <div className="flex_center">
            <button type="submit" className="btn_auth">Register</button>
        </div>

      </form>
      {leading && <Leading />}
    </div>
  )
}
export default RegisterForm
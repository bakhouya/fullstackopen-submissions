
import { useMutation } from "@tanstack/react-query";
import { useField } from '../hooks/useField'
import { useNotification } from '../context/notificationContext'
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "./Notification";
import Loading from "./Loading";
const Register = () => {
    const [, dispatch] = useNotification()
    const username = useField('')
    const name = useField('')
    const password = useField('')
    const navigate = useNavigate
    const [typePassword, setTypePassword] = useState("password") 
    const [loading , setLoading] = useState(false)

    const registerMutation = useMutation({
        mutationFn: userService.register,
        onSuccess: (data) => {
            navigate('/login')
            username.reset();
            name.reset();
            password.reset();
            setLoading(false)
        },
        onError: () => {
            showNotification('Some Error on Connection', 'error')
            setLoading(false)
        }
    })
    // ================================================================================
    const handleRegister = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoading(true)
            registerMutation.mutate({username: username.value, name: name.value, password: password.value});
        }
    }
    // ================================================================================

    // ================================================================================
    const handleToggleTypePassword = () => {
        typePassword === "password" ? setTypePassword("test") : setTypePassword("password") 
    }
    // ================================================================================
    const validateForm = () => { 
        let isValid = true 
        if (username.value.trim() === '') {
            username.setError('Username Has Be Requered')
            isValid = false 
        }else{
            username.setError(null)
        }

        if (password.value.trim() === '') {
            password.setError('Passwod Has Be Requered')
            isValid = false 
        }else{
            password.setError(null)
        }

        if (password.value.length <= 4) {
            password.setError('Password Has Be Plus 5 caractiers')
            isValid = false 
        }else{
            password.setError(null)
        }
        return isValid

    }
    // ================================================================================
    //  handle show notification message
    const showNotification = (message, type) => {
        dispatch({ type: 'SHOW', payload: {message: message, type: type}})
        setTimeout(() => {
        dispatch({ type: 'HIDE' })
        }, 5000) 
    }
    // ================================================================================

  return (
    <div className="auth_page">
      <form onSubmit={handleRegister} className="auth_form">
        <h1 className="title_app center margin_bottom">Register</h1>
        <Notification />

        {/* username field */}
        <div className="field_input">
          <label>
            <input type="text" value={username.value} onChange={username.onChange} placeholder="Username"/>
          </label>
          {username.error && <div className="errorField"> {username.error } </div>}
        </div>

        {/* name field */}
        <div className="field_input">
          <label>
            <input type="text" value={name.value} onChange={name.onChange} placeholder="Name"/>
          </label>
          {name.error && <div className="errorField"> {name.error } </div>}
        </div>

        {/* password field */}
        <div className="field_input">
          <label>
            <input type={typePassword} value={password.value} onChange={password.onChange} placeholder="Password"/>
            <button className="toggle_show_password" type='button' onClick={handleToggleTypePassword}>
                {typePassword === "password" ? "show" : "hide"} 
            </button>
          </label>
          {password.error && <div className="errorField"> {password.error } </div>}
        </div>

        {/* login button  */}
        <div className="flex_center">
            <button variant='primary' type="submit" size='midum' className="btn_auth">Register</button>
        </div>

      </form>
      {loading && <Loading />}
    </div>
  )
}
export default Register

import { useMutation } from "@tanstack/react-query";
import { useField } from '../hooks/useField'
import { useAuth } from "../context/AuthContext";
import { useNotification } from '../context/notificationContext'
import userService from "../services/userService";
import { useState } from "react";
import Notification from "./Notification";
import Loading from "./Loading";
const Login = () => {
    const [, dispatch] = useNotification()
    const { login } = useAuth();
    const username = useField('')
    const password = useField('')
    const [typePassword, setTypePassword] = useState("password") 
    const [loading , setLoading] = useState(false)

    const loginMutation = useMutation({
        mutationFn: userService.login,
        onSuccess: (data) => {
            login(data);
            username.reset();
            password.reset();
            setLoading(false)
        },
        onError: () => {
            showNotification('Username Or Password Not Correct', 'error')
            setLoading(false)
        }
    })
    // ================================================================================
    const handleLoginBlog = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoading(true)
            loginMutation.mutate({username: username.value, password: password.value});
            // setTimeout(() => {setLoading(false)}, 3000) 
        }
    }
    // ================================================================================

    // ================================================================================
    // handle toggle type password
    const handleToggleTypePassword = () => {
        // playClickSound()
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
      <form onSubmit={handleLoginBlog} className="auth_form">
        <h1 className="title_app center margin_bottom">Login</h1>
        <Notification />

        {/* username field */}
        <div className="field_input">
          <label>
            <input type="text" value={username.value} onChange={username.onChange} placeholder="Username"/>
          </label>
          {username.error && <div className="errorField"> {username.error } </div>}
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
            <button variant='primary' type="submit" size='midum' className="btn_auth">login</button>
        </div>

      </form>
      {loading && <Loading />}
    </div>
  )
}
export default Login
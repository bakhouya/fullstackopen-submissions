import axios from 'axios'
import API_URL from '../routers/api'

const loginUrl = `${API_URL}/api/login`
const registerUrl = `${API_URL}/api/users`
const verifyUrl = `${API_URL}/api/verify`

// ================================================================================
// register 
const register = async credentials => {
  const response = await axios.post(registerUrl, credentials)
  return response.data
}
// ================================================================================

// ================================================================================
// login
const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}
// ================================================================================

// ================================================================================
// verifyToken
const verifyToken = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.get(verifyUrl, config) 
  return response.data 
}
// ================================================================================

export default { login, verifyToken, register}
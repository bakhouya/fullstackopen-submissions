import axios from 'axios'
const baseUrl = '/api/login'


// ================================================================================
// register 
const register = async credentials => {
  const response = await axios.post('http://localhost:3003/api/users', credentials)
  return response.data
}
// ================================================================================

// ================================================================================
// login
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
// ================================================================================

// ================================================================================
// verifyToken
const verifyToken = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.get('http://localhost:3003/api/verify', config) 
  return response.data 
}
// ================================================================================

export default { login, verifyToken, register}
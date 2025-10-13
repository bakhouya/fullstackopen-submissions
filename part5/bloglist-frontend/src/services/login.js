import axios from 'axios'
const baseUrl = '/api/login'



const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
const verifyToken = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.get('http://localhost:3003/api/verify', config)
  return response.data
}

export default { login, verifyToken }
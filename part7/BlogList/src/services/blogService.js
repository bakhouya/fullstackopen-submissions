import axios from 'axios'
import API_URL from '../routers/api'

const baseUrl = `${API_URL}/blogs`
const usersUrl = `${API_URL}/users`

let token = null

// ================================================================================
// setToken
const setToken = newToken => {
  token = `Bearer ${newToken}`
}
// ================================================================================

// ================================================================================
// get all blogs
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
// ================================================================================

// ================================================================================
// get single blog by id (needs token)
const getBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}
// ================================================================================


// ================================================================================
// create a new blogs
const create = async newBlog => {
  const config = { headers: { Authorization: token, 'Content-Type': 'multipart/form-data', } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
// ================================================================================

// ================================================================================
//  update blog item by id
export const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}
// ================================================================================

// ================================================================================
// remove blog item by id
const remove = async (id) => {
    const config = { headers: { Authorization: token } }
    await axios.delete(`${baseUrl}/${id}`, config)
    return id 
}
// ================================================================================


// ================================================================================
// get all users (needs token)
const getUsers = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(usersUrl, config)
  return response.data
}
// ================================================================================

// ================================================================================
// get single user by id (needs token)
const getUser = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(`${usersUrl}/${id}`, config)
  return response.data
}
//

// ================================================================================
// create comment for a specific blog
const createComment = async (blogId, commentData) => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentData, config)
    return response.data 
}
// ================================================================================



export default { getAll, getBlog, create, update, remove, setToken, getUsers, getUser, createComment }
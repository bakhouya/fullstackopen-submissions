import axios from 'axios'
const baseUrl = '/api/blogs'

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
// create a new blogs
const create = async newBlog => {
  const config = { headers: { Authorization: token } }
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
const remove = async id => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
// ================================================================================

export default { getAll, create, update, remove, setToken }
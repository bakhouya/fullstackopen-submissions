
const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
  
    if (!response.ok) {
      throw new Error('Failed to fetch notes')
    }  
    const data = await response.json()
    return data
}
const createAnecdote = async (newAnecdote) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnecdote),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create note')
    }
    
    return await response.json()
}
const updateAnecdote = async (anecdote) => {
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anecdote),
    })
    if (!response.ok) throw new Error('Failed to update anecdote')
    return await response.json()
}
const removeAnecdote = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    })
  
    if (!response.ok) {
      throw new Error('Failed to delete anecdote')
    }
  
    return id
}
const fetchItem = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error('Failed to delete anecdote')
  }
  const data = await response.json()
  return data
}
  
export default { getAnecdotes, createAnecdote, updateAnecdote, removeAnecdote, fetchItem }

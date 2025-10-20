const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}
const create = async (content) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, votes: 0 }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create note')
    }
    
    return await response.json()
}

const updateVote = async (id, newObject) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObject),
    })
    if (!response.ok) throw new Error('Failed to update anecdote')
    return await response.json()
}

export default { getAll, create, updateVote }
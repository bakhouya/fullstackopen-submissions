import { createSlice, createSelector } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      // state.push({ content, votes: 0, id: generateId() })
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => (a.id !== updated.id ? a : updated)).sort((a, b) => b.votes - a.votes)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

const { setAnecdote, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeNotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}
export const addNewAncedote = (content) => {
  return async (dispatch) => {
    const newAncedote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAncedote))
  }
}
export const updateAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdoteService.updateVote(id, updatedAnecdote)
    dispatch(voteAnecdote(response))
  }
}
export const selectFilteredAnecdotes = createSelector(
  [(state) => state.anecdotes, (state) => state.filter],
  (anecdotes, filter) => {
    return anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  }
)  

export default anecdoteSlice.reducer




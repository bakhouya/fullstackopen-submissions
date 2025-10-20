import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeNotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // anecdoteService.getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
    dispatch(initializeNotes())
  }, [dispatch])




  return (
    <div className='app'>
      <AnecdoteForm />
      <div className="list">
          <h2 className='Title_dots'>Anecdotes</h2>
          <Notification />
          <Filter />
          <AnecdoteList />
      </div>     
    </div>
  )
}

export default App

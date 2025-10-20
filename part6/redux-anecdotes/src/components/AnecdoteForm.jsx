import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'  
import { addNewAncedote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async  (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (content) {
      dispatch(addNewAncedote(content))
      dispatch(showNotification(`You added "${content}"`, 5))
      event.target.anecdote.value = ''
    } else {
      alert('Content is required!')
    }
  }

  return (
    <form onSubmit={addAnecdote}  className='form_app'>
      <div className='field_app'>
        <input name="anecdote" className='input_field' placeholder='New Dot'/>
      </div>
      <button type="submit" className='btn_app'>create</button>
    </form>
  )
}

export default AnecdoteForm

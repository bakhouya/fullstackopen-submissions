import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredAnecdotes, updateAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(selectFilteredAnecdotes)

    const dispatch = useDispatch()

    const handleVote = (id, content) => {
        dispatch(updateAnecdote(id))
        dispatch(showNotification(`You voted '${content}'`, 5))
    }

    return (
        <div>
        {anecdotes.map(anecdote => (
            <div key={anecdote.id} className='item_card'>
            <div>{anecdote.content}</div>
            <div>
                has: {anecdote.votes} 
                <button onClick={() => handleVote(anecdote.id, anecdote.content)} className='add_vote'>vote</button>
            </div>
            </div>
        ))}
        </div>
    )
}

export default AnecdoteList

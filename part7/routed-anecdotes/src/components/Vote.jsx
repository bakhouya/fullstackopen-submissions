
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'


const Votes = ({anecdote}) => {

    const queryClient = useQueryClient()
    // const [, dispatch] = useNotification()
    const updateAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.updateAnecdote,
        onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(
            ['anecdotes'],
            anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
        )
        }
    })
    const handleVote = (anecdote) => {
        const updated = { ...anecdote, votes: anecdote.votes + 1 } 
        updateAnecdoteMutation.mutate(updated)
        // showNotification('You voted item successfully', 'success')
    }

    return (
        <div className="action_item txt_base" onClick={() => handleVote(anecdote)}>
            J'aime
            <span>  {anecdote.votes}</span>
        </div>
    )
}
export default Votes

import { useMutation, useQueryClient  } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import { useNavigate } from 'react-router-dom'

const Delete = ({anecdote}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    // const [, dispatch] = useNotification()
    const deleteAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.removeAnecdote,
        onSuccess: (id) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.filter(a => a.id !== id))
        },
    })

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this anecdote?')) {
            deleteAnecdoteMutation.mutate(id)
            // showNotification('deleted anecdote item successfully', 'success')
            navigate('/')
        }
    }

    return (
        <div className="action_item txt_base" onClick={() => handleDelete(anecdote)}>
            Delete
        </div>
    )
}
export default Delete
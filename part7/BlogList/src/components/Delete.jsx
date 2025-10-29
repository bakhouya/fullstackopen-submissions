
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import BlogService from '../services/blogService'
import { useNavigate } from 'react-router-dom'

const Delete = ({blog}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const deleteBlogMutation = useMutation({
        mutationFn: BlogService.remove,
        onSuccess: (id) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.filter(a => a.id !== id))
            navigate('/')
        },
        onError: () => {
            alert('error')
        }
    })

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this anecdote?')) {
            deleteBlogMutation.mutate(id)
        }
    }

    return (
        <div className="pointer action_card danger" onClick={() => handleDelete(blog)}>
            Delete
        </div>
    )
}
export default Delete

import { useMutation } from "@tanstack/react-query"
import { useField } from '../hooks/useField'
import { useNotification } from '../context/notificationContext'
import blogService from "../services/blogService"
import { useState } from "react"
import Notification from "./Notification"
import Loading from "./Loading" 
import { useQueryClient } from "@tanstack/react-query"
import playClickSound from "../utils/sonClick"

const AddComment = ({ blog }) => {

    const queryClient = useQueryClient()
    const [, dispatch] = useNotification()
    const comment = useField('')
    const [loading , setLoading] = useState(false)

    const createCommentMutation = useMutation({
        mutationFn: ({ blogId, commentData }) => blogService.createComment(blogId, commentData),
        onSuccess: (newComment, { blogId }) => {
          queryClient.setQueryData(['blog', blogId], old => {
            if (!old) return old
            return {...old, comments: [...old.comments, newComment]}
          })
          comment.reset()
          setLoading(false)
          showNotification('Comment added successfully', 'success')
        },
        onError: () => {
          showNotification('Failed to add comment', 'error')
          setLoading(false)
        }
    })
    // ========================================================================
    const handleCreateComment = (e) => {
        e.preventDefault()
        playClickSound()
        if(validateForm()) {
            setLoading(true)
            const commentData = { content: comment.value }
            createCommentMutation.mutate({ blogId: blog.id, commentData })
        }
    }
    // ================================================================================

    // ================================================================================
    const validateForm = () => { 
        let isValid = true 

        if (comment.value.trim() === '') {
            comment.setError('Comment Has Be Requered')
            isValid = false 
        }else{
            comment.setError(null)
        }
        return isValid

    }
    // ================================================================================
    //  handle show notification message
    const showNotification = (message, type) => {
        dispatch({ type: 'SHOW', payload: {message: message, type: type}})
        setTimeout(() => {
        dispatch({ type: 'HIDE' })
        }, 5000) 
    }
    // ================================================================================

  return (
    <div className="margin_top">
        <form className="form_comment" onSubmit={handleCreateComment}>
            <div className="field_input">
                <label>
                    <input type="text" value={comment.value} onChange={comment.onChange} placeholder="Add Comment"/>
                </label>
                {comment.error && <div className="errorField"> {comment.error } </div>}
            </div>
        </form>
        <Notification />
        {loading && <Loading />}
    </div>
  )
}
export default AddComment

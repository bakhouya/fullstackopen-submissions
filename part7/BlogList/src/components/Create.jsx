
import { useMutation } from "@tanstack/react-query"
import { useField } from '../hooks/useField'
import { useNotification } from '../context/notificationContext'
import blogService from "../services/blogService"
import { useState } from "react"
import Notification from "./Notification"
import Loading from "./Loading" 
import { useNavigate} from "react-router-dom" 
import { useQueryClient } from "@tanstack/react-query"
import playClickSound from "../utils/sonClick"
const Create = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const [, dispatch] = useNotification()
    const title = useField('')
    const author = useField('')
    const url = useField('')
    const description = useField('')
    const image = useField('')

    const [loading , setLoading] = useState(false)

    const createMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: (blog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(blog))
            navigate('/')
        },
        onError: () => {
            showNotification('Creation not successfully', 'error')
            setLoading(false)
        }
    })
    // ================================================================================
    const handleCreateBlog = async (e) => {
        e.preventDefault()
        playClickSound()
        if (validateForm()) {
            setLoading(true)
            const formData = new FormData()
            formData.append('title', title.value)
            formData.append('author', author.value)
            formData.append('description', description.value)
            formData.append('url', url.value)
            formData.append('likes', 0)
            if (image.file) formData.append('image', image.file)
            createMutation.mutate(formData)

            // createMutation.mutate({
            //     title: title.value,
            //     author: author.value,
            //     description: description.value,
            //     url: url.value,
            //     likes: 0,
            //     image: image.file
            // })
        }
    }
    // ================================================================================

    // ================================================================================
    const validateForm = () => { 
        let isValid = true 

        if (title.value.trim() === '') {
            title.setError('title Has Be Requered')
            isValid = false 
        }else{
            title.setError(null)
        }

        if (description.value.trim() === '') {
            description.setError('description Has Be Requered')
            isValid = false 
        }else{
            description.setError(null)
        }

        if (author.value.trim() === '') {
            author.setError('author Has Be Requered')
            isValid = false 
        }else{
            author.setError(null)
        }

        if (url.value.trim() === '') {
            url.setError('url Has Be Requered')
            isValid = false 
        }else{
            url.setError(null)
        }

        if (!image.file) {
            image.setError('Image is required')
            isValid = false
        } else {
            image.setError(null)
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
    <div className="auth_page">
      <form onSubmit={handleCreateBlog} className="auth_form">
        <h1 className="title_app center margin_bottom">Create Blog</h1>
        <Notification />

        <div className="field_file">
          <label className="upload_label">
            <input type="file" accept="image/*"  onChange={image.getFile} hidden/>
            {image.preview 
                ?<img src={image.preview} alt="Preview" className="preview_image"/> 
                : <span className="txt_base">Doawland image</span>}
          </label>
          {image.error && <div className="errorField"> {image.error } </div>}
        </div>

        <div className="field_input">
          <label>
            <input type="text" value={title.value} onChange={title.onChange} placeholder="Title"/>
          </label>
          {title.error && <div className="errorField"> {title.error } </div>}
        </div>
        <div className="field_input">
          <label>
            <input type="text" value={description.value} onChange={description.onChange} placeholder="Description"/>
          </label>
          {description.error && <div className="errorField"> {description.error } </div>}
        </div>
        <div className="field_input">
          <label>
            <input type="text" value={author.value} onChange={author.onChange} placeholder="Author"/>
          </label>
          {author.error && <div className="errorField"> {author.error } </div>}
        </div>
        <div className="field_input">
          <label>
            <input type="text" value={url.value} onChange={url.onChange} placeholder="Url blog"/>
          </label>
          {url.error && <div className="errorField"> {url.error } </div>}
        </div>


        <div className="flex_center">
            <button variant='primary' type="submit" size='midum' className="btn_auth">Save</button>
        </div>

      </form>
      {loading && <Loading />}
    </div>
  )
}
export default Create
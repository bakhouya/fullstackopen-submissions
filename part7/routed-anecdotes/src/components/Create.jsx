import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
const CreateNew = () => {
    const contentField = useField('')
    const authorField = useField('')
    const infoField = useField('')
    const queryClient = useQueryClient()
    // const [, dispatch] = useNotification()
    const navigate = useNavigate()
    
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.createAnecdote,
        onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(['anecdotes'])
          queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: () => {
          showNotification('Error: anecdote content must be at least 5 characters long', 'error')
        }
    })
  
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            try{
                const content = contentField.value 
                const author = authorField.value 
                const info = infoField.value 
                newAnecdoteMutation.mutate({ content, author, info, votes: 0 })  
                //showNotification('creation anecdote item successfully', 'success')
                resetField()
                navigate('/')
            }catch(error) {
                console.log(error)
            }
        }
          
    }
    const resetField = () => {
        contentField.reset() 
        authorField.reset() 
        infoField.reset() 
        contentField.setError(null) 
        authorField.setError(null)  
        infoField.setError(null)  
    }
    const validateForm = () => { 
        let isValid = true 
        if (contentField.value.trim() === '') {
            contentField.setError('Content is Requered')
            isValid = false 
        }else{
            contentField.setError(null)
        }
        if (authorField.value.trim() === '') {
            authorField.setError('Author is Requered')
            isValid = false 
        }else{
            contentField.setError(null)
        }
        if (infoField.value.trim() === '') {
            infoField.setError('Info Url is Requered')
            isValid = false 
        }else{
            contentField.setError(null)
        }
        return isValid

    }

    // const showNotification = (message, type) => {
    //   dispatch({ type: 'SHOW', payload: {message: message, type: type}})
    //   setTimeout(() => {
    //     dispatch({ type: 'HIDE' })
    //   }, 5000) 
    // }

    return (
        <div className="wrapper_form">  
            <form onSubmit={handleSubmit} className="form_create">
                <div className="header_form"><h2 className="title_app">Create</h2></div>
                <div className="hr_card"></div>
                <label className="field_item">
                    <div className="label_field">Content</div>
                    <input className="input_field" {...contentField} placeholder="Enter Content"/>
                    {contentField.error && <div className="errorField"> {contentField.error } </div>}
                </label>
                <label className="field_item">
                    <div className="label_field">Author</div>
                    <input className="input_field" {...authorField} placeholder="Enter Author"/>
                    {authorField.error && <div className="errorField"> {authorField.error } </div>}
                </label>
                <label className="field_item">
                    <div className="label_field">Url For More Info</div>
                    <input className="input_field" {...infoField} placeholder="Enter Url For More Info"/>
                    {infoField.error && <div className="errorField"> {infoField.error } </div>}
                </label>
                <button className="btn_create" type="submit">
                    create
                </button>
                <button className="btn_reset" type='button' onClick={resetField}> reset</button>
            </form>
        </div>
    )

}
export default CreateNew
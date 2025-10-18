import { useState } from 'react'
import Alert from './alert'
import playClickSound from '../utils/sonClick'
const CreateForm = ({ createBlog }) => {
  // State: formData i mean data blog to create new blog
  const [formData, setFormData] = useState({ title: '', url: '', author: '', likes: '' })
  // State: alert
  const [alert, setAlert] = useState(null)

  // ================================================================================
   // handle change data fields to state formData
  const handleCreateData = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData,[name]: value })
  }
  // ================================================================================


  // ================================================================================
  // when submit form gived data title, author, url, likes  from state formData 
  // validate if title, author, url empty call alert function 
  // if not empty send data to function createBlog ../app.js 
  const handleCreateBlog = async (e) => {
    e.preventDefault()
    playClickSound()
    const { title, author, url, likes  } = formData
    if (!formData.title || !formData.author || !formData.url) {
      showAlert('Title, Author, and URL are required', 'error')
    }else {
      try {
        await createBlog({ title, author, url, likes })
        setFormData({ title: '', author: '', url: '', likes: '' })
      } catch {
        showAlert('Blog creation failed.', 'error')
      }
    }

  }
  // ================================================================================



  // ================================================================================
  //  handle show notification message
  const showAlert = (message, type) => {
    const id = Date.now()
    setAlert({ id, message, type })
    setTimeout(() => {
      setAlert(null)
    }, 4000)
  }
  // ================================================================================

  return (
    <div>
      {alert && <Alert message={alert.message} type={alert.type} />}

      <form onSubmit={handleCreateBlog} className="">
        {/* title blog field*/}
        <div className="field_input">
          <label>
            <div className=""> title </div>
            <input type="text"  value={formData.title || ''} onChange={handleCreateData} name="title"/>
          </label>
        </div>
        {/* author blog field */}
        <div className="field_input">
          <label>
            <div className=""> url blog </div>
            <input type="url"  value={formData.url || ''} onChange={handleCreateData} name="url"/>
          </label>
        </div>
        {/* url blog field */}
        <div className="field_input">
          <label >
            <div className=""> author </div>
            <input type="text"  value={formData.author || ''} onChange={handleCreateData} name="author"/>
          </label>
        </div>
        {/* likes number blog field */}
        <div className="field_input">
          <label >
            <div className=""> likes </div>
            <input type="number"  value={formData.likes || ''} onChange={handleCreateData} name="likes"/>
          </label>
        </div>
        {/* submit button */}
        <button type="submit" className="btn_primary">Create</button>
      </form>

    </div>
  )

}
export default CreateForm





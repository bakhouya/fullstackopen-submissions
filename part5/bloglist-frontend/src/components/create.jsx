import { useState } from 'react'
import Alert from './alert'

const CreateForm = ({ createBlog }) => {
  const [formData, setFormData] = useState({ title: '', url: '', author: '', likes: '' })
  const [alert, setAlert] = useState(null)

  const handleCreateData = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData,[name]: value })
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
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

        <div className="field_input">
          <label>
            <div className=""> title </div>
            <input type="text"  value={formData.title || ''} onChange={handleCreateData} name="title"/>
          </label>
        </div>
        <div className="field_input">
          <label>
            <div className=""> url blog </div>
            <input type="url"  value={formData.url || ''} onChange={handleCreateData} name="url"/>
          </label>
        </div>
        <div className="field_input">
          <label >
            <div className=""> author </div>
            <input type="text"  value={formData.author || ''} onChange={handleCreateData} name="author"/>
          </label>
        </div>
        <div className="field_input">
          <label >
            <div className=""> likes </div>
            <input type="number"  value={formData.likes || ''} onChange={handleCreateData} name="likes"/>
          </label>
        </div>

        <button type="submit" className="btn_primary">Create</button>
      </form>

    </div>
  )

}
export default CreateForm





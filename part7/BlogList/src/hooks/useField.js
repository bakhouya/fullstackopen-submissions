
import { useState } from 'react'

export const useField = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [error , setError] = useState(null)

  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const getFile = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile)) 
      setError(null)
    }
  }
  
  const reset = () => {
    setValue(initialValue)
    setPreview(null)
    setFile(null)
  }



  return {value, onChange, reset, error, setError, getFile, preview, file}
}
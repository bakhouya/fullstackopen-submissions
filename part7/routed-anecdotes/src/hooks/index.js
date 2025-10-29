

import { useState } from 'react'

export const useField = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [error , setError] = useState(null)

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue(initialValue)
  }

//   ==============================================
// const validate = (validation) => {
//     const errorMessage = validation(value)
//     setError(errorMessage)
//     return errorMessage === null
// }

  return {value, onChange, reset, error, setError}
}
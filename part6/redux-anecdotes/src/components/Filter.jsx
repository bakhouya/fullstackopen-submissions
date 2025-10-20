import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const value = event.target.value
    dispatch(setFilter(value))
  }

  const style = {
    marginBottom: 20,
  }

  return (
    <div style={style} className='field_app'>
      <input onChange={handleChange} className='input_field' placeholder='Filter'/>
    </div>
  )
}

export default Filter

import React from 'react'

export default function PersonForm (props) {
  return (
     <div>
        <form onSubmit={props.submit} className='form'>
            <input type="text" placeholder='name' value={props.form.name}  name="name"  onChange={props.change} className='input_field'/>
            <input type="text" placeholder='number' value={props.form.number}  name="number"  onChange={props.change} className='input_field'/>
            <button type='submit'>Save</button>
        </form>
      </div>
  )
}

import React from 'react'

export default function Filter (props) {
  return (
    <div>
        <div>search numbers</div>
        <input type="text" placeholder='search' value={props.value} onChange={props.change} className='input_field '/>
    </div>
  )
}

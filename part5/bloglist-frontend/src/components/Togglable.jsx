import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {setVisible(!visible)}

  useImperativeHandle(ref, () => {return { toggleVisibility }})

  return (
    <div className=''>
      <div style={hideWhenVisible}>
        <button className='btn_primary' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible} className='model_form'>
        <div className="form_app">
          <div className="header_form_create">
            <h2>{buttonLabel}</h2>
            <button onClick={toggleVisibility} className='close'> cancel</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )


})

Togglable.displayName = 'Togglable'

export default Togglable

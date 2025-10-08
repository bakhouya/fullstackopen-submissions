import { useEffect, useState } from 'react'

const NotificationBar = ({ message, type }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000)
      return () => clearTimeout(timer) 
    }
  }, [message])

  if (!message || !visible) return null

  const style = {
    color: type === 'success' ? 'green' : 'red',
    background: type === 'success' ? '#50e4a6ff' : '#f0b0b0ff',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
  }

  return <div style={style}>{message}</div>
}

export default NotificationBar


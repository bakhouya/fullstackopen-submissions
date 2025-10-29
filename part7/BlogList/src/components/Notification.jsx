import { useNotification } from '../context/notificationContext'

const Notification = () => {
  const [notification] = useNotification()
  const { message, type } = notification
  if (!message) return null

  const style = {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '6px',
    color: type === 'error' ? 'red' : 'green',
    borderColor: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#ffe5e5' : '#e5ffe5'
  }

  return <div style={style} className='notification'>{message}</div>
}

export default Notification
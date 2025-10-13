
const Alert = ({ message, type }) => {

  if (!message) return null

  const style = {
    color: type === 'success' ? 'green' : 'red',
    background: type === 'success' ? '#50e4a6ff' : 'rgb(247, 204, 204) ',
    fontSize: 15,
    borderRadius: 5,
    padding: 10,
    margin: 'auto' ,
    marginBottom: 20,
  }

  return <div style={style}>{message}</div>
}

export default Alert


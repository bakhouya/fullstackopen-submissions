
const Alert = ({ message, type }) => {

  if (!message) return null

  const style = {
    color: type === 'success' ? 'green' : 'red',
    background: type === 'success' ? '#50e4a6ff' : 'rgb(247, 204, 204) ',
    fontSize: 15,
    borderRadius: 5,
    paddingBlock: 12,
    paddingInline: 15,
    margin: 'auto' ,
    marginBottom: 20,
  }

  return <div style={style} className="alert_message">{message}</div>
}

export default Alert


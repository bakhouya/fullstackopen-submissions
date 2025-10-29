
import { Card} from "react-bootstrap"
import { enUS } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'


const Comment = ({ comments }) => {
    return (
      <div className="wrapper_comments">
        <Card.Title className='text-multiline txt_title'>Comments</Card.Title>
        <div className="margin_top">
          {comments.map(comment => (
            <div key={comment.id}>
              <div className="hr_card"></div>
              <div className="item_comment">
                <div className=''>{comment.content}</div>
              </div>
              <span className="date_created">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: enUS })}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Comment
  
import { useAuth } from "../context/AuthContext"
import { Card, Row, Col } from "react-bootstrap"
import { enUS } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import Delete from './Delete'
import Like from './Like'
import { Link } from "react-router-dom"

function CardBlog(props) {
  const { user } = useAuth();

  return (
    <Row className="g-4">
      {props.data.map(blog => {
        
        const blogOwnerName = props.userBlog?.username ?? blog.user?.username
        const isOwner = user?.username === blogOwnerName 

        return (
          <Col key={blog.id} xs={12} sm={6} md={6}>
            <Card className="h-100 pointer card">
              <div className="info_user flex_between">
                <div className="flex_start">
                    <div className="avatar_user">
                        {blogOwnerName ? (
                          <div className="avatar_letter">
                            {blogOwnerName.charAt(0).toUpperCase()}
                          </div>
                        ) : (
                          <img src={'/images/icon.png'} alt="" />
                        )}
                    </div>
                  <div>
                    <div className="txt_base txt_secoundary">
                      {blogOwnerName}
                    </div>
                    <span className="date_created txt_base">
                      {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true, locale: enUS })}
                    </span>
                  </div>
                </div>
              </div>

              <img src={`http://localhost:3003${blog.image}`} alt={blog.title} className='header_card'/>

              <div className="d-flex flex-column body_card">
                <div className="flex_between">
                  <Link to={"/blogs/" + blog.id} > <Card.Title className='text-multiline txt_title link'>{blog.title}</Card.Title></Link>
                </div>
                
                <div className="flex-grow-1 text-multiline2 txt_base">
                  {blog.description}
                </div>
                <Card.Text className="txt_base"> Author: {blog.author}</Card.Text>
                
              </div>

              <div className="hr_card"></div>

              <div className="text-muted medium">
                <div className="flex_between">
                  <div className="flex_start">
                    <Like blog={blog} />
                    <div className="slash"></div>
                    <Link to={"/blogs/" + blog.id}  className="flex_start action_card pointer txt_base link">
                      <div>Comments</div>
                      <div>{blog.comments.length}</div>
                    </Link>
                  </div>

                  {isOwner && <Delete blog={blog.id} />}
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default CardBlog;

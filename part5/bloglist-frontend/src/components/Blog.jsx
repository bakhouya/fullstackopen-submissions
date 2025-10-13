import { useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
const Blog = ({ blog, onLike, onDelete, user }) => {
  const [details, setDetails] = useState(false)
  const isOwner = blog.user && user && blog.user.username === user.username

  return (
    <div className="card_blog blog">

      <div className="header_card"></div>

      <div className="body_card">
          <div className="text-multiline">{blog.title} - {blog.author}</div>
          <button type="button" onClick={() => {setDetails(!details)}}>
            {details ? 'hide' : 'view'}
          </button>
      </div>

      {details && (
          <div className="detials_blog">
            {blog.user && <div>user: {blog.user.username} </div>}
            <div className='flex_center text-multiline'>
              <span>url:</span>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="text-multiline">
              <button onClick={() => onLike(blog)} type='button' className='flex_center like'>
                <span>like</span>
                <FaThumbsUp/>  {blog.likes}
              </button>
            </div>
          </div>
      )}

      <div className="footer_card">
          {isOwner && (
            <button onClick={() => onDelete(blog)} className='flex_center delete' style={{ color: 'red' }}>
              <span>Delete</span>
            </button>
          )}
      </div>

    </div>
  )
}

export default Blog
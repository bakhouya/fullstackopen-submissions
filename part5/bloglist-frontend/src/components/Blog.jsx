import { useState } from 'react'
import playClickSound from '../utils/sonClick'

const Blog = ({ blog, onLike, onDelete, user }) => {
  // State: details when user click to "view" gived true
  const [details, setDetails] = useState(false)
  // gived user has logged to handle delete blog item
  const isOwner = blog.user && user && blog.user.username === user.username

  // =================================================================================
  // toggle view or hide details blog item 
  const getDetails = () => {
      playClickSound()
      setDetails(!details)
  }
  // =================================================================================

  return (
    <div className="card_blog blog">

      <div className="header_card"> </div>
      {/* body item blog  */}
      <div className="body_card">
          <div className="text-multiline">{blog.title} - {blog.author}</div>
          <button type="button" onClick={getDetails}>
            {details ? 'hide' : 'view'}
          </button>
      </div>

      {/* if state details true return this */}
      {details && (
          <div className="detials_blog">
            {blog.user && <div>user: {blog.user.username} </div>}
            <div className='flex_center text-multiline'>
              <span>url:</span>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="text-multiline">
              <button onClick={() => onLike(blog)} type='button' className='flex_center like'>
                <span>Like</span>  {blog.likes}
              </button>
            </div>
          </div>
      )}

      {/* if user added this item blog return option delete */}
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
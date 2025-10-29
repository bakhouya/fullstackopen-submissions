import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogService'
import { useParams } from 'react-router-dom'
import LoadingPage from './Loading'
import { useAuth } from '../context/AuthContext'
import { Card} from "react-bootstrap"
import { enUS } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import Delete from './Delete'
import Like from './Like'
import Comment from './Comments'
import AddComment from './AddComment'
import Empty from './Empty'
const BlogItem = () => {
    const { id } = useParams()
    const { user } = useAuth()
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => blogService.getBlog(id),
        enabled: !!id, 
        staleTime: 1000 * 30,
    })

    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        console.error('Error fetching blog item:', error)
        return (
          <div className="error-box">
            <p>Somthing Worning Connection</p>
            <button onClick={() => window.location.reload()}> Refresh </button>
          </div>
        )
    }
      

    if (!data) {
        return <div>No anecdote found.</div>
    }
    const isOwner = user && user.id === data.user?.id  
    return (
        <section>

            <article className="h-100 pointer blog_item">
               

                <img src={`http://localhost:3003${data.image}`} alt={data.title} className='header_card margin_bottom' />

                <div className="info_user header_item_blog">
                    <div className="flex_start">
                        <div className="avatar_user">
                            {data.user.username ? (
                            <div className="avatar_letter">
                                {data.user.username.charAt(0).toUpperCase()}
                            </div>
                            ) : (
                            <img src={'/images/icon.png'} alt="" />
                            )}
                        </div>
                        <div>
                            <h3 className="txt_title">{data.user.username}</h3>
                            <span className="date_created txt_base">
                            {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true, locale: enUS })}
                            </span>
                        </div>
                    </div>
                    <div className="flex_start">
                        <div className="btn_secoundary"><Like blog={data} /></div>
                        <div className="flex_start action_card pointer txt_base btn_secoundary">
                            <div>Comments</div>
                            <div>{data.comments.length}</div>
                        </div>

                        {isOwner && (
                            <>
                                <div className="slash"></div>
                                <Delete blog={data.id} />
                            </>
                        )}
                    </div>
                </div>

                <div className="hr_card"></div>

                <div className="d-flex flex-column body_card">
                    <div className="flex_between">
                    <Card.Title className='text-multiline txt_title'>{data.title}</Card.Title>
                    {data.user && (<Card.Text className="txt_base">{data.author}</Card.Text>)}
                    </div>
                    <Card.Text className="flex-grow-1 text-multiline2 txt_base margin_top_8">{data.description}</Card.Text>
                    <Card.Text className="flex-grow-1 text-multiline2 txt_base margin_top_8">{data.url}</Card.Text>
                </div>

                <div className="text-muted medium">
                    {data.comments.length === 0 ? <Empty /> : <Comment comments={data.comments}/>}
                    <AddComment blog={data}/>
                </div>

            </article>

        </section>
     
    )
}
export default BlogItem 
import { useQuery } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import { useParams } from 'react-router-dom'
import LoadingPage from './Loading'
import Votes from './Vote'
import Delete from './Delete'

const Item = () => {
  const { id } = useParams()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['item', id],
        queryFn: () => anecdoteService.fetchItem(id),
        enabled: !!id, 
    })

    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        console.error('Error fetching item:', error)
        return <div>Error loading the anecdote.</div>
    }

    if (!data) {
        return <div>No anecdote found.</div>
    }

    return (
        <div className="wrapper_item">
            <h2 className="title_app margin_bottom">Anecdote Details</h2>
            <div className="info_item">
                <div className="header_item"></div>
                <div className="body_item">
                    <h3 className=''>{data.content}</h3>
                    <p className='txt_base'>{data.author}</p>
                    <a href={data.info} className='txt_base'> {data.info} </a>
                </div>
                <div className="hr_card"></div>
                <div className="footer_card">
                    <Votes anecdote={data} />
                    <div className="slash"></div>
                    <Delete anecdote={data.id} />
                </div>
                
            </div>
        </div>
    )
}

export default Item

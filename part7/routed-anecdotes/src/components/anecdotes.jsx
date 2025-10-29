
import { useQuery} from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import Card from './List'
import LoadingPage from './Loading'

const AnecdoteList = () => {
    //  handle get data 
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: anecdoteService.getAnecdotes,
        retry: 1 
    })
    //  after get data when loading return this  return <LoadingPage />
    if (isLoading) {return <LoadingPage /> }

    // if any error for when get data show this
    if (isError) {
        console.error('React Query Error:', error)
        return <div>Anecdote service not available due to problems in server.</div>
    }
   
    return (
        <div className="wrraper_cards">
            <h2 className="title_app margin_bottom">Anecdotes</h2>
                {data.length != 0 ? <Card anecdotes={data} /> : null}
                 
            
        </div>
    )

}
export default AnecdoteList 
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogService'
import { useParams } from 'react-router-dom'
import LoadingPage from './Loading'
import CardBlog from './Card'
import Empty from './Empty'

const UserItem = () => {
    const { id } = useParams()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user', id],
        queryFn: () => blogService.getUser(id),
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
        <section>

            <div className="h-100 pointer user_box">
                <div className="">
                    <div className="avatar_user_lg">
                        {data.username ? (
                          <div className="avatar_letter">
                            {data.username.charAt(0).toUpperCase()}
                          </div>
                        ) : (
                          <img src={'/images/icon.png'} alt="" />
                        )}
                    </div>
                    <div className='text-multiline txt_title txt_center'> {data.name} {data.blogs.length}</div>                   
                    <h2 className='text-multiline txt_title txt_center'> {data.username} </h2>
                    
                </div>
            </div>

            <div className="hr_card"></div>
            <div className="margin_top"> {data.blogs.length === 0 ? <Empty/> : <CardBlog data={data.blogs} userBlog={data}/>} </div>
            
            


        </section>
     
    )
}
export default UserItem 
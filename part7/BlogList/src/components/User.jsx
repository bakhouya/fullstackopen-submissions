import {useQuery } from '@tanstack/react-query'
import BlogService from '../services/blogService'
import { useAuth } from "../context/AuthContext";
import  {Card, Row, Col} from "react-bootstrap";
import Loading from './Loading';
import { Link } from 'react-router-dom';

function Users() {
    const { user } = useAuth();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: BlogService.getUsers,
        retry: 1 
    })
    if (isLoading) {return <div className='home_loading'><Loading/></div>}
    if (isError) {return <div>Anecdote service not available due to problems in server.</div>}
    if(!data) {return <div>no data found</div>}

    return ( 
        <section className="section_index">  

            <Row className="g-4">
                {data.map(user => (
                    <Col key={user.id} xs={12} sm={6} md={4}>
                        <Link to={'/users/'+user.id} className="h-100 pointer card user_body">
                            <div className="">
                                <div className="avatar_user">
                                    {user.username ? (
                                        user.username.charAt(0).toUpperCase()
                                    ) : (
                                        <img src={'/images/icon.png'} alt="" />
                                    )}
                                </div>
                                <div className='text-multiline txt_title'>{user.name}  {user.blogs.length}</div>
                            </div>
                        </Link>
                    </Col>
                ))}         
            </Row>

        </section> 
    )
}
export default Users
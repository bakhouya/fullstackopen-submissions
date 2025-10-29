import {useQuery } from '@tanstack/react-query'
import BlogService from '../services/blogService'
import { FiSearch } from "react-icons/fi"
import { useField } from '../hooks/useField'
import CardBlog from './Card';
import Loading from './Loading';

function Index() {
    const search = useField('')
    const { data, isLoading, isError } = useQuery({
        queryKey: ['blogs'],
        queryFn: BlogService.getAll,
        retry: 1 
    })
    
    if (isLoading) {return <div className='home_loading'><Loading/></div>}
    if (isError) {return <div>Anecdote service not available due to problems in server.</div>}
    if(!data) {return <div>no data found</div>}

    const filteredBlogs = data.filter(blog => {
        const searchTerm = search.value.toLowerCase()
        return (
          blog.title.toLowerCase().includes(searchTerm) ||
          blog.author.toLowerCase().includes(searchTerm)
        )
      })
    return ( 
        <section className="section_index">  

            <div className="box_search flex_between">
                <input type="search" value={search.value} onChange={search.onChange} placeholder='Search ...' className='input_search'/>
                <FiSearch size={25}/>
            </div>
            <CardBlog data={filteredBlogs} />

        </section> 
    )
}
export default Index
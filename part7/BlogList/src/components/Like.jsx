
import { useMutation, useQueryClient} from '@tanstack/react-query'
import blogService from '../services/blogService'
import playClickSound from "../utils/sonClick"

const Like = ({blog}) => {

    const queryClient = useQueryClient()

    const updateBlogMutation = useMutation({
        mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
        onSuccess: (updatedBlog) => {

            const blogs = queryClient.getQueryData(['blogs'])
            if (blogs) {
              queryClient.setQueryData(['blogs'],
                blogs.map(a => a.id !== updatedBlog.id ? a : { ...updatedBlog, user: a.user })
              )
            }
          

            queryClient.setQueryData(['user', updatedBlog.user], (oldUserData) => {
                if (!oldUserData) return oldUserData
            
                return {
                  ...oldUserData,
                  blogs: oldUserData.blogs.map(blog =>
                    blog.id !== updatedBlog.id
                      ? blog
                      : { ...updatedBlog, user: updatedBlog.user }
                  ),
                }
            })
              
          
            queryClient.setQueryData(['blog', updatedBlog.id], (oldBlog) => {
              if (!oldBlog) return oldBlog
              return { 
                ...oldBlog, 
                ...updatedBlog, 
                user:  oldBlog.user, 
                comments: oldBlog.comments 
              }
            })
          }
          
    })


    const handleLike = () => {
      playClickSound()
        const updated = { ...blog, likes: blog.likes + 1, user: blog.user.id || blog.user  }
        updateBlogMutation.mutate({ id: blog.id, updatedBlog: updated }) 
    }

    return (
        <div className="flex_start action_card pointer txt_base" onClick={handleLike}>
            <div className="">Likes</div>
            <div className="">{blog.likes}</div>
        </div>
    )
}
export default Like
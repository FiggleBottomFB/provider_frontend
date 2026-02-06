import { useEffect, useState } from 'react';
import { getAllBlogs, addBlog, deleteBlog, editBlog, getBlogPosts, addBlogPost } from '../apicalls';
import { data, Outlet, useNavigate } from 'react-router-dom';
import '.././CSS/blogmeny.css'
import '.././CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext';
import { useApi } from '../hooks/useApi';
import LoadingAndErrorHandler from '../LoadingAndErrorhandler';
import Spinner from '../spinnertest';




function DisplayBlogs({LatestBlogs, blogRequest}){
    const navigate = useNavigate()
    const {user}= useAuth()

    return(
        <div id="latest-blogs-container">
            {LatestBlogs.map((blog, index) =>(
                <div key={index} className='flex-row'>
                    <div id="blog-display-container" onClick={()=>{navigate("/blog/"+blog.id)}}>
                        <h1>{blog.title}</h1>
                        <p>{blog.description}</p>
                    </div>
                    <div id="blog-buttons-container" className="flex-column justify-around">
                        <button className="handle-blog-button" onClick={()=>{navigate("edit/"+blog.id)}}>Redigera</button>
                        <button className="handle-blog-button" onClick={async ()=>{await deleteBlog(user.token, blog.id); blogRequest.refetch()}}>Ta bort</button>
                    </div>
                </div>
            ))}
        </div>
    )
}


function Blogmeny(){
    const [LatestBlogs, setLatestBlogs] = useState([])
    const [SearchQuery, setSearchQuery] = useState("")
    const {user} = useAuth()
    

    const fetchBlogs = async ({ signal }) => {
       return await getAllBlogs(user.token,"",signal)
    }
    
    const blogRequest = useApi(fetchBlogs, [user], !!user?.token);


   if (blogRequest.loading || blogRequest.error) return <LoadingAndErrorHandler Loading={blogRequest.loading} Error={blogRequest.error} />
console.log(blogRequest)
    return (
        <div>
            {/* <DisplayBlogButton /> */}
            <DisplayBlogs LatestBlogs={blogRequest.data.blogs} blogRequest={blogRequest} />
        </div>
    )
}

export default Blogmeny
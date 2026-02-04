import { useEffect, useState } from 'react';
import { getAllBlogs, addBlog, deleteBlog, editBlog, getBlogPosts, addBlogPost } from '../apicalls';
import { data, Outlet, useNavigate } from 'react-router-dom';
import '.././CSS/blogmeny.css'
import '.././CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext';
import { useApi } from '../hooks/useApi';
import LoadingAndErrorHandler from '../LoadingAndErrorhandler';


//ADMIN ONLY MOVE AWAY FROMHERE
function DisplayBlogButton(){
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchBlogs = async () =>{
            const verifyAlreadyHaveBlog = await getAllBlogs(window.sessionStorage("token"))
            const { user } = useAuth()
            verifyAlreadyHaveBlog.array.forEach(blog => {
                if(blog.id == user.id){
                    return
                }
            });
        }
        // fetchBlogs()
    }, [])

    return(
        <div>
            <button onClick={()=>{navigate("add")}}>Skapa en blogg</button>
        </div>
    )
}




function DisplayBlogs({LatestBlogs}){
    const navigate = useNavigate()
    const {user}= useAuth()

    return(
        <div id="latest-blogs-container">
            {LatestBlogs.map((blog, index) =>(
                <div key={index}>
                    <div id="blog-display-container" onClick={()=>{navigate("/blog/"+blog.id)}}>
                        <h1>{blog.title}</h1>
                        <p>{blog.description}</p>
                    </div>
                    <button onClick={()=>{navigate("edit/"+blog.id)}}>Redigera</button>
                    <button onClick={()=>{deleteBlog(user.token, post.id)}}>Ta bort</button>
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

    return (
        <div>
            {/* <DisplayBlogButton /> */}
            <DisplayBlogs LatestBlogs={blogRequest.data.blogs} />
        </div>
    )
}

export default Blogmeny
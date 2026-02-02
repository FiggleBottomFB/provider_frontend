import { useEffect, useState } from 'react';
import { getAllBlogs, addBlog, deleteBlog, editBlog, getBlogPosts, addBlogPost } from '../apicalls';
import { Outlet, useNavigate } from 'react-router-dom';
import '.././CSS/blogmeny.css'
import '.././CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext';


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

function DisplayBlogs({LatestBlogs, setLatestBlogs}){
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBlogs = async () => {
            const latestBlogData = await getAllBlogs(window.sessionStorage.getItem("token"))
            setLatestBlogs(latestBlogData.blogs)
        }
        fetchBlogs()
    }, [])

    return(
        <div id="latest-blogs-container">
            {LatestBlogs.map((blog, index) =>(
                <div key={index}>
                    <div id="blog-display-container" onClick={()=>{navigate("/blog/"+blog.id)}}>
                        <h1>{blog.title}</h1>
                        <p>{blog.description}</p>
                    </div>
                    <button onClick={()=>{navigate("edit/"+blog.id)}}>Redigera</button>
                    <button onClick={()=>{deleteBlog(window.sessionStorage.getItem("token"), post.id)}}>Ta bort</button>
                </div>
            ))}
        </div>
    )
}


function Blogmeny(){
    const [BlogPosts, setBlogPosts] = useState([])
    const [LatestBlogs, setLatestBlogs] = useState([])
    const [SearchQuery, setSearchQuery] = useState("")

    return (
        <div>
            <DisplayBlogButton />
            <DisplayBlogs LatestBlogs={LatestBlogs} setLatestBlogs={setLatestBlogs} BlogPosts={BlogPosts} setBlogPosts={setBlogPosts} />
        </div>
    )
}

export default Blogmeny
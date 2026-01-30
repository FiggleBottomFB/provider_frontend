import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getBlogPosts, getBlog, deleteBlogPost } from "../apicalls";
import '../CSS/blog.css'
import '../CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext'

function DisplayBlogPosts({Posts, setPosts, Blog, setBlog}){
    const navigate = useNavigate()
    let params = useParams();
    const blogid = params.blogid

    useEffect(() => {
        const fetchBlog = async () => {
            const currentBlog = await getBlog(window.sessionStorage.getItem("token"), blogid)
            setBlog(currentBlog.fields)
        }
        fetchBlog()
    }, [])


    useEffect(() => {
        const fetchPosts = async () => {
            const latestBlogPosts = await getBlogPosts(window.sessionStorage.getItem("token"), blogid)
            setPosts(latestBlogPosts.posts)
        }
        fetchPosts()
    }, [])

    return(
        <div id="blog-full-container">
            <div id="latest-posts-container">
                <button id="back-arrow-button" onClick={()=>{navigate("/blog")}}>←</button>
                <h1 id="current-blog-title">{Blog.title}</h1>
                {
                    Posts.map((post, index)=>(
                        <div key={index}>
                            <div id="post-display-container" onClick={()=>{navigate("/blog/blog/"+post.id)}}>
                                <h1>{post.title}</h1>
                                {
                                    post.tags.map((tag, tagindex)=>(
                                        <p key={tagindex}>
                                            {tag}
                                        </p>
                                    ))
                                }
                            </div>
                            <button onClick={()=>{navigate(".././blog/edit/"+post.id)}}>Redigera</button>
                            <button onClick={()=>{deleteBlogPost(window.sessionStorage.getItem("token"), post.id)}}>Ta bort</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


function Blog(){
    const {user} = useAuth()
    const [Posts, setPosts] = useState([])
    const [Blog, setBlog] = useState([])

    return(
        <div>
            <DisplayBlogPosts Posts={Posts} setPosts={setPosts} Blog={Blog} setBlog={setBlog}/>
        </div>
    )
}

export default Blog
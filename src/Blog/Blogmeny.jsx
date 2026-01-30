import { useEffect, useState } from 'react';
import { getAllBlogs, addBlog, deleteBlog, editBlog, getBlogPosts, addBlogPost, deleteBlogPost } from '../apicalls';
import { Outlet, useNavigate } from 'react-router-dom';
import '.././CSS/blogmeny.css'
import '.././CSS/commonclass.css'


function DisplayBlogs({LatestBlogs, setLatestBlogs}){
    const navigate = useNavigate()
    useEffect(() => {
        const fetchPosts = async () => {
            const latestBlogData = await getAllBlogs(window.sessionStorage.getItem("token"))
            setLatestBlogs(latestBlogData.blogs)
            console.log(latestBlogData.blogs)
        }
        fetchPosts()
    }, [])

    return(
        <div id="latest-posts-container">
            {LatestBlogs.map((blog, index) =>(
                <div key={index} id="blog-display-container" onClick={()=>{navigate("/blog/"+blog.id)}}>
                    <h1>{blog.title}</h1>
                    <p>{blog.description}</p>
                </div>
            ))}
        </div>
    )
}


function Blogmeny(){
    const [BlogPosts, setBlogPosts] = useState([])
    const [LatestBlogs, setLatestBlogs] = useState([])
    const [SearchQuery, setSearchQuery] = useState("")
    const getAllBlogsFunction = async ()=>{ 
        const allBlogs = await getAllBlogs(window.sessionStorage.getItem("token")) 
        console.log(allBlogs)
    }
    const addBlogFunction = async ()=>{
        const newBlog = await addBlog(window.sessionStorage.getItem("token"), 7, {"title": "hej", "description": "beskrivning"})
        console.log(newBlog)
    }
    const editBlogFunction = async ()=>{
        const editBlogVar = await editBlog(window.sessionStorage.getItem("token"), 15, {"title": "hej redigerad", "description": "beskrivning redigerad"})
        console.log(editBlogVar)
    }
    const deleteBlogFunction = async ()=>{
        const deleteBlogVar = await deleteBlog(window.sessionStorage.getItem("token"), 15)
        console.log(deleteBlogVar)
    }
    
    const makeBlogPost = async ()=>{ 
        const getAllBlogPostsVar = await addBlogPost(window.sessionStorage.getItem("token"), 15, {"title": "sida om plankor", "content": "jag gillar plankor", "tags": ["plankor", "trä"]}) 
        console.log(getAllBlogPostsVar)
    }
    const deleteBlogPostFunction = async ()=>{ 
        const getAllBlogPostsVar = await deleteBlogPost(window.sessionStorage.getItem("token"), 15) 
        console.log(getAllBlogPostsVar)
    }

    return (
        <div>
            <button onClick={
                ()=>{addBlogFunction()}}>
                Lägg till en blog
            </button>
            <button onClick={
                ()=>{editBlogFunction()}}>
                Redigera en blog
            </button>
            <button onClick={
                ()=>{deleteBlogFunction()}}>
                Ta bort en blog
            </button>
            <br />
            <button onClick={()=>{makeBlogPost()}}>
                Gör ett blogginlägg
            </button>
            <button onClick={()=>{deleteBlogPostFunction()}}>
                Ta bort ett blogginlägg
            </button>
            <DisplayBlogs LatestBlogs={LatestBlogs} setLatestBlogs={setLatestBlogs} BlogPosts={BlogPosts} setBlogPosts={setBlogPosts} />
        </div>
    )
}

export default Blogmeny
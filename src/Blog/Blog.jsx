import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getBlogPosts, getBlog, deleteBlogPost } from "../apicalls";
import '../CSS/blog.css'
import '../CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext'
import { useApi } from "../hooks/useApi";
import LoadingAndErrorHandler from "../LoadingAndErrorhandler";

function DisplayBlogPosts({}){

    let params = useParams();
    const blogid = params.blogid
    const {user} = useAuth();


/*BLOG*/

const fetchBlog = async ({ signal }) => {
    return await getBlog(user.token, blogid, signal);
  };
  
  const blogRequest = useApi(fetchBlog, [user, blogid], !!user);
  
/*POST*/

const fetchPosts = async ({ signal }) => {
    return await getBlogPosts(user.token, blogid,"", signal);
    };
    
    const postRequest = useApi(fetchPosts, [user, blogid], !!user);
    //postRequest.data.post


if (blogRequest.loading || blogRequest.error) return <LoadingAndErrorHandler Loading={blogRequest.loading} Error={blogRequest.error} />

    return(
        <div id="blog-full-container">
            <div id="latest-posts-container">
                
                <BlogTitle title={blogRequest?.data.fields.title}/>
                <BlogPostsContainer postRequest={postRequest}/>
            </div>
        </div>
    )
}

function BlogTitle({title}){

    return (
        <h1 id="current-blog-title">{title}</h1>
    )
}

function BlogPostsContainer({postRequest}){
    const {user} = useAuth();
    const navigate = useNavigate()



  if (postRequest.loading || postRequest.error) return <LoadingAndErrorHandler Loading={postRequest.loading} Error={postRequest.error} />

  return (
    postRequest.data.posts.map((post, index)=>(
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
                <button onClick={()=>{deleteBlogPost(user?.token, post.id)}}>Ta bort</button>
            </div>
        ))
    )   
}



function Blog(){
    const navigate = useNavigate()
    // const [Posts, setPosts] = useState([])
    // const [Blog, setBlog] = useState([])

    return(
        <div>
            <button id="back-arrow-button" onClick={()=>{navigate("/blog")}}>←</button>
            <DisplayBlogPosts />
        </div>
    )
}

export default Blog
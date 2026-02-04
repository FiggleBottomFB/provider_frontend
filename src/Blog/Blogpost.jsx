import { useState, useEffect } from "react";
import { getBlogPost } from "../apicalls";
import { useParams, useNavigate } from "react-router";
import { addBlogComment, deleteBlogComment } from "../apicalls";
import '.././CSS/blogpost.css'
import '.././CSS/commonclass.css'
import DisplayComments from "../Comments";
import { useAuth } from "../Auth/Authcontext";
import { useApi } from "../hooks/useApi";


function DisplayBlogPost({}){
  const [RefreshBlog, setRefreshBlog] = useState(1)
  const navigate = useNavigate()
  let params = useParams();
  const postid = params.blogpostid
  const {user}=useAuth()

  // useEffect(()=>{
  //   const fetchPost = async () =>{ 
  //     const blogPostData = await getBlogPost(user?.token, postid)
  //     setBlogPost(blogPostData.fields)
  //     setComments(blogPostData.fields.comments)
  //   }
  //   fetchPost()
  // }, [])

  const fetchBlog = async ({ signal }) => {
        return await getBlogPost(user?.token, postid, signal)
    }  
  const blogPostRequest = useApi(fetchBlog, [user?.token,RefreshBlog], !!user?.token);



  const handleAddComment = async (token, body, content) => {
    await addBlogComment(token, body, content)
  
    setRefreshBlog(1)
  }
  
  const handleDeleteComment = async (token, commentId) => {
    await deleteBlogComment(token, commentId)
  
    setRefreshBlog(1)
  }

  if (blogPostRequest.loading ) return <p>Loading...</p>;
  if (blogPostRequest.error) return <p>Error loading blog: {blogPostRequest.error}</p>;
  

  return(
    <div id="blog-post-container">
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <div id="blog-post-info-container">
      <BlogPostFrame title={blogPostRequest.data.fields.title} content={blogPostRequest.data.fields.content}/>
      {/* <DisplayComments Comments={blogPostRequest?.data.fields.comments} addComment={handleAddComment} addToId={BlogPost.id} deleteComment={handleDeleteComment}/> */}
      </div>
    </div>
  )
}


function BlogPostFrame ({title,content}){

  return(
    <div id="blog-post-display-container" className="flex-column align-center">
    <h1>{title}</h1>
    <div>
      {/* {
        BlogPost.tags.map((tag, index)=>(
          <p>{tag}</p>
        ))
      } */}
    </div>
    {content}
  </div>
  )
}


function BlogPost(){
  
  return (
    <div>
      <DisplayBlogPost />
    </div>
  )
}

export default BlogPost
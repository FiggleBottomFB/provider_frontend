import { useState, useEffect } from "react";
import { getBlogPost } from "../apicalls";
import { useParams, useNavigate } from "react-router";
import { addBlogComment } from "../apicalls";
import '.././CSS/blogpost.css'
import '.././CSS/commonclass.css'
import DisplayComments from "../Comments";


function DisplayBlogPost({BlogPost, setBlogPost, Comments, setComments}){
  const navigate = useNavigate()
  let params = useParams();
  const postid = params.blogpostid

  useEffect(()=>{
    const fetchPost = async () =>{ 
      const blogPostData = await getBlogPost(window.sessionStorage.getItem("token"), postid)
      setBlogPost(blogPostData.fields)
      setComments(blogPostData.fields.comments)
    }
    fetchPost()
  }, [])


  return(
    <div id="blog-post-container">
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <div id="blog-post-info-container">
        <div id="blog-post-display-container" className="flex-column align-center">
          <h1>{BlogPost.title}</h1>
          <div>
            {/* {
              BlogPost.tags.map((tag, index)=>(
                <p>{tag}</p>
              ))
            } */}
          </div>
          {BlogPost.content}
        </div>
      <DisplayComments Comments={Comments} addComment={addBlogComment}/>
      </div>
    </div>
  )
}

function BlogPost(){
  const [BlogPost, setBlogPost] = useState([])
  const [Comments, setComments] = useState([])
  return (
    <div>
      <DisplayBlogPost BlogPost={BlogPost} setBlogPost={setBlogPost} Comments={Comments} setComments={setComments}/>
    </div>
  )
}

export default BlogPost
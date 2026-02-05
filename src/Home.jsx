import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import './CSS/blogmeny.css'
import './CSS/home.css'
import './CSS/commonclass.css'
import { useAuth } from './Auth/Authcontext';
import { getAllBlogs, getBlog, getBlogPost, getBlogPosts } from './apicalls';
import { useApi } from './hooks/useApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAndErrorHandler from './LoadingAndErrorhandler';
import DisplayComments from './Comments';


// VARNING TITTA EJ 

function DisplayBlogPosts({blogid, ShowBlogPost, setShowBlogPost, postid, setpostid, ShowBlog, setShowBlog, setShowBlogMenu, ShowBlogMenu}){
    const fetchBlog = async ({ signal }) => {
        return await getBlog("", blogid, signal);
    };
  
    const blogRequest = useApi(fetchBlog, [blogid]);
    const fetchPosts = async ({ signal }) => {
        return await getBlogPosts("", blogid,"", signal);
    };
    const postRequest = useApi(fetchPosts, [blogid]);
    if (blogRequest.loading || blogRequest.error) return <LoadingAndErrorHandler Loading={blogRequest.loading} Error={blogRequest.error} />

    return(
        <div id="blog-full-container">
            <div id="latest-posts-container">
                <button id="back-arrow-button" onClick={()=>{setShowBlogPost(ShowBlogPost ? !ShowBlogPost : ShowBlogPost); setShowBlog(!ShowBlog); setShowBlogMenu(!ShowBlogMenu)}}>←</button>
                <BlogTitle title={blogRequest?.data.fields.title}/>
                <BlogPostsContainer postRequest={postRequest} ShowBlogPost={ShowBlogPost} setShowBlogPost={setShowBlogPost} postid={postid} setpostid={setpostid} setShowBlog={setShowBlog} ShowBlog={ShowBlog} />
            </div>
        </div>
    )
}
function BlogTitle({title}){
    return (
        <h1 id="current-blog-title">{title}</h1>
    )
}
function BlogPostsContainer({postRequest, ShowBlogPost, setShowBlogPost, postid, setpostid, setShowBlog, ShowBlog}){
    if (postRequest.loading || postRequest.error) return <LoadingAndErrorHandler Loading={postRequest.loading} Error={postRequest.error} />
    return (
        postRequest.data.posts.map((post, index)=>(
            <div key={index} className="flex-row">
                <div id="post-display-container" onClick={()=>{
                    setShowBlogPost(!ShowBlogPost)
                    setpostid(post.id)
                    setShowBlog(!ShowBlog)
                    }}>
                    <h1>{post.title}</h1>
                    {
                        post.tags.map((tag, tagindex)=>(
                            <p key={tagindex}>
                                {tag}
                            </p>
                        ))
                    }
                </div>
            </div>
        ))
    )   
}
function DisplayBlogPost({postid, ShowBlogPost, setShowBlogPost, ShowBlog, setShowBlog}){
    const fetchBlog = async ({ signal }) => {
          return await getBlogPost("", postid, signal)
      }  
    const blogPostRequest = useApi(fetchBlog);
    const handleAddComment = async (body, content) => {
      await addBlogComment("", body, content)
    
      blogPostRequest.refetch()
    }
    const handleDeleteComment = async (token, commentId) => {
      await deleteBlogComment(token, commentId)
    
      blogPostRequest.refetch()
    }
    if (blogPostRequest.loading || blogPostRequest.error) return <LoadingAndErrorHandler Loading={blogPostRequest.loading} Error={blogPostRequest.error} />
    return(
      <div id="blog-post-container">
        <button id="back-arrow-button" onClick={()=>{setShowBlogPost(!ShowBlogPost); setShowBlog(!ShowBlog)}}>←</button>
        <div id="blog-post-info-container">
        <BlogPostFrame title={blogPostRequest.data.fields.title} content={blogPostRequest.data.fields.content}/>
        <DisplayComments Comments={blogPostRequest?.data.fields.comments} addComment={handleAddComment} addToId={blogPostRequest.data.fields.id} deleteComment={handleDeleteComment} addToString={"blogpostID"}/>
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

// SLUT PÅ VARNING (ISCH)

function Home(){
    const {user} = useAuth()
    const [ShowBlogMenu, setShowBlogMenu] = useState(true)
    const [ShowBlog, setShowBlog] = useState(false)
    const [ShowBlogPost, setShowBlogPost] = useState(false)
    const [blogid, setblogid] = useState(0)
    const [postid, setpostid] = useState(0)
    if(!user?.role){
        
        const fethAllPublic = async ({ signal }) => {
            return await getAllBlogs("","",signal)
        }
        
        const allPublicBlogs = useApi(fethAllPublic);

        if(!allPublicBlogs.data){
            return
        }
        return(
            <div id="public-blogs-container">
                {
                    ShowBlogMenu && (allPublicBlogs.data.blogs.map((blog, index)=>(
                        <div key={index} className='flex-row'>
                            <div id="blog-display-container" onClick={()=>{setShowBlog(!ShowBlog); setblogid(blog.id); setShowBlogMenu(!ShowBlogMenu)}}>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </div>
                    )))
                }
                {
                    ShowBlog && (<DisplayBlogPosts blogid={blogid} ShowBlogPost={ShowBlogPost} setShowBlogPost={setShowBlogPost} postid={postid} setpostid={setpostid} ShowBlog={ShowBlog} setShowBlog={setShowBlog} setShowBlogMenu={setShowBlogMenu} ShowBlogMenu={ShowBlogMenu}/>)
                }
                {
                    ShowBlogPost && (<DisplayBlogPost postid={postid} setpostid={setpostid} ShowBlogPost={ShowBlogPost} setShowBlogPost={setShowBlogPost} ShowBlog={ShowBlog} setShowBlog={setShowBlog}/>)
                }
            </div>
        )
    }
    return (
        <div id="home-container" className="align-center justify-around flex-row">
            <NavLink to="/wiki" className="home-route-link">
                <div className='justify-center align-center home-route-link-text-container'>Wiki</div>
            </NavLink>

            <NavLink to="/blog" className="home-route-link">
                <div className='justify-center align-center home-route-link-text-container'>Blog</div>
            </NavLink>

            <NavLink to="/calendar" className="home-route-link">
                <div className='justify-center align-center home-route-link-text-container'>Kalender</div>
            </NavLink>
        </div>
    )
}

export default Home
  
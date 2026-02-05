import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getBlogPosts, getBlog, deleteBlogPost } from "../apicalls";
import '../CSS/blog.css'
import '../CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext'
import { useApi } from "../hooks/useApi";
import Sidebar from "../Sidebar";
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
                <button id="back-arrow-button" onClick={()=>{navigate("/blog")}}>←</button>
                <AddBlogPostButton blogid={blogRequest?.data.fields.id}/>
                <BlogTitle title={blogRequest?.data.fields.title}/>
                <BlogPostsContainer postRequest={postRequest}/>
            </div>
        </div>
    )
}

function AddBlogPostButton({blogid}){
    const navigate = useNavigate()

    return(
      <button id="add-post-button" onClick={()=>{
        navigate("../addpost/"+blogid)
      }}>Gör ett inlägg</button>
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
            <div key={index} className="flex-row">
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
                <div id="blog-buttons-container" className="flex-column justify-around">
                    <button className="handle-blogpost-button" onClick={()=>{navigate(".././blog/edit/"+post.id)}}>Redigera</button>
                    <button className="handle-blogpost-button" onClick={()=>{deleteBlogPost(user?.token, post.id)}}>Ta bort</button>
                </div>
            </div>
        ))
    )   
}

function SearchTags(){
    const [SearchQuery, setSearchQuery] = useState("")
    const [CurrentWikiId, setCurrentWikiId] = useState(0)
    const [SearchedPosts, setSearchedPosts] = useState([])
    const {user} = useAuth()
    let params = useParams();
    const blogid = params.blogid
    const navigate = useNavigate()

    const fetchCurrentBlog = async ({signal}) =>{
        return await getBlog(user.token, blogid, signal)
    }
    let CurrentBlogFetch = useApi(fetchCurrentBlog, [user, blogid], !!user)

    if(CurrentBlogFetch.loading) return <p>Laddar...</p>
    if(CurrentBlogFetch.error) return <p>Fel vid hämtning av nuvarande blog...</p>
    console.log(CurrentBlogFetch.data.fields)

    return(
        <div>
            <input id="search-tags-input" placeholder="Sök efter taggar" type="text" onChange={async (e)=>{
                console.log(e.target.value)
                console.log(CurrentBlogFetch.data.fields.id)
                let dat4 = await getBlogPosts(user.token, CurrentBlogFetch.data.fields.id, `&tag=${encodeURIComponent(e.target.value)}`)
                console.log(dat4.posts)
                setSearchedPosts(dat4.posts)
                }}/>
            <div>
                {
                    SearchedPosts.map((post, index)=>(
                        <div id="go-to-wiki-page" key={index} onClick={()=>{
                            navigate("/blog/blog/"+post.id)
                            }}>
                            {post.title}
                        </div>
                    ))
                }
                </div>
        </div>
    )
}


function Blog(){
    const navigate = useNavigate()
    // const [Posts, setPosts] = useState([])
    // const [Blog, setBlog] = useState([])

    return(
        <div>
            <button id="back-arrow-button" onClick={()=>{navigate("/blog")}}>←</button>
            <Sidebar><SearchTags/></Sidebar>
            <DisplayBlogPosts />
        </div>
    )
}

export default Blog
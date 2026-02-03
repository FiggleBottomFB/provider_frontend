import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getBlogPost, linkTags, editBlogPost } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editblog.css'
import { useAuth } from "../Auth/Authcontext";


function DisplayEditContainer({BlogPost, setBlogPost, Title, setTitle, Content, setContent, Settings, setSettings}){
  const navigate = useNavigate()
  let params = useParams();
  const postid = params.blogpostid
  const {user} = useAuth()

  useEffect(()=>{
    const fetchPost = async () =>{ 
      const blogPostData = await getBlogPost(user.token, postid)
      setBlogPost(blogPostData.fields)
      setTitle(blogPostData.fields.title)
      // setTags(blogPostData.fields.tags)
      setContent(blogPostData.fields.content)
      setSettings(blogPostData.fields.settings)
    }
    fetchPost()
  }, [])
  return(
    <div>
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <div id="edit-post-input-container" className="align-center flex-column">
        <input id="edit-post-title-input" type="text" value={Title} onChange={(e) => {setTitle(e.target.value)}} autoComplete="off"/>
        <textarea name="" value={Content} id="edit-post-content-input" onChange={(e)=>{setContent(e.target.value)}} rows={15} cols={100}></textarea>
        <button onClick={()=>{
          editBlogPost(user.token, BlogPost.id, {"title": Title, "content": Content})
          navigate(-1)
        }}>Spara ändringar</button>
      </div>
    </div>
  )
}


function EditBlogPost(){
  const [BlogPost, setBlogPost] = useState([])
  const [Tags, setTags] = useState([])
  const [Title, setTitle] = useState("")
  const [Content, setContent] = useState("")
  const [Settings, setSettings] = useState([])


  return (
    <div>
      <DisplayEditContainer BlogPost={BlogPost} setBlogPost={setBlogPost} Title={Title} setTitle={setTitle} Content={Content} setContent={setContent} Settings={Settings} setSettings={setSettings} />
    </div>
  )
}

export default EditBlogPost
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getBlog, linkTags, editBlog } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editblog.css'


function DisplayEditContainer({Blog, setBlog, Title, setTitle, Description, setDescription, Settings, setSettings, IsPublic, setIsPublic}){
  const navigate = useNavigate()
  let params = useParams();
  const blogid = params.blogid

  useEffect(()=>{
    const fetchBlog = async () =>{ 
      const blogData = await getBlog(window.sessionStorage.getItem("token"), blogid)
      console.log(blogData)
      setBlog(blogData.fields)
      setTitle(blogData.fields.title)
      setIsPublic(blogData.fields.public)
      setDescription(blogData.fields.description)
      setSettings(blogData.fields.settings)
    }
    fetchBlog()
  }, [])
  return(
    <div>
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <div id="edit-post-input-container" className="align-center flex-column">
        <input id="edit-post-title-input" type="text" value={Title} onChange={(e) => {setTitle(e.target.value)}} autoComplete="off"/>
        <textarea name="" value={Description} id="edit-post-content-input" onChange={(e)=>{setContent(e.target.value)}}></textarea>
        <input type="checkbox" defaultChecked={IsPublic}/>
        <button onClick={()=>{
          editBlog(window.sessionStorage.getItem("token"), Blog.id, {"title": Title, "description": Description})
          navigate(-1)
        }}>Spara ändringar</button>
      </div>
    </div>
  )
}


function EditBlog(){
  const [Blog, setBlog] = useState([])
  const [IsPublic, setIsPublic] = useState(Boolean)
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Settings, setSettings] = useState([])


  return (
    <div>
      <DisplayEditContainer Blog={Blog} setBlog={setBlog} Title={Title} setTitle={setTitle} Description={Description} setDescription={setDescription} Settings={Settings} setSettings={setSettings} IsPublic={IsPublic} setIsPublic={setIsPublic}/>
    </div>
  )
}

export default EditBlog
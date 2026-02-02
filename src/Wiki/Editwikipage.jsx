import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getWikiPage, linkTags, editBlogPost } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editwiki.css'


function DisplayEditContainer({WikiPage, setWikiPage, Title, setTitle, Content, setContent, Settings, setSettings}){
  const navigate = useNavigate()
  let params = useParams();
  const postid = params.blogpostid

  useEffect(()=>{
    const fetchPost = async () =>{ 
      const wikiPageData = await getWikiPage(window.sessionStorage.getItem("token"), postid)
      setWikiPage(wikiPageData.fields)
      setTitle(wikiPageData.fields.title)
      // setTags(blogPostData.fields.tags)
      setContent(wikiPageData.fields.content)
      setSettings(wikiPageData.fields.settings)
    }
    fetchPost()
  }, [])
  return(
    <div>
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <div id="edit-page-input-container" className="align-center flex-column">
        <input id="edit-page-title-input" type="text" value={Title} onChange={(e) => {setTitle(e.target.value)}} autoComplete="off"/>
        <textarea name="" value={Content} id="edit-page-content-input" onChange={(e)=>{setContent(e.target.value)}}></textarea>
        <button onClick={()=>{
          editBlogPost(window.sessionStorage.getItem("token"), WikiPage.id, {"title": Title, "content": Content})
          navigate(-1)
        }}>Spara ändringar</button>
      </div>
    </div>
  )
}


function EditWikiPage(){
  const [WikiPage, setWikiPage] = useState([])
  const [Tags, setTags] = useState([])
  const [Title, setTitle] = useState("")
  const [Content, setContent] = useState("")
  const [Settings, setSettings] = useState([])


  return (
    <div>
      <DisplayEditContainer WikiPage={WikiPage} setWikiPage={setWikiPage} Title={Title} setTitle={setTitle} Content={Content} setContent={setContent} Settings={Settings} setSettings={setSettings} />
    </div>
  )
}

export default EditWikiPage


import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getWikiPage, linkTags, editWikiPage, unlinkTags } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editwiki.css'
import { useAuth } from "../Auth/Authcontext";
import { useApi } from "../hooks/useApi";


function DisplayEditContainer({WikiPage, setWikiPage, Title, setTitle, Content, setContent, Settings, setSettings}){
  const navigate = useNavigate()
  let params = useParams();
  const pageid = params.wikipageid
  const {user} = useAuth()
  const [Tags, setTags] = useState([])
  const [Tag, setTag] = useState("")

  useEffect(()=>{
    const fetchPost = async () =>{ 
      const wikiPageData = await getWikiPage(user.token, pageid)
      console.log(wikiPageData)
      setWikiPage(wikiPageData.fields)
      setTitle(wikiPageData.fields.title)
      setTags(wikiPageData.fields.tags)
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
        <textarea name="" value={Content} id="edit-page-content-input" onChange={(e)=>{setContent(e.target.value)}} rows={15} cols={100}></textarea>
        <form action="" onSubmit={(e)=>{
            e.preventDefault()
            setTags([...Tags, Tag])
            linkTags(user.token, {"wikipageID": pageid, "tags": [Tag]})
            }}>
            <h3>Lägg till en tagg</h3>
            <input id="add-title-input" type="text" value={Tag} onChange={(e)=>{setTag(e.target.value)}} autoComplete="off" />
            <button type="submit">Lägg till tagg</button>
        </form>
        <div>
          {
            Tags.map((tag, index)=>(
              <div key={index} className="flex-row align-center">
                <p>{tag}</p>
                <button id="delete-tag-button" onClick={()=>{
                  unlinkTags(user.token, {"wikipageID": pageid, "tags": [tag]})
              }}>x</button></div>
            ))
          }
        </div>
        <button onClick={()=>{
          editWikiPage(user.token, pageid, {"title": Title, "content": Content})
          navigate(-1)
        }}>Spara ändringar</button>
      </div>
    </div>
  )
}


function EditWikiPage(){
  const [WikiPage, setWikiPage] = useState([])
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


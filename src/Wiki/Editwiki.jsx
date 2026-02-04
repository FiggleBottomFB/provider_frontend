import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getWiki, linkTags, editWiki } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editblog.css'
import { useAuth } from "../Auth/Authcontext";


function DisplayEditContainer({Wiki, setWiki, Title, setTitle, Description, setDescription, Settings, setSettings}){
  const navigate = useNavigate()
  let params = useParams();
  const wikiid = params.wikiid
  const {user} = useAuth()
  const [IsPublic, setIsPublic] = useState(Boolean)

  useEffect(()=>{
    const fetchWiki = async () =>{ 
      const wikiData = await getWiki(user.token, wikiid)
      console.log(wikiData)
      setWiki(wikiData.fields)
      setTitle(wikiData.fields.title)
      setIsPublic(wikiData.fields.public)
      setDescription(wikiData.fields.description)
      setSettings(wikiData.fields.settings)
    }
    fetchWiki()
  }, [])
  return(
    <div>
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <div id="edit-post-input-container" className="align-center flex-column">
        <input id="edit-post-title-input" type="text" value={Title} onChange={(e) => {setTitle(e.target.value)}} autoComplete="off"/>
        <textarea name="" value={Description} id="edit-post-content-input" onChange={(e)=>{setDescription(e.target.value)}} rows={15} cols={100}></textarea>
        {/* <input type="checkbox" defaultChecked={IsPublic}/> */}
        <button onClick={()=>{
          editWiki(user.token, Wiki.id, {"title": Title, "description": Description})
          navigate(-1)
        }}>Spara ändringar</button>
      </div>
    </div>
  )
}


function EditWiki(){
  const [Wiki, setWiki] = useState([])
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Settings, setSettings] = useState([])


  return (
    <div>
      <DisplayEditContainer Wiki={Wiki} setWiki={setWiki} Title={Title} setTitle={setTitle} Description={Description} setDescription={setDescription} Settings={Settings} setSettings={setSettings}/>
    </div>
  )
}

export default EditWiki

import { useState, useEffect } from "react"
import '.././CSS/addblog.css'
import '.././CSS/commonclass.css'
import { useNavigate, useParams } from "react-router"
import { useAuth } from "../Auth/Authcontext"
import { addBlogPost, linkTags } from "../apicalls"

function DisplayAddContainer({Title, setTitle, Content, setContent}){

    const param = useParams()
    const blogid = param.blogid
    const {user} = useAuth()
    const navigate = useNavigate()

    const [Tags, setTags] = useState([])
    const [Tag, setTag] = useState("")
    return(
        <div id="add-blogpost-full-container">
            <div id="add-blog-input-container" className="flex-column align-center">
                <h3>Titel</h3>
                <input id="add-title-input" type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}} autoComplete="off" />
                <h3>Innehåll</h3>
                <textarea name="" id="add-description-input" value={Content} onChange={(e)=>{setContent(e.target.value)}} rows={15} cols={100}></textarea>

                <form action="" onSubmit={(e)=>{
                    e.preventDefault()
                    setTags([...Tags, Tag])
                    }}>
                    <h3>Lägg till en tagg</h3>
                    <input id="add-title-input" type="text" value={Tag} onChange={(e)=>{setTag(e.target.value)}} autoComplete="off" />
                    <button type="submit">Lägg till tagg</button>
                </form>
                {
                    Tags.map((tag, index)=>(
                        <div key={index}><p>{tag}</p></div>
                    ))
                }

                <button id="add-blog-post-button" onClick={async ()=>{
                    const returnVal = await addBlogPost(user.token, blogid, {"title": Title, "content": Content})
                    linkTags(user.token, {"blogpostID": returnVal.blogpostID, "tags": Tags})
                    navigate(-1)
                    }}>Skapa inlägg</button>
            </div>
        </div>
    )
}

function AddBlogPost(){
    const navigate = useNavigate()
    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    return(
        <div>
            <button onClick={()=>{navigate(-1)}}>←</button>
            <DisplayAddContainer Title={Title} setTitle={setTitle} Content={Content} setContent={setContent}/>
        </div>
    )
}

export default AddBlogPost
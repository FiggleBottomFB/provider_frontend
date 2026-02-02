import { useState, useEffect } from "react"
import '.././CSS/addblog.css'
import '.././CSS/commonclass.css'
import { useNavigate, useParams } from "react-router"
import { useAuth } from "../Auth/Authcontext"
import { addBlogPost } from "../apicalls"

function DisplayAddContainer({Title, setTitle, Content, setContent}){
    const navigate = useNavigate()
    const param = useParams()
    const blogid = param.blogid
    const {user} = useAuth()

    return(
        <div>
            <button onClick={()=>{navigate(-1)}}>←</button>
            <div id="add-blog-input-container" className="flex-column align-center">
                <h3>Titel</h3>
                <input id="add-title-input" type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}} autoComplete="off" />
                <h3>Innehåll</h3>
                <textarea name="" id="add-description-input" value={Content} onChange={(e)=>{setContent(e.target.value)}} rows={15} cols={100}></textarea>
                <button id="add-blog-post-button" onClick={()=>{addBlogPost(user.token, blogid, {"title": Title, "content": Content})}}>Skapa inlägg</button>
            </div>
        </div>
    )
}

function AddBlogPost(){
    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    return(
        <div>
            <DisplayAddContainer Title={Title} setTitle={setTitle} Content={Content} setContent={setContent}/>
        </div>
    )
}

export default AddBlogPost
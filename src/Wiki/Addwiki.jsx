import { useState, useEffect } from "react"
import '.././CSS/addblog.css'
import '.././CSS/commonclass.css'
import { useNavigate } from "react-router"
import { addWiki } from "../apicalls"
import { useAuth } from "../Auth/Authcontext"

function DisplayAddContainer({Title, setTitle, Description, setDescription}){
    const navigate = useNavigate()
    const {user} = useAuth()

    return(
        <div>
            <button onClick={()=>{navigate(-1)}}>←</button>
            <div id="add-blog-input-container" className="flex-column align-center">
                <h3>Titel</h3>
                <input id="add-title-input" type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}} autoComplete="off" />
                <h3>Beskrivning</h3>
                <textarea name="" id="add-description-input" value={Description} onChange={(e)=>{setDescription(e.target.value)}} rows={15} cols={100} ></textarea>
                <button id="add-wiki-button" onClick={()=>{
                    addWiki(user.token, user.id, {"title": Title, "description": Description})
                    navigate(-1)
                    }}>Skapa wiki</button>
            </div>
        </div>
    )
}

function AddWiki(){
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    return(
        <div>
            <DisplayAddContainer Title={Title} setTitle={setTitle} Description={Description} setDescription={setDescription}/>
        </div>
    )
}

export default AddWiki
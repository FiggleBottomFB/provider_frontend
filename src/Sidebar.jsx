import { useState, useEffect } from "react"
import { getWiki, getWikiPages } from "./apicalls"
import { useAuth } from "./Auth/Authcontext"
import { useParams } from "react-router"
import './CSS/sidebar.css'



function Sidebar({children}){
    const [IsHidden, setIsHidden] = useState(false)
    if(!IsHidden){
        return(
            <div id="sidebar-full-container">
                <button id="show-sidebar-button" onClick={()=>{setIsHidden(!IsHidden)}}>Visa</button>
                {children}
            </div>
        )
    }
    else{
        return(
            <div id="sidebar-show">
                <button id="show-sidebar-button" onClick={()=>{setIsHidden(!IsHidden)}}>Visa</button>
            </div>
        )
    }
}

export default Sidebar
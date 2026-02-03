import { useEffect, useState } from "react"
import { getWikiHistory, restoreWikiHistory } from "../apicalls"
import { useAuth } from "../Auth/Authcontext"
import { useParams } from "react-router"
import { useApi } from "../hooks/useApi"
import '../CSS/wiki.css'
import '../CSS/commonclass.css'

function WikiPageHistory(){
    const {user} = useAuth()
    let params = useParams();
    const pageid = params.wikipageid

    const fetchWikiHistory = async ({signal}) =>{
        return await getWikiHistory(user.token, pageid, signal)
    }
    let WikiHistoryfetch = useApi(fetchWikiHistory, [user, pageid], !!user)
    if(WikiHistoryfetch.loading) return <p>Laddar...</p>
    if(WikiHistoryfetch.error) return <p>Fel vid hämtning av tidigare versioner...</p>

    return (
        <div id="wiki-page-history-container">
            <h1>Tidigare versioner</h1>
            {
                WikiHistoryfetch.data.history.map((version, index)=>(
                    <div key={index} id="wiki-page-version-container">
                        <div id="wiki-page-info-container">
                            {version.title} <br />
                            {version.timestamp} <br />
                            <button id="restore-version-button" onClick={()=>{restoreWikiHistory(user.token, version.id)}}>Återställ version</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default WikiPageHistory
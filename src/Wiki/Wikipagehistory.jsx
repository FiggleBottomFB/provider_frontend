import { useEffect, useState } from "react"
import { getWikiHistory, restoreWikiHistory, getPerson } from "../apicalls"
import { useAuth } from "../Auth/Authcontext"

function WikiPageHistory({WikiPage}){
    const [WikiHistory, setWikiHistory] = useState([])
    const {user} = useAuth()

    const [createdBy, setCreatedBy] = useState([])

    useEffect(()=>{
        const fetchWikiHistory = async () =>{
            const wikiHistory = getWikiHistory(user.token, WikiPage.id)
            setWikiHistory(wikiHistory)   
        }
        fetchWikiHistory()
    }, [])

    return (
        <div id="wiki-page-history-container">
            {
                WikiHistory.map((version, index)=>(
                    <div key={index} id="wiki-page-version-container">
                        {version.timestamp}
                        {
                            setCreatedBy(getPerson(user.token, version.id))
                        }
                        Redigerad av: {createdBy.name}
                        <button id="restore-version-button" onClick={()=>{restoreWikiHistory(user.id, version.id)}}>Återställ version</button>
                    </div>
                ))
            }
        </div>
    )
}

export default WikiPageHistory
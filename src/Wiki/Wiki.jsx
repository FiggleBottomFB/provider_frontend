import { useState, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import { getWikiPages, getWiki, deleteBlogPost, deleteWikiPage } from "../apicalls";
import '../CSS/wiki.css'
import '../CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext'

function DisplayWikiPages({Pages, setPages, Wiki, setWiki}){
    const navigate = useNavigate()
    let params = useParams();
    const wikiid = params.wikiid
    const {user} = useAuth()

    useEffect(() => {
        const fetchBlog = async () => {
            const currentWiki = await getWiki(user.token, wikiid)
            setWiki(currentWiki.fields)
        }
        fetchBlog()
    }, [])


    useEffect(() => {
        const fetchPosts = async () => {
            const latestWikiPages = await getWikiPages(user.token, wikiid)
            setPages(latestWikiPages.pages)
        }
        fetchPosts()
    }, [])

    if(Pages.length == 0){
        return(
            <div>
                <button id="back-arrow-button" onClick={()=>{navigate("/wiki")}}>←</button>
                <p>Inga sidor hittades i denna wiki</p>
            </div>
        )
    }

    return(
        <div id="wiki-full-container">
            <div id="latest-pages-container">
                <button id="back-arrow-button" onClick={()=>{navigate("/wiki")}}>←</button>
                <button id="add-page-button" onClick={()=>{navigate("../addpost/"+Wiki.id)}}>Gör en sida</button>
                <h1 id="current-wiki-title">{Wiki.title}</h1>
                {
                    Pages.map((page, index)=>(
                        <div key={index}>
                            <div id="page-display-container" onClick={()=>{navigate("/wiki/page/"+page.id)}}>
                                <h1>{page.title}</h1>
                                {
                                    page.tags.map((tag, tagindex)=>(
                                        <p key={tagindex}>
                                            {tag}
                                        </p>
                                    ))
                                }
                            </div>
                            <button onClick={()=>{navigate(".././edit/page/"+page.id)}}>Redigera</button>
                            <button onClick={()=>{deleteWikiPage(user.token, page.id)}}>Ta bort</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


function Wiki(){
    const {user} = useAuth()
    const [Pages, setPages] = useState([])
    const [Wiki, setWiki] = useState([])

    return(
        <div>
            <DisplayWikiPages Pages={Pages} setPages={setPages} Wiki={Wiki} setWiki={setWiki}/>
        </div>
    )
}


export default Wiki
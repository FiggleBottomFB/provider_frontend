import { useState, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import { getWikiPages, getWiki, deleteBlogPost, deleteWikiPage } from "../apicalls";
import '../CSS/wiki.css'
import '../CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext'
import { useApi } from "../hooks/useApi";
import Sidebar from "../Sidebar";

function DisplayWikiPages({Pages, setPages, Wiki, setWiki}){
    const navigate = useNavigate()
    let params = useParams();
    const wikiid = params.wikiid
    const {user} = useAuth()
    const [OffsetCount, setOffsetCount] = useState(1)


    useEffect(() => {
        const fetchBlog = async () => {
            const currentWiki = await getWiki(user.token, wikiid)
            setWiki(currentWiki.fields)
        }
        fetchBlog()
    }, [])


    useEffect(() => {
        const fetchPosts = async () => {
            const latestWikiPages = await getWikiPages(user.token, wikiid, "&limit=4")
            setPages(latestWikiPages.pages)
            setOffsetCount(OffsetCount + 1)
        }
        fetchPosts()
    }, [])

    if(Pages.length == 0){
        return(
            <div>
                {/* <button id="back-arrow-button" onClick={()=>{navigate("/wiki")}}>←</button> */}
                <button id="add-page-button" onClick={()=>{navigate("../addpage/"+Wiki.id)}}>Gör en sida</button>
                <p>Inga sidor hittades i denna wiki</p>
            </div>
        )
    }

    return(
        <div id="wiki-full-container">
            <div id="latest-pages-container">
                {/* <button id="back-arrow-button" onClick={()=>{navigate("/wiki")}}>←</button> */}
                <button id="add-page-button" onClick={()=>{navigate("../addpage/"+Wiki.id)}}>Gör en sida</button>
                <h1 id="current-wiki-title">{Wiki.title}</h1>
                {
                    Pages.map((page, index)=>(
                        <div key={index} className="flex-row">
                            <div id="page-display-container" onClick={()=>{navigate("/wiki/page/"+page.id)}}>
                                <h1>{page.title}</h1>
                                {
                                    page.tags.map((tag, tagindex)=>(
                                        <p key={tagindex} id="tag-container">
                                            {tag}
                                        </p>
                                    ))
                                }
                            </div>
                            <div id="wiki-menu-buttons-container" className='flex-column justify-around'>
                                <button className="wiki-choice-button" onClick={()=>{navigate(".././edit/page/"+page.id)}}>Redigera</button>
                                <button className="wiki-choice-button" onClick={()=>{deleteWikiPage(user.token, page.id)}}>Ta bort</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={async ()=>{
                setOffsetCount(OffsetCount + 1)
                const latestWikiPages = await getWikiPages(user.token, wikiid, "&limit="+(4*OffsetCount))
                setPages(latestWikiPages.pages)
                console.log(latestWikiPages)
            }}>Hämta fler sidor</button>
        </div>
    )
}

function SearchTags(){
    const [SearchQuery, setSearchQuery] = useState("")
    const [CurrentWikiId, setCurrentWikiId] = useState(0)
    const [SearchedPages, setSearchedPages] = useState([])
    const {user} = useAuth()
    let params = useParams();
    const wikiid = params.wikiid
    const navigate = useNavigate()

    const fetchCurrentWiki = async ({signal}) =>{
        return await getWiki(user.token, wikiid, signal)
    }
    let CurrentWikiFetch = useApi(fetchCurrentWiki, [user, wikiid], !!user)

    if(CurrentWikiFetch.loading) return <p>Laddar...</p>
    if(CurrentWikiFetch.error) return <p>Fel vid hämtning av nuvarande wikisida...</p>

    return(
        <div>
            <input id="search-tags-input" placeholder="Sök efter taggar" type="text" onChange={async (e)=>{
                setSearchQuery(e.target.value)
                let dat4 = await getWikiPages(user.token, CurrentWikiFetch.data.fields.id, `&tag=${encodeURIComponent(e.target.value)}`)
                console.log(dat4.pages)
                setSearchedPages(dat4.pages)
                }}/>
            <div>
                {
                    SearchedPages.map((page, index)=>(
                        <div id="go-to-wiki-page" key={index} onClick={()=>{
                            navigate("/wiki/page/"+page.id)
                            }}>
                            {page.title}
                        </div>
                    ))
                }
                </div>
        </div>
    )
}


function Wiki(){
    const [Pages, setPages] = useState([])
    const [Wiki, setWiki] = useState([])
    const navigate = useNavigate()

    return(
        <div id="show-wiki-peages-container">
            <Sidebar><SearchTags/></Sidebar>
            <button id="back-arrow-button" onClick={()=>{navigate("/wiki")}}>←</button>
            <DisplayWikiPages Pages={Pages} setPages={setPages} Wiki={Wiki} setWiki={setWiki}/>
        </div>
    )
}


export default Wiki
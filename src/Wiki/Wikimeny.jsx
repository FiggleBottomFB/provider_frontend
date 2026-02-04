import { useEffect, useState } from 'react';
import { getAllWikis, addBlog, deleteBlog, editBlog, getBlogPosts, addBlogPost, deleteWiki } from '../apicalls';
import { Outlet, useNavigate } from 'react-router-dom';
import '.././CSS/blogmeny.css'
import '.././CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext';


function DisplayWikiButton(){
    const navigate = useNavigate()
    const {user} = useAuth()

    if(user.role != "admin"){
        return
    }

    return(
        <div>
            <button id="add-wiki-button" onClick={()=>{navigate("add")}}>Skapa en wiki</button>
        </div>
    )
}

function DisplayWikis({LatestPages, setLatestPages}){
    const navigate = useNavigate()
    const {user} = useAuth()
    useEffect(() => {
        const fetchWikis = async () => {
            const latestWikiData = await getAllWikis(user.token)
            setLatestPages(latestWikiData.wikis)
        }
        fetchWikis()
    }, [])

    if(LatestPages.length == 0){
        return(
            <div>
                Inga wikis hittades
            </div>
        )
    }

    return(
        <div id="latest-wikis-container">
            {LatestPages.map((page, index) =>(
                <div key={index} id="wiki-container" className='flex-row'>
                    <div id="wiki-display-container" onClick={()=>{navigate("/wiki/"+page.id)}}>
                        <h1>{page.title}</h1>
                        <p>{page.description}</p>
                    </div>
                    <div id="wiki-menu-buttons-container" className='flex-column justify-around'>
                        <button className="wiki-choice-button" onClick={()=>{navigate("edit/"+page.id)}}>Redigera</button>
                        <button className="wiki-choice-button" onClick={()=>{deleteWiki(user.token, page.id)}}>Ta bort</button>
                    </div>
                </div>
            ))}
        </div>
    )
}


function Wikimeny(){
    const [WikiPages, setWikiPages] = useState([])
    const [LatestPages, setLatestPages] = useState([])
    const [SearchQuery, setSearchQuery] = useState("")

    return (
        <div>
            <DisplayWikiButton />
            <DisplayWikis LatestPages={LatestPages} setLatestPages={setLatestPages} WikiPages={WikiPages} setWikiPages={setWikiPages} />
        </div>
    )
}

export default Wikimeny



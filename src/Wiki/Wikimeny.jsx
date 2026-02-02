import { useEffect, useState } from 'react';
import { getAllWikis, addBlog, deleteBlog, editBlog, getBlogPosts, addBlogPost, deleteWiki } from '../apicalls';
import { Outlet, useNavigate } from 'react-router-dom';
import '.././CSS/blogmeny.css'
import '.././CSS/commonclass.css'
import { useAuth } from '../Auth/Authcontext';


function DisplayWikiButton(){
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchWikis = async () =>{
            const verifyAlreadyHaveWiki = await getAllWikis(window.sessionStorage("token"))
            const { user } = useAuth()
            verifyAlreadyHaveWiki.array.forEach(wiki => {
                if(wiki.id == user.id){
                    return
                }
            });
        }
        // fetchWikis()
    }, [])

    return(
        <div>
            <button onClick={()=>{navigate("add")}}>Skapa en wiki</button>
        </div>
    )
}

function DisplayWikis({LatestPages, setLatestPages}){
    const navigate = useNavigate()
    useEffect(() => {
        const fetchWikis = async () => {
            const latestBlogData = await getAllWikis(window.sessionStorage.getItem("token"))
            setLatestPages(latestBlogData.wikis)
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
        <div id="latest-blogs-container">
            {LatestPages.map((page, index) =>(
                <div key={index}>
                    <div id="blog-display-container" onClick={()=>{navigate("/wiki/"+page.id)}}>
                        <h1>{page.title}</h1>
                        <p>{page.description}</p>
                    </div>
                    <button onClick={()=>{navigate("edit/"+page.id)}}>Redigera</button>
                    <button onClick={()=>{deleteWiki(window.sessionStorage.getItem("token"), page.id)}}>Ta bort</button>
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



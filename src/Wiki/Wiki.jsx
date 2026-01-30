import { Outlet } from 'react-router-dom';
import { getAllWikis, addWiki } from '../apicalls';
import { useState } from 'react';

function Wiki(){
    const [AllWikis, setAllWikis] = useState([])
    const [SearchQuery, setSearchQuery] = useState("")
    const getAllWikisFunction = async ()=>{ 
        console.log(window.sessionStorage.getItem("token"))
        const allWikis = await getAllWikis(window.sessionStorage.getItem("token")) 
        console.log(allWikis)
    }
    const addWikiFunction = async ()=>{
        const newWiki = await addWiki(window.sessionStorage.getItem("token"), 7, {"title": "hej", "description": "beskrivning"})
    }
    
    return (
        <div>
            <button onClick={
                ()=>{getAllWikisFunction()}}>
                Hämta wikis
            </button>
            <button onClick={
                ()=>{
                    addWikiFunction()
                }}>
                Lägg till en wiki
            </button>
        </div>
    )
}

export default Wiki
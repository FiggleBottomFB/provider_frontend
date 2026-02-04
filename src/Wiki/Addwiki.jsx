import { useState, useEffect } from "react"
import '.././CSS/addwiki.css'
import '.././CSS/commonclass.css'
import { useNavigate } from "react-router"
import { addWiki, getAllPeople } from "../apicalls"
import { useAuth } from "../Auth/Authcontext"

function DisplayAddContainer({Title, setTitle, Description, setDescription, allPeople, setAllPeople, PersonId, setPersonId, ChosenName, setChosenName}){
    const navigate = useNavigate()
    const {user} = useAuth()

    useEffect(()=>{
        const fetchAllPeople = async ()=>{
            console.log(user)
            const allPeopleTemp = await getAllPeople(user.token)
            setAllPeople(allPeopleTemp.people)
            console.log(allPeopleTemp)
        }
        fetchAllPeople()
    }, [])

    return(
        <div className="flex-row">
            <div id="input-container">
                <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
                <div id="add-wiki-input-container" className="flex-column align-center">
                    <h2>Wikin skapas till {ChosenName}</h2>
                    <h3>Titel</h3>
                    <input id="add-title-input" type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}} autoComplete="off" />
                    <h3>Beskrivning</h3>
                    <textarea name="" id="add-description-input" value={Description} onChange={(e)=>{setDescription(e.target.value)}} rows={15} cols={100} ></textarea>
                    <button id="add-wiki-button" onClick={()=>{
                        addWiki(user.token, PersonId, {"title": Title, "description": Description})
                        navigate(-1)
                        }}>Skapa wiki</button>
                </div>
            </div>
            <div id="choose-person-container" className="flex-column">
                {
                    allPeople.map((person, index)=>(
                        <div key={index} id="person-container" className="flex-row align-center justify-around">
                            <p>{person.username}</p>
                            <button id="choose-person-button" onClick={()=>{
                                setPersonId(person.id)
                                setChosenName(person.username)
                                }}>Välj</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function AddWiki(){
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [allPeople, setAllPeople] = useState([])
    const [PersonId, setPersonId] = useState(0)
    const [ChosenName, setChosenName] = useState("")
    return(
        <div>
            <DisplayAddContainer Title={Title} setTitle={setTitle} Description={Description} setDescription={setDescription} allPeople={allPeople} setAllPeople={setAllPeople} PersonId={PersonId} setPersonId={setPersonId} ChosenName={ChosenName} setChosenName={setChosenName}/>
        </div>
    )
}

export default AddWiki
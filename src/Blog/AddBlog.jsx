import { useState, useEffect } from "react"
import '.././CSS/addblog.css'
import '.././CSS/commonclass.css'
import { useNavigate } from "react-router"
import { addBlog, getAllPeople } from "../apicalls"
import { useAuth } from "../Auth/Authcontext"

function DisplayAddContainer({Title, setTitle, Description, setDescription}){
    const {user} = useAuth()
    const [AllPeople, setAllPeople] = useState([])
    const [PersonId, setPersonId] = useState(0)
    const [ChosenName, setChosenName] = useState("")

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

        <div id="add-blog-full-container" className="justify-center">
            <div className="flex-row">
                <div id="add-blog-input-container" className="flex-column align-center">
                    <h2>Bloggen skapas till {ChosenName}</h2>
                    <h3>Titel</h3>
                    <input id="add-title-input" type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}} autoComplete="off" />
                    <h3>Beskrivning</h3>
                    <textarea name="" id="add-description-input" value={Description} onChange={(e)=>{setDescription(e.target.value)}} rows={15} cols={100} ></textarea>
                    <button id="add-blog-post-button" onClick={()=>{addBlog(user.token, user.id, {"title": Title, "description": Description})}}>Skapa blogg</button>
                </div>
                <div id="choose-person-container" className="flex-column">
                    {
                        AllPeople.map((person, index)=>(
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

//         <div>
            
//             <div id="add-blog-input-container" className="flex-column align-center">
//                 <h3>Titel</h3>
//                 <input id="add-title-input" type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}} autoComplete="off" />
//                 <h3>Beskrivning</h3>
//                 <textarea name="" id="add-description-input" value={Description} onChange={(e)=>{setDescription(e.target.value)}} rows={15} cols={100} ></textarea>
//                 <button id="add-blog-post-button" onClick={()=>{addBlog(user.token, user.id, {"title": Title, "description": Description})}}>Skapa blogg</button>

            </div>
        </div>
    )
}

function AddBlog(){
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const navigate = useNavigate()
    return(
       <div>
        <div id="add-blog-base">
            <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
        </div>

            <DisplayAddContainer Title={Title} setTitle={setTitle} Description={Description} setDescription={setDescription}/>
        </div>
    )
}

export default AddBlog
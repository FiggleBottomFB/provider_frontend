import { useState } from "react"
import { addEvent } from "../apicalls"
import '.././CSS/calendar.css'
import '.././CSS/commonclass.css'
import { useAuth } from "../Auth/Authcontext"

function Addevent({CalId, setShowAddEvent}){
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [DateTime, setDateTime] = useState("")
    const [Duration, setDuration] = useState("")
    const {user} = useAuth()


    return(
        <div id="add-event-container">
            <form action="" className="flex-column align-center">
                <label htmlFor="title">Titel</label>
                <input id="event-set-title" type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}} />

                <label htmlFor="description">Beskrivning</label>
                <textarea id="event-set-description" name="description" rows={10} cols={20} onChange={(e)=>{setDescription(e.target.value)}} ></textarea>

                <label htmlFor="date">Starttid</label>
                <input type="datetime-local" name="date" onChange={(e)=>{
                    setDateTime(e.target.value)
                    }} />

                <label htmlFor="">Varaktighet</label>
                <input type="time" onChange={(e)=>{setDuration(e.target.value)}} />

                <button type="button" onClick={()=>{
                    const sendDateTime = DateTime.replace("T", " ")+":00"
                    const sendDuration = Duration+":00"
                    console.log(sendDateTime)
                    console.log(sendDuration)
                    addEvent(user.token, CalId, {"title": Title, "description": Description, "datetime": sendDateTime, "duration": sendDuration})
                    setShowAddEvent(false)
                    }}>Skapa event</button>
            </form>
        </div>
    )
}

export default Addevent
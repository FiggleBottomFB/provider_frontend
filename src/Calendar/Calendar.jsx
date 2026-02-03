import { useEffect, useState } from 'react'
import '.././CSS/calendar.css'
import '.././CSS/commonclass.css'
import '.././apicalls.js'
import { getEvents, getAllCalendars, getCalendarSettings } from '.././apicalls.js'
import { useNavigate } from 'react-router'
import Addevent from './Addevent.jsx'
import { useAuth } from '../Auth/Authcontext.jsx'


/*

The calendaer might be broken, have to check with a user that is not an admin if they can get their own calendar id, otherwise no events can be added to a users own calendar

*/


function DisplayWeek({UserEvents, setUserEvents}){
  const {user} = useAuth()

  //#region date handling
  let curr = new Date 
  let week = []
  const events = Array.isArray(UserEvents) ? UserEvents : []

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i 
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
  }
  //#endregion

  useEffect(()=>{
    const fetchEvents = async ()=>{
      const events = getEvents(user.token)
      setUserEvents(events)
    }
    fetchEvents()
  }, [])


  return(
    week.map((day, index)=>(
      <div id="day-container" key={index} className='justify-center'>
        <div id="day-container-header" className='justify-center align-center'>
          {day}
        </div>
        {
          events.forEach(event => {
            var eventDate = new Date(event.datetime)
            if(eventDate.setHours(0,0,0,0) <= curr.setHours(0,0,0,0)){
              return <DisplayEvent UserEvents={event}/>
            }
          }) 
        }
        
      </div>
    ))
  )
}

function DisplayEvent({event}){
  return(
    <div>
      {event.title}
    </div>
  )
}

function Calendar({UserInfo}){
  const [UserEvents, setUserEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [CalId, setCalId] = useState(0)
  const [ShowAddEvent, setShowAddEvent] = useState(false)
  const {user} = useAuth()

  useEffect(()=>{
    const fetchCalId = async ()=>{
      const calIdGet = await getCalendarSettings(user.token)
      setCalId(calIdGet.calId)
    }
    fetchCalId()
  }, [])

  return (
    <div id="calendar-container" className='flex-row'>
      <div id="calendar-display-container" className='flex-row justify-around'>
        <DisplayWeek UserEvents={UserEvents} setUserEvents={setUserEvents}/>
        {/* <button id="add-event-button" onClick={()=>{setShowAddEvent(true)}}>Lägg till ett event</button> */}
      </div>
      {!ShowAddEvent && <button id="add-event-button" onClick={()=>{setShowAddEvent(true)}}>Lägg till ett event</button>}
      {ShowAddEvent && <Addevent CalId={CalId} setShowAddEvent={setShowAddEvent}/>}
    </div>
  )
}

export default Calendar
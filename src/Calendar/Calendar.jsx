import { useEffect, useState } from 'react'
import '.././CSS/calendar.css'
import '.././CSS/commonclass.css'
import '.././apicalls.js'
import { getEvents, addEvent, getAllCalendars, getCalendarSettings } from '.././apicalls.js'
import { useNavigate } from 'react-router'


/*

The calendaer might be broken, have to check with a user that is not an admin if they can get their own calendar id, otherwise no events can be added to a users own calendar

*/


function DisplayCalendar({UserEvents, setUserEvents}){
  return(
    <div>
      <div id="week-display-container">

      </div>
      <div id="calendar-display-container" className='flex-row justify-around'>
        <DisplayWeek UserEvents={UserEvents}/>
        <button onClick={()=>{
        AddEvent()
      }}>
        Lägg till ett event
      </button>
      </div>
    </div>
  )
}

function DisplayWeek({UserEvents}){
  let curr = new Date 
  let week = []
  const events = Array.isArray(UserEvents) ? UserEvents : []

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i 
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
  }
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

async function AddEvent(){
  console.log(window.sessionStorage.getItem("token"))
  const response = await getAllCalendars(window.sessionStorage.getItem("token"))
  console.log(response)
  // addEvent(calId, window.sessionStorage.getItem("token"), "title=hej")
}

function Calendar({UserInfo}){
  const [UserEvents, setUserEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [CalId, setCalId] = useState(0)

  const getUserEvents = async () =>{
    const userData = await getEvents(UserInfo.token)
    setUserEvents(userData)
  }
  getUserEvents
  console.log(UserEvents)
  console.log(UserInfo.token)
  UserInfo.token = window.sessionStorage.getItem("token");
  return (
    <div id="calendar-container">
      <DisplayCalendar UserEvents={UserEvents} setUserEvents={setUserEvents}/>
      {/* <AddEvent /> */}
    </div>
  )
}

export default Calendar
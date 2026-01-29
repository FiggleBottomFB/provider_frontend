import { Outlet } from "react-router"
import '.././CSS/calendar.css'

function CalendarContainer(){
    return(
        <div id="calendar-page-container">
            <Outlet/>
        </div>
    )
}

export default CalendarContainer
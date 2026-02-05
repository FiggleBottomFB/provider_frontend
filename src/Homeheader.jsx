import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import './CSS/header.css'
import './CSS/commonclass.css'
import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'
import { useAuth } from './Auth/Authcontext';


function DisplayAdminPanelButton(){
    const {user} = useAuth()
    console.log(user)
    if(user.role != "admin"){
        return
    }
    return(
        <NavLink to="/admin" className='header-route-link'>Admin</NavLink>  
    )
}

function HomeHeader(){
    const navigate = useNavigate()
    return( 
        <div>
            <div id="header-container" className="flex-row justify-between align-center">
                <img onClick={()=>{navigate("/")}} id="header-logo-image" src={viteLogo} alt="LogoImg" />
                <nav id="header-route-link-container" className='flex-row justify-around'>
                    <NavLink to="/wiki" className='header-route-link'>Wiki</NavLink> 
                    <NavLink to="/blog" className='header-route-link'>Blog</NavLink> 
                    <NavLink to="/calendar" className='header-route-link'>Kalender</NavLink> 
                    <DisplayAdminPanelButton/>
                </nav>
                <div id="header-invacc-container" className='flex-row align-center'>
                    <img id="invitations-img" src={reactLogo} alt="LetterImg" />
                    link to user page 
                </div>
            </div>
            <div id="outlet-container">
                <Outlet />
            </div>
        </div>
    )
}

export default HomeHeader
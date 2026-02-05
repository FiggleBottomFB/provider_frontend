import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import './CSS/header.css'
import './CSS/commonclass.css'
import viteLogo from '/vite.svg'
import reactLogo from './assets/bjorn.png'
import { useAuth } from './Auth/Authcontext';


function DisplayAdminPanelButton(){
    const {user} = useAuth()
    if(!user || user.role != "admin"){
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
            <header id="header-container" >

                    <div id='logo-container'>
                        <img onClick={()=>{navigate("/")}} id="header-logo-image" src={viteLogo} alt="LogoImg" />
                    </div>
                    
                    <nav id="header-route-link-container" >
                        <NavLink to="/wiki" className='header-route-link'>Wiki</NavLink> 
                        <NavLink to="/blog" className='header-route-link'>Blog</NavLink> 
                        <NavLink to="/calendar" className='header-route-link'>Kalender</NavLink> 
                        <DisplayAdminPanelButton/>
                    </nav>

                    <div id='login-container'>
                        <div id="user-info-container" className='flex-row align-center'>
                            <img id="profile-img" src={reactLogo} alt="LetterImg" />
                            link to user page 
                        </div>
                    </div>
 
            </header>

            
            <div id="outlet-container">
                <Outlet />
            </div>

        </div>
    )
}

export default HomeHeader

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
    const {user, logout}=useAuth()
    return( 
        <div>
            <header id="header-container">

                <div id="left-column">
                    <div id="logo-container">
                    <img
                        onClick={() => navigate("/")}
                        id="header-logo-image"
                        src={viteLogo}
                        alt="Logo"
                    />
                    </div>

                    <nav id="header-route-link-container">
                    <NavLink to="/wiki" className="header-route-link">Wiki</NavLink>
                    <NavLink to="/blog" className="header-route-link">Blog</NavLink>
                    <NavLink to="/calendar" className="header-route-link">Kalender</NavLink>
                    <DisplayAdminPanelButton />
                    </nav>
                </div>

                <div id="login-container">
                    {/* <NavLink to="/login" className="header-route-link">Logga in</NavLink> */}
                    {user?.token? <button className="header-route-link" onClick={async ()=> { await logout()}}> logga ut</button> : <NavLink to="/login" className="header-route-link">Logga in</NavLink>}
                    {/* <div id="user-info-container" className="flex-row align-center">

                    </div> */}
                </div>

            </header>

            
            <div id="outlet-container">
                <Outlet />
            </div>

        </div>
    )
}

export default HomeHeader

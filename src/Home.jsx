import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import './CSS/home.css'
import './CSS/commonclass.css'


function Home(){
    return (
        <div id="home-container" className="align-center justify-around flex-row">
            <NavLink to="/wiki" className="home-route-link">
                <div className='justify-center align-center home-route-link-text-container'>Wiki</div>
            </NavLink>

            <NavLink to="/blog" className="home-route-link">
                <div className='justify-center align-center home-route-link-text-container'>Blog</div>
            </NavLink>

            <NavLink to="/calendar" className="home-route-link">
                <div className='justify-center align-center home-route-link-text-container'>Kalender</div>
            </NavLink>
        </div>
    )
}

export default Home
  
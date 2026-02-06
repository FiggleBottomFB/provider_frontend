import { useState } from 'react'
import "./CSS/login.css"
import { getAllPeople } from './apicalls.js'
import { useNavigate } from 'react-router'
import { useAuth } from "./Auth/Authcontext";

function Login({userInfo, setUserInfo}){
    const { user, login, loading, error } = useAuth();
    const navigate = useNavigate()
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")


    const loginUser = async () =>{
        const userData = await login(UserName, Password)
        setUserInfo(userData)
        // sessionStorage sets in login in authcontext
        if(!userData.error){
            navigate("/")
        }
    }

    return (
        <div id="login-page-container" className="align-center justify-center">
            <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
            <div id="login-input-container" className="flex-column align-center justify-around">
                <h1 id="login-header">Logga in</h1>
                <div id="login-inputfield-container" className='flex-column justify-around'>
                    <input className="login-input" type="text" placeholder="användarnamn" onChange={(e)=>{setUserName(e.target.value)}}/>
                    <input className="login-input" type="password" placeholder="lösenord" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button id="login-button"
                    onClick={()=>{loginUser()}}
                >Logga in</button>
            </div>
        </div>
    )
}

export default Login
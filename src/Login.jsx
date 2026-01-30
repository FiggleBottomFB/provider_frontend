import { useState } from 'react'
import "./CSS/login.css"
import './apicalls.js'
import { getAllPeople, personLogin } from './apicalls.js'
import { useNavigate } from 'react-router'
import { sha256 } from 'js-sha256';

function Login({userInfo, setUserInfo}){
    const navigate = useNavigate()
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")


    const loginUser = async () =>{
        const userData = await personLogin(UserName, sha256(Password))
        setUserInfo(userData)
        sessionStorage.setItem("token", userData.token)
        console.log(userData.token)
        if(!userData.error){
            navigate("/")
        }
    }

    return (
        <div id="login-page-container" className="align-center justify-center">
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
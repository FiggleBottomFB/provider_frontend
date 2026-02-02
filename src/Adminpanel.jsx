import { addPerson } from "./apicalls"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import './CSS/commonclass.css'
import './CSS/admin.css'
import { useAuth } from "./Auth/Authcontext"
import { sha256 } from 'js-sha256';


function Displayadduser({
    UserName,
    setUserName,
    Password,
    setPassword,
    Name,
    setName,
    Mail,
    setMail,
    TelNumber,
    setTelNumber,
    EmployeeNumber,
    setEmployeeNumber,
    IsAdmin,
    setIsAdmin}){
    const navigate = useNavigate()
    const {user} = useAuth


    return(
        <div className="flex-column align-center">
            <label htmlFor="username">Användarnamn</label>
            <input type="text" name="username" id="" autoComplete="off" value={UserName} onChange={(e)=>{setUserName(e.target.value)}} />
            <label htmlFor="password">Lösenord</label>
            <input type="password" name="password" id="" autoComplete="off" value={Password} onChange={(e)=>{setPassword(e.target.value)}} />
            <label htmlFor="name">Namn</label>
            <input type="text" name="name" id="" autoComplete="off" value={Name} onChange={(e)=>{setName(e.target.value)}} />
            <label htmlFor="mail">E-mail</label>
            <input type="text" name="mail" id="" autoComplete="off" value={Mail} onChange={(e)=>{setMail(e.target.value)}} />
            <label htmlFor="telnumber">Tel.nummer</label>
            <input type="text" name="telnumber" id="" autoComplete="off" value={TelNumber} onChange={(e)=>{setTelNumber(e.target.value)}} />
            <label htmlFor="employeenumber">Anställningsnummer</label>
            <input type="text" name="employeenumber" id="" autoComplete="off" value={EmployeeNumber} onChange={(e)=>{setEmployeeNumber(e.target.value)}} />
            <label htmlFor="isadmincheckbox">Är admin</label>
            <input type="checkbox" name="isadmincheckbox" id="" />
            <button onClick={()=>{addPerson(window.sessionStorage.getItem("token")), {"username": "admin1", "passwordhash": sha256("admin1"), "name": "Elias", "email": "elias.moll38@gmail.com", "phonenumber": "0730685210", "employeenumber": "53", "admin": true}}}>Skapa användare</button>
        </div>
    )
}

function Adminpanel(){
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [Mail, setMail] = useState("")
    const [TelNumber, setTelNumber] = useState("")
    const [EmployeeNumber, setEmployeeNumber] = useState("")
    const [IsAdmin, setIsAdmin] = useState("")
    return(
        <div>
             <Displayadduser
        UserName={UserName}
        setUserName={setUserName}
        Password={Password}
        setPassword={setPassword}
        Name={Name}
        setName={setName}
        Mail={Mail}
        setMail={setMail}
        TelNumber={TelNumber}
        setTelNumber={setTelNumber}
        EmployeeNumber={EmployeeNumber}
        setEmployeeNumber={setEmployeeNumber}
        IsAdmin={IsAdmin}
        setIsAdmin={setIsAdmin}
      />
        </div>
    )
}

export default Adminpanel
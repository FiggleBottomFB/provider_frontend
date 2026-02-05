import { addPerson, editPerson, getAllBlogs, getAllPeople, getPerson } from "./apicalls"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import './CSS/commonclass.css'
import './CSS/admin.css'
import { useAuth } from "./Auth/Authcontext"
import { sha256 } from 'js-sha256';
import { useApi } from "./hooks/useApi"
import LoadingAndErrorHandler from "./LoadingAndErrorhandler"


function Displayadduser(){
    const {user} = useAuth
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [Mail, setMail] = useState("")
    const [TelNumber, setTelNumber] = useState("")
    const [EmployeeNumber, setEmployeeNumber] = useState("")
    const [IsAdmin, setIsAdmin] = useState("")

    const [ShowCreateUser, setShowCreateUser] = useState(false)


    return(
        <div className="align-center flex-column">
            <button className="button-style" onClick={()=>{setShowCreateUser(!ShowCreateUser)}}>Skapa en användare</button>
            {
                ShowCreateUser && (
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
                <input type="checkbox" name="isadmincheckbox" id="" onChange={()=>{setIsAdmin(!IsAdmin)}} />

                <button className="button-style" onClick={()=>{addPerson(user.token, {"username": UserName, "passwordhash": sha256(Password), "name": Name, "email": Mail, "phonenumber": TelNumber, "employeenumber": EmployeeNumber, "admin": IsAdmin})}}>Skapa användare</button>
            </div>
            )}
        </div>
    )
}

function DisplayEditUser(){
    const {user} = useAuth()
    const [UserId, setUserId] = useState(0)

    const fetchAllPeople = async ({ signal }) => {
        return await getAllPeople(user.token,"?isblocked",signal)
    }
    
    const allPeopleRequest = useApi(fetchAllPeople, [user], !!user?.token);


    if (allPeopleRequest.loading || allPeopleRequest.error) return <LoadingAndErrorHandler Loading={allPeopleRequest.loading} Error={allPeopleRequest.error} />
    console.log(allPeopleRequest.data.people)
    return(
        <div id="select-user-container" className="align-center flex-column">
            <h3>Redigera användare</h3>
            {
                allPeopleRequest.data.people.map((person, index)=>(
                    <div key={index} id="choose-user-to-edit-container" className="flex-row justify-between">
                        {person.username}
                        <button className="button-style" onClick={()=>{setUserId(person.id)}}>Redigera</button>
                    </div>
                ))
            }
            <DisplayEditUserFields UserId={UserId} allPeopleRequest={allPeopleRequest}/>
        </div>
    )
}

function DisplayEditUserFields({UserId, allPeopleRequest}){
    if(UserId == 0){
        return
    }
    const {user} = useAuth()
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [Mail, setMail] = useState("")
    const [TelNumber, setTelNumber] = useState("")
    const [EmployeeNumber, setEmployeeNumber] = useState("")
    const [IsAdmin, setIsAdmin] = useState(Boolean)
    const [IsBlocked, setIsBlocked] = useState("")

    const fetchUser = async ({signal}) => {
        return await getPerson(user.token, UserId,"", signal)
    }
    const editUserInfo = useApi(fetchUser, [user, UserId], !!user?.token)

    useEffect(()=>{
        console.log("updated values")
        if(editUserInfo.data){
            setUserName(editUserInfo.data.fields.username)
            setName(editUserInfo.data.fields.name)
            setMail(editUserInfo.data.fields.email)
            setEmployeeNumber(editUserInfo.data.fields.employeenumber)
            setTelNumber(editUserInfo.data.fields.phonenumber)
            setIsAdmin(editUserInfo.data.fields.admin)
            setIsBlocked(editUserInfo.data.fields.blocked)
            if(!IsBlocked){
                setIsBlocked("")
            }
        }
    }, [editUserInfo.data])

    if (editUserInfo.loading || editUserInfo.error) return <LoadingAndErrorHandler Loading={editUserInfo.loading} Error={editUserInfo.error} />

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
            <input type="checkbox" name="isadmincheckbox" id="" checked={IsAdmin} onChange={()=>{setIsAdmin(!IsAdmin)}}/>
            <label htmlFor="isblockedreason">Anledning till att vara blockad</label>
            <input type="text" name="isblockedreason" id="" value={IsBlocked} autoComplete="off" onChange={(e)=>{setIsBlocked(e.target.value)}}/>

            <button className="button-style" onClick={()=>{
                editPerson(user.token, UserId, {"username": UserName, "passwordhash": sha256(Password), "name": Name, "email": Mail, "phonenumber": TelNumber, "employeenumber": EmployeeNumber, "admin": IsAdmin, "blocked": IsBlocked == "" ? null : IsBlocked})
                allPeopleRequest.refetch()
                UserId = 0
                }}>Spara ändringar</button>
        </div>
    )
}

function DisplayBlogButton(){
    const navigate = useNavigate()
    const {user} = useAuth()

    return(
        <div>
            <button className="button-style" onClick={()=>{navigate("../blog/add")}}>Skapa en blogg</button>
            <button className="button-style" onClick={()=>{navigate("../wiki/add")}}>Skapa en wiki</button>
        </div>
    )
}


function Adminpanel(){
    return(
        <div id="admin-panel-container" className="flex-row justify-around">
            <Displayadduser/>
            <DisplayBlogButton/>
            <DisplayEditUser/>
        </div>
    )
}

export default Adminpanel
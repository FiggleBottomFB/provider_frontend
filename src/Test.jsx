import { useState } from "react"


function Testfetch(){
    const [token, setToken] = useState("")
    fetch("https://tp1.api.ntigskovde.se/api/auth/login?username=simonelias&password=simonelias",{ 
        method: "POST"
    }).then(responseToken => responseToken.json()).then(responseToken => setToken(responseToken.token))

    fetch("https://tp1.api.ntigskovde.se/api/auth/verify",{ 
        method: "POST",
        headers: { 'Authorization': 'Bearer '+token } 
    }).then(response => response.json()).then(response => console.log(response))
}


export default Testfetch
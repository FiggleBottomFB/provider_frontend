

export async function Testfetch(){

    fetch("https://tp1.api.ntigskovde.se/api/auth/login",{ 
        method: "POST",
        body: JSON.stringify({
            username: "simonelias",
            password: "simonelias"
        })
    }).then(response => response.json()).then(response => console.log(response.token))
}


export async function Testfetch2() {
  const response = await fetch("https://tp1.api.ntigskovde.se/api/auth/login",{ 
    method: "POST",
    body: JSON.stringify({
        username: "simonelias",
        password: "simonelias"
    })
  });
  return response.json();
}

export async function VerifyToken(token) {
    const response = await fetch("https://tp1.api.ntigskovde.se/api/auth/verify",{ 
      method: "POST",
      headers: {
        "Authorization": "Bearer "+token
    },
      body: JSON.stringify({
          username: "simonelias",
          password: "simonelias"
      })
    });
    return response.json();
}
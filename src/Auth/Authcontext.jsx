import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken, personLogin as apiLogin, personLogout as apiLogout } from "../apicalls"; //import user login and logout and verify if it exist
import { sha256 } from 'js-sha256';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // user info
  const [loading, setLoading] = useState(true); // for token verification
  const [error, setError] = useState(null);     // auth errors

  // Verify token when app mounts
  //maybe just check the time
  useEffect(() => {
    const controller = new AbortController();

    async function checkAuth() {
      try {
        setLoading(true);
        const data = await verifyToken({ signal: controller.signal });
        setUser(data.user);
      } catch (err) {
        if (err.name === "AbortError") return;
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    //checkAuth();



    return () => controller.abort();
  }, []);

  useEffect(()=>{

    async function checkStorage(){
      setLoading(true);
      let storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        storedUser=JSON.parse(storedUser);
        if(isTokenValid(storedUser.tokenExpireTime)){
          
        } else {
          storedUser=null;
          logout()
        }

      } else {
        storedUser=null;
      }
      setUser(storedUser);
      

      setLoading(false);
      console.log("checkstorage", storedUser)
  
    }
    checkStorage();
    


  }, [])

  // Login function   user
  async function login(username, password) {
    const data = await apiLogin(username, sha256(password));
    const newdata=buildUser(data);
    console.log(newdata)
    if(newdata.role!="guest"){
      sessionStorage.setItem("user", JSON.stringify(newdata));
    } else {
      sessionStorage.removeItem("user");
    }
    
    setUser(newdata);
    return data;
  }

  // Logout function  user   avilable in authcontext just use  useAuth
  async function logout() {
    setUser(null); //set user to null
    if(user.token){
      await apiLogout(user.token);
    }
    sessionStorage.removeItem("user");
    
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function buildUser(userData) {
  let userRole= "guest"
  if (userData?.admin!=null || userData?.admin!=undefined){
  userRole= userData.admin? "admin" : "user";
  }
  
  return {
    token:userData?.token,
    tokenExpireTime:userData?.expiresAt,
    id: userData?.personID,
    role: userRole,
  };
}

function isTokenValid(tokenExpireTime) {
  if(tokenExpireTime==null){
    return (false)
  }
  const expireDate = new Date(tokenExpireTime.replace(" ", "T"));
  const now = new Date();

  return expireDate > now;
}


// Hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext);
}

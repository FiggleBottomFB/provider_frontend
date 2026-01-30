import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken, personLogin as apiLogin, personLogout as apiLogout } from "../apicalls"; //import user login and logout and verify if it exist
import { sha256 } from 'js-sha256';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // user info
  const [loading, setLoading] = useState(true); // for token verification
  const [error, setError] = useState(null);     // auth errors

  // Verify token when app mounts
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

    checkAuth();
    return () => controller.abort();
  }, []);

  // Login function   user
  async function login(username, password) {
    const data = await apiLogin(username, sha256(password));
    sessionStorage.setItem("token", data.token);
    setUser(data);
    return data;
  }

  // Logout function  user   avilable in authcontext just use  useAuth
  async function logout() {
    await apiLogout();
    sessionStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext);
}

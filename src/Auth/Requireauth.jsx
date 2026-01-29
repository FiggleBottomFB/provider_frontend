import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Authcontext";

export function RequireAuth({ children, roles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <h2>Loading...</h2>; // wait for verification

  if (!user || (roles.length > 0 && !roles.includes(user.role))) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return children;
}

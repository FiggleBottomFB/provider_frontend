import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Authcontext";

export function RequireAuth({ children, roles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <h2>Loading...</h2>;

  // Assign role and if user isent logged in treat them as guest
  const role = user?.role || "guest";

  // If this route has role requirements and user doesn't match
  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return children;
}
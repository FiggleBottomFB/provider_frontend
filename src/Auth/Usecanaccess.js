import { useAuth } from "./AuthContext";

/*
  Checks if current user can access something
  roles = ["admin", "user"] = null= guest
  optional object check: function returns true/false
 */
export function useCanAccess({ roles = [], objectCheck = null }) {
  const { user } = useAuth();

  if (!user) return false; // guest cannot access protected pages

  // Admin always allowed
  if (user.role === "admin") return true;

  // Role check
  if (roles.length > 0 && !roles.includes(user.role)) return false;

  // Optional object-level check
  if (objectCheck && typeof objectCheck === "function") {
    return objectCheck(user);
  }

  return true;
}

/* example use

const canEditWiki = useCanAccess({
  roles: ["user"], 
  objectCheck: (user) => user.id === wikiPage.ownerId
});


*/
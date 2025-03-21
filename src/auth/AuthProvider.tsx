"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation"; // ✅ Get current route
import keycloak, { initKeycloak } from "../../keycloak";
import { PROTECTED_ROUTES } from "@/utils/ProtectedRoute";
import Header from "@/components/Header";
import { useKeycloak } from "@react-keycloak/web";


// ✅ Define authentication context type
interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  user: any;
}

// ✅ Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (pathname === "/") {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    if (!PROTECTED_ROUTES.includes(pathname)) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((auth: boolean) => {
        setAuthenticated(auth);
        setLoading(false);
        setUser( keycloak?.tokenParsed?.preferred_username);
      })
      .catch(() => setLoading(false));
  }, [pathname]);


 




  return (
    <>

      
      <AuthContext.Provider value={{ authenticated, loading, user }}>
        {children}
      </AuthContext.Provider>
    
    </>

  );
};

// ✅ Custom hook for authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

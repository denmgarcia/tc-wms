"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useKeycloak } from "@react-keycloak/web";
import { PROTECTED_ROUTES } from "@/utils/ProtectedRoute"; // List of protected pages

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { keycloak } = useKeycloak();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!keycloak) return;

    keycloak.onReady = () => {
      setLoading(false);

      // Redirect if not authenticated and trying to access a protected page
      if (!keycloak.authenticated && PROTECTED_ROUTES.includes(pathname)) {
        keycloak.login();
      }

      
    };
  }, [keycloak, pathname]);


  return <div>{ children }</div>
}

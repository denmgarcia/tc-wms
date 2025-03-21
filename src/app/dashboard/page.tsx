"use client"



import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useKeycloak } from "@react-keycloak/web";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";





export default function Dashboard() {
  
  const { keycloak } = useKeycloak();

  const [toogle, setToggle] = useState(false)

  return (
    <>
        <Sidebar open={false} />
        <p>sdssfdsd</p>
    </>
  )



};








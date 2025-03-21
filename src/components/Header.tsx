// @ts-nocheck
'use client'
import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Menu, Coins, Leaf, Search, Bell, User, ChevronDown, LogIn, LogOut } from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import { createUser, getUnreadNotifications, markNotificationAsRead, getUserByEmail, getUserBalance } from "@/utils/db/actions"
import { useKeycloak } from "@react-keycloak/web"
import { useAuth } from "@/auth/AuthProvider"
import keycloak, { initKeycloak } from "../../keycloak"









interface HeaderProps {
//   onMenuClick: () => void | any;
  totalEarnings: number;
}

export default function Header({ onMenuClick, totalEarnings}: HeaderProps) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);




  const [notifications, setNotifications] = useState<Notification[]>([]);
//   const isMobile = useMediaQuery("(max-width: 768px)")
  const [balance, setBalance] = useState(0)

  const [username, setUsername] = useState<any>("");
  const keycloak = useKeycloak();

  useEffect(() => {
    if (keycloak.initialized && keycloak.keycloak.authenticated) {
      const user = keycloak.keycloak.tokenParsed?.preferred_username || "Unknown User";
      setUsername(user);
      setLoggedIn(true)
      console.log("truedddddddddddd", user);
    } else {
        setLoggedIn(false)
    }
  }, [keycloak.initialized, keycloak.keycloak.authenticated]);

//   if (!keycloak.initialized) return <p>Loading...</p>;


  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-500 mr-1 md:mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-lg text-gray-800">TCWS</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 -mt-1">Taguig City</span>
            </div>
          </Link>
        </div>
        {loggedIn && (
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
        <div className="flex items-center">
        {loggedIn && (
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-5 w-5" />
            </Button>
          )}
          <DropdownMenu>

            {
                loggedIn && (
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2 relative">
                      <Bell className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-5">
                          {notifications.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                )
            }

            <DropdownMenuContent align="end" className="w-64">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{notification.type}</span>
                      <span className="text-sm text-gray-500">{notification.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {
            loggedIn && (
                <div className="mr-2 md:mr-4 flex items-center bg-gray-100 rounded-full px-2 md:px-3 py-1">
                <Coins className="h-4 w-4 md:h-5 md:w-5 mr-1 text-green-500" />
                <span className="font-semibold text-sm md:text-base text-gray-800">
                  {/* {balance.toFixed(2)} */}
                  {totalEarnings.toFixed(2)}
                </span>
              </div> 
            )
          }

          {!loggedIn ? (
            <Button onClick={() => keycloak.keycloak.login({ redirectUri: window.location.href = "http://localhost:3000/dashboard"}) } className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base">
              Login
              <LogIn className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={"getUserInfo"}>
                  {/* {userInfo ? userInfo.name : "Fetch User Info"} */}
                  { username }
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => keycloak.keycloak.logout({ redirectUri: "http://localhost:3000/"})}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
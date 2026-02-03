"use client"
import { Home, Inbox, Settings, Lock } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { AdminLoginModal } from "./AdminLoginModal"
import { useAuth } from '@/hooks/useAuth'
import { useState } from "react"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Spieler registrieren",
    url: "/registerNewPlayer",
    icon: Inbox,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Settings,
    isAdminOnly: true,
  },
]

export function AppSidebar() {
  const [showAdminModal, setShowAdminModal] = useState(false)
  const { isAdmin, logout, loading } = useAuth() // ← Reagiert automatisch!

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menü</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>

                    {!item.isAdminOnly && (
                        <SidebarMenuButton asChild>
                      <a 
                        href={item.url}
                        className={`
                          flex items-center gap-3 p-3 rounded-xl transition-all group hover:bg-muted/80
                          ${item.isAdminOnly && !isAdmin 
                            ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-r-4 border-orange-500/50' 
                            : 'text-foreground'
                          }
                        `}
                      >

                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    )}

                    {item.isAdminOnly && (
                        <SidebarMenuButton 
                          asChild
                          disabled={!isAdmin}
                          className={!isAdmin ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                        >
                          <a href={item.isAdminOnly && !isAdmin ? '#' : item.url}>
                            <item.icon className="h-5 w-5 shrink-0" />
                            <span className="font-medium">{item.title}</span>
                            <div className="ml-auto flex items-center gap-1">
                              <Lock className={`h-4 w-4 shrink-0 transition-colors ${
                                isAdmin 
                                  ? 'text-green-500' 
                                  : 'text-orange-500 group-hover:text-orange-600'
                              }`} />
                              {isAdmin && (
                                <span className="text-xs bg-green-500/20 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-500/30">
                                  ADMIN
                                </span>
                              )}
                            </div>
                          </a>
                        </SidebarMenuButton>
                    )}


                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Admin Controls - IMMER sichtbar & reaktiv */}
          <SidebarGroup>
            <SidebarGroupContent className="pt-4 px-3">
              {isAdmin ? (
                <Button
                  onClick={logout}
                  variant="destructive"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-sm h-11 text-sm"
                >
                  <Lock className="h-4 w-4 mr-2 rotate-180" />
                  <span>Logout</span>
                </Button>
              ) : (
                <Button
                  onClick={() => setShowAdminModal(true)}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-2 border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/10 text-foreground font-semibold h-11 text-sm shadow-sm"
                >
                  <Lock className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Admin Login</span>
                </Button>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <AdminLoginModal 
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
    </>
  )
}
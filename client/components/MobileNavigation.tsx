"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"
import { useApp } from "@/contexts/AppContext"
import { Menu, User, Settings, Briefcase, Search, FileText, History, LogOut, Heart } from "lucide-react"

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { applications } = useApp()

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Briefcase, badge: null },
    { id: "profile", label: "Profile", icon: User, badge: null },
    { id: "preferences", label: "Preferences", icon: Settings, badge: null },
    { id: "applications", label: "Applications", icon: Search, badge: applications.length },
    { id: "templates", label: "CV Templates", icon: FileText, badge: null },
    { id: "history", label: "History", icon: History, badge: null },
    { id: "donate", label: "Donate", icon: Heart, badge: null },
  ]

  const handleNavigation = (tabId: string) => {
    onTabChange(tabId)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            Coverly
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          <Separator />

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleNavigation(item.id)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
                {item.badge !== null && item.badge > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          <Separator />

          {/* Logout */}
          <Button variant="outline" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

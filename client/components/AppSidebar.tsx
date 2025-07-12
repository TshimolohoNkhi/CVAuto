"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { useApp } from "@/contexts/AppContext"
import { useDonation } from "@/contexts/DonationContext"
import { Briefcase, User, Settings, Search, FileText, Heart, LogOut, BarChart3, MessageSquare } from "lucide-react"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { user, logout } = useAuth()
  const { applications, scrapedJobsToday, matchedJobsToday } = useApp()
  const { totalDonated } = useDonation()

  const mainNavItems = [
    {
      id: "overview",
      title: "Overview",
      icon: Briefcase,
      badge: null,
    },
    {
      id: "applications",
      title: "Applications",
      icon: Search,
      badge: applications.length > 0 ? applications.length : null,
    },
    {
      id: "history",
      title: "Analytics",
      icon: BarChart3,
      badge: null,
    },
  ]

  const profileNavItems = [
    {
      id: "profile",
      title: "Profile Setup",
      icon: User,
      badge: null,
    },
    {
      id: "preferences",
      title: "Job Preferences",
      icon: Settings,
      badge: null,
    },
    {
      id: "templates",
      title: "CV Templates",
      icon: FileText,
      badge: null,
    },
  ]

  const supportNavItems = [
    {
      id: "feedback",
      title: "Feedback & Support",
      icon: MessageSquare,
      badge: null,
    },
    {
      id: "donate",
      title: "Support Coverly",
      icon: Heart,
      badge: totalDonated > 0 ? "💙" : null,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CV</span>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Coverly
            </h2>
            <p className="text-xs text-muted-foreground">Job Search Assistant</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge !== null && item.badge > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Profile & Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Profile & Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        <SidebarGroup>
          <SidebarGroupLabel>Today's Activity</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jobs Scraped</span>
                <Badge variant="outline">{scrapedJobsToday}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jobs Matched</span>
                <Badge variant="outline">{matchedJobsToday}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Applications</span>
                <Badge variant="outline">{applications.length}</Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full"
                  >
                    <item.icon className={`h-4 w-4 ${item.id === "donate" ? "text-red-500" : ""}`} />
                    <span>{item.title}</span>
                    {item.badge && <span className="ml-auto text-xs">{item.badge}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-2 px-2 py-1">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </SidebarMenuItem>

          {/* Add separator between user info and logout */}
          <div className="px-2">
            <Separator />
          </div>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

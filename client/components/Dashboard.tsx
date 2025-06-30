"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { ProfileSetup } from "./ProfileSetup"
import { PreferencesForm } from "./PreferencesForm"
import { ApplicationsDashboard } from "./ApplicationsDashboard"
import { ScraperStatus } from "./ScraperStatus"
import { CvTemplates } from "./CvTemplates"
import { ApplicationHistory } from "./ApplicationHistory"
import { User, Settings, Briefcase, Search } from "lucide-react"
import { Footer } from "./Footer"
import { ProfileProgress } from "./ProgressIndicator"
import { NoApplicationsState } from "./EmptyStates"
import { useApp } from "@/contexts/AppContext"
import { QuickActions } from "./QuickActions"
import { ThemeToggle } from "./ThemeToggle"
import { NotificationCenter } from "./NotificationCenter"
import { AdvancedAnalytics } from "./AdvancedAnalytics"
import { ThemeCustomizer } from "./ThemeCustomizer"
import { OnboardingFlow } from "./OnboardingFlow"
import { useOnboarding } from "@/contexts/OnboardingContext"
import { DonationSection } from "./DonationSection"
import { DonationPopup } from "./DonationPopup"
import { AppSidebar } from "./AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { FeedbackPage } from "./FeedbackPage"
import { supabase } from "@/lib/supabaseClient"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function Dashboard() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const { applications, matchedJobsToday } = useApp()
  const { isOnboardingComplete } = useOnboarding()

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Dashboard Overview"
      case "profile":
        return "Profile Setup"
      case "preferences":
        return "Job Preferences"
      case "applications":
        return "Job Applications"
      case "templates":
        return "CV Templates"
      case "history":
        return "Analytics & History"
      case "donate":
        return "Support CVAuto"
      case "feedback":
        return "Feedback & Support"
      default:
        return "Dashboard"
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applications.length}</div>
                  <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 5) + 1} from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5%</div>
                  <p className="text-xs text-muted-foreground">Above average (8.2%)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jobs Matched</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{matchedJobsToday}</div>
                  <p className="text-xs text-muted-foreground">Today's matches</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ProfileProgress />
              <ScraperStatus />
            </div>

            {applications.length === 0 && <NoApplicationsState onCreateProfile={() => setActiveTab("profile")} />}
          </div>
        )
      case "profile":
        return (
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <ProfileSetup />
            </div>
            <div className="space-y-6">
              <ThemeCustomizer />
            </div>
          </div>
        )
      case "preferences":
        return <PreferencesForm />
      case "applications":
        return <ApplicationsDashboard />
      case "templates":
        return <CvTemplates />
      case "history":
        return (
          <div className="space-y-6">
            <AdvancedAnalytics />
            <ApplicationHistory />
          </div>
        )
      case "donate":
        return <DonationSection />
      case "feedback":
        return <FeedbackPage />
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <>
      {!isOnboardingComplete && <OnboardingFlow />}

      <SidebarProvider>
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center">
              <span className="text-lg font-medium text-muted-foreground">
                Welcome back, {user?.user_metadata.name || user?.email?.split("@")[0]}! 👋 
              </span>
            </div>
            <div className="ml-auto flex items-center space-x-3">
              <NotificationCenter />
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 flex-col gap-4 p-4">{renderContent()}</main>

          <Footer />
          <DonationPopup />

          <QuickActions
            onAction={(action) => {
              switch (action) {
                case "profile":
                  setActiveTab("profile")
                  break
                case "preferences":
                  setActiveTab("preferences")
                  break
                case "cv":
                  setActiveTab("templates")
                  break
                case "scrape":
                  // Trigger scrape action
                  break
              }
            }}
          />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

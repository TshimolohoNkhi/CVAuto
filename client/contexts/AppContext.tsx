"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  current: boolean
}

interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface UserProfile {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  education: Education[]
  workExperience: WorkExperience[]
  skills: string[]
  languages: string[]
}

interface UserPreferences {
  preferredLocations: string[]
  preferredIndustries: string[]
  criminalRecord: "yes" | "no" | "prefer-not-to-say"
  willingToWorkWithRecord: boolean
  jobTypes: string[]
  salaryMin: number
  salaryMax: number
  educationLevel: string
  languagesSpoken: string[]
  availability: string
  disabilityFriendly: boolean
  remoteOnly: boolean
}

interface JobApplication {
  id: string
  jobTitle: string
  company: string
  location: string
  dateApplied: string
  status: "applied" | "reviewing" | "interview" | "rejected" | "accepted"
  salary?: string
}

interface AppContextType {
  profile: UserProfile
  preferences: UserPreferences
  applications: JobApplication[]
  cvTemplate: string
  updateProfile: (profile: Partial<UserProfile>) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  addApplication: (application: Omit<JobApplication, "id">) => void
  updateApplication: (id: string, updates: Partial<JobApplication>) => void
  setCvTemplate: (template: string) => void
  exportData: () => void
  scrapedJobsToday: number
  matchedJobsToday: number
  triggerScrape: () => Promise<void>
}

const defaultProfile: UserProfile = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  education: [],
  workExperience: [],
  skills: [],
  languages: [],
}

const defaultPreferences: UserPreferences = {
  preferredLocations: [],
  preferredIndustries: [],
  criminalRecord: "prefer-not-to-say",
  willingToWorkWithRecord: false,
  jobTypes: [],
  salaryMin: 0,
  salaryMax: 0,
  educationLevel: "",
  languagesSpoken: [],
  availability: "",
  disabilityFriendly: false,
  remoteOnly: false,
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [cvTemplate, setCvTemplateState] = useState<string>("")
  const [scrapedJobsToday, setScrapedJobsToday] = useState(0)
  const [matchedJobsToday, setMatchedJobsToday] = useState(0)

  useEffect(() => {
    if (user) {
      // Load user data from localStorage
      const savedProfile = localStorage.getItem(`coverly_profile_${user.id}`)
      const savedPreferences = localStorage.getItem(`coverly_preferences_${user.id}`)
      const savedApplications = localStorage.getItem(`coverly_applications_${user.id}`)
      const savedCvTemplate = localStorage.getItem(`coverly_cv_template_${user.id}`)
      const savedStats = localStorage.getItem(`coverly_stats_${user.id}`)

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      } else {
        setProfile({ ...defaultProfile, email: user.email, fullName: user.name || "" })
      }

      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }

      if (savedApplications) {
        setApplications(JSON.parse(savedApplications))
      }

      if (savedCvTemplate) {
        setCvTemplateState(savedCvTemplate)
      }

      if (savedStats) {
        const stats = JSON.parse(savedStats)
        setScrapedJobsToday(stats.scrapedJobsToday || 0)
        setMatchedJobsToday(stats.matchedJobsToday || 0)
      }
    }
  }, [user])

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    localStorage.setItem(`coverly_profile_${user.id}`, JSON.stringify(newProfile))
  }

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    if (!user) return
    const newPreferences = { ...preferences, ...updates }
    setPreferences(newPreferences)
    localStorage.setItem(`coverly_preferences_${user.id}`, JSON.stringify(newPreferences))
  }

  const addApplication = (application: Omit<JobApplication, "id">) => {
    if (!user) return
    const newApplication = { ...application, id: Date.now().toString() }
    const newApplications = [...applications, newApplication]
    setApplications(newApplications)
    localStorage.setItem(`coverly_applications_${user.id}`, JSON.stringify(newApplications))
  }

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    if (!user) return
    const newApplications = applications.map((app) => (app.id === id ? { ...app, ...updates } : app))
    setApplications(newApplications)
    localStorage.setItem(`coverly_applications_${user.id}`, JSON.stringify(newApplications))
  }

  const setCvTemplate = (template: string) => {
    if (!user) return
    setCvTemplateState(template)
    localStorage.setItem(`coverly_cv_template_${user.id}`, template)
  }

  const exportData = () => {
    if (!user) return
    const data = {
      profile,
      preferences,
      applications,
      cvTemplate,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `coverly-data-${user.id}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const triggerScrape = async () => {
    if (!user) return

    // Simulate scraping process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newScraped = Math.floor(Math.random() * 50) + 20
    const newMatched = Math.floor(Math.random() * 10) + 5

    setScrapedJobsToday((prev) => prev + newScraped)
    setMatchedJobsToday((prev) => prev + newMatched)

    // Save stats
    const stats = {
      scrapedJobsToday: scrapedJobsToday + newScraped,
      matchedJobsToday: matchedJobsToday + newMatched,
      lastScrape: new Date().toISOString(),
    }
    localStorage.setItem(`coverly_stats_${user.id}`, JSON.stringify(stats))

    // Add some mock applications
    const mockJobs = [
      { jobTitle: "Software Developer", company: "TechCorp SA", location: "Cape Town", status: "applied" as const },
      {
        jobTitle: "Marketing Specialist",
        company: "AdVenture Ltd",
        location: "Johannesburg",
        status: "applied" as const,
      },
      { jobTitle: "Data Analyst", company: "DataFlow Inc", location: "Durban", status: "applied" as const },
    ]

    mockJobs.slice(0, Math.min(newMatched, 3)).forEach((job) => {
      addApplication({
        ...job,
        dateApplied: new Date().toISOString().split("T")[0],
        salary: `R${Math.floor(Math.random() * 50000) + 25000} - R${Math.floor(Math.random() * 100000) + 50000}`,
      })
    })
  }

  return (
    <AppContext.Provider
      value={{
        profile,
        preferences,
        applications,
        cvTemplate,
        updateProfile,
        updatePreferences,
        addApplication,
        updateApplication,
        setCvTemplate,
        exportData,
        scrapedJobsToday,
        matchedJobsToday,
        triggerScrape,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

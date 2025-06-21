"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

interface DonationContextType {
  showDonationPopup: boolean
  setShowDonationPopup: (show: boolean) => void
  lastDonationRequest: string | null
  dismissDonation: () => void
  snoozeForHour: () => void
  totalDonated: number
  addDonation: (amount: number) => void
}

const DonationContext = createContext<DonationContextType | undefined>(undefined)

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [showDonationPopup, setShowDonationPopup] = useState(false)
  const [lastDonationRequest, setLastDonationRequest] = useState<string | null>(null)
  const [totalDonated, setTotalDonated] = useState(0)
  const [dashboardEntryTime, setDashboardEntryTime] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      // Load donation data from localStorage
      const savedLastRequest = localStorage.getItem(`cvauto_last_donation_request_${user.id}`)
      const savedTotalDonated = localStorage.getItem(`cvauto_total_donated_${user.id}`)
      const savedDashboardEntry = localStorage.getItem(`cvauto_dashboard_entry_${user.id}`)

      if (savedLastRequest) {
        setLastDonationRequest(savedLastRequest)
      }

      if (savedTotalDonated) {
        setTotalDonated(Number.parseFloat(savedTotalDonated))
      }

      // Set dashboard entry time if not already set
      if (!savedDashboardEntry) {
        const entryTime = new Date().toISOString()
        setDashboardEntryTime(entryTime)
        localStorage.setItem(`cvauto_dashboard_entry_${user.id}`, entryTime)
      } else {
        setDashboardEntryTime(savedDashboardEntry)
      }
    }
  }, [user])

  useEffect(() => {
    if (!user || !dashboardEntryTime) return

    const checkDonationPopup = () => {
      const now = new Date().getTime()
      const entryTime = new Date(dashboardEntryTime).getTime()
      const timeSinceEntry = now - entryTime

      // Check if user has dismissed or snoozed recently
      const lastRequest = lastDonationRequest ? new Date(lastDonationRequest).getTime() : 0
      const timeSinceLastRequest = now - lastRequest

      // Show popup 10-15 minutes after dashboard entry (randomized)
      const minInterval = 10 * 60 * 1000 // 10 minutes
      const maxInterval = 15 * 60 * 1000 // 15 minutes
      const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval

      // Only show if enough time has passed since entry AND since last request (if any)
      const shouldShow = timeSinceEntry >= randomInterval && timeSinceLastRequest >= 60 * 60 * 1000 // At least 1 hour since last request

      if (shouldShow && !showDonationPopup) {
        setShowDonationPopup(true)
        const newRequestTime = new Date().toISOString()
        setLastDonationRequest(newRequestTime)
        localStorage.setItem(`cvauto_last_donation_request_${user.id}`, newRequestTime)
      }
    }

    // Check immediately
    checkDonationPopup()

    // Set up interval to check every minute
    const interval = setInterval(checkDonationPopup, 60 * 1000)

    return () => clearInterval(interval)
  }, [user, dashboardEntryTime, lastDonationRequest, showDonationPopup])

  const dismissDonation = () => {
    setShowDonationPopup(false)
  }

  const snoozeForHour = () => {
    const snoozeTime = new Date()
    snoozeTime.setHours(snoozeTime.getHours() + 1)
    const snoozeTimeString = snoozeTime.toISOString()

    setLastDonationRequest(snoozeTimeString)
    setShowDonationPopup(false)

    if (user) {
      localStorage.setItem(`cvauto_last_donation_request_${user.id}`, snoozeTimeString)
    }
  }

  const addDonation = (amount: number) => {
    const newTotal = totalDonated + amount
    setTotalDonated(newTotal)

    if (user) {
      localStorage.setItem(`cvauto_total_donated_${user.id}`, newTotal.toString())
    }
  }

  return (
    <DonationContext.Provider
      value={{
        showDonationPopup,
        setShowDonationPopup,
        lastDonationRequest,
        dismissDonation,
        snoozeForHour,
        totalDonated,
        addDonation,
      }}
    >
      {children}
    </DonationContext.Provider>
  )
}

export function useDonation() {
  const context = useContext(DonationContext)
  if (context === undefined) {
    throw new Error("useDonation must be used within a DonationProvider")
  }
  return context
}

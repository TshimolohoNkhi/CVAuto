"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

interface OnboardingContextType {
  isOnboardingComplete: boolean
  currentStep: number
  totalSteps: number
  completeOnboarding: () => void
  setCurrentStep: (step: number) => void
  skipOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  useEffect(() => {
    if (user) {
      const onboardingStatus = localStorage.getItem(`coverly_onboarding_${user.id}`)
      if (!onboardingStatus) {
        setIsOnboardingComplete(false)
        setCurrentStep(1)
      }
    }
  }, [user])

  const completeOnboarding = () => {
    if (user) {
      localStorage.setItem(`coverly_onboarding_${user.id}`, "completed")
      setIsOnboardingComplete(true)
    }
  }

  const skipOnboarding = () => {
    if (user) {
      localStorage.setItem(`coverly_onboarding_${user.id}`, "skipped")
      setIsOnboardingComplete(true)
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingComplete,
        currentStep,
        totalSteps,
        completeOnboarding,
        setCurrentStep,
        skipOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}

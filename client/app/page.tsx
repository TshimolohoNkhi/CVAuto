"use client"

import { useAuth } from "@/contexts/AuthContext"
import { AuthPage } from "@/components/AuthPage"
import { Dashboard } from "@/components/Dashboard"

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    return <AuthPage />
  }

  return <Dashboard />
}

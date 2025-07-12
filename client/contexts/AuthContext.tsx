"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type React from "react"

interface User {
  id: string
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        const { id, email } = data.session.user
        setUser({ id, email: email! })
      }
      setLoading(false)
    }

    getSession()

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! })
      } else {
        setUser(null)
      }
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  
    if (error || !data.session) {
      setLoading(false)
      return false
    }
  
    const { user } = data
    setUser({ id: user.id, email: user.email! })
    localStorage.setItem("coverly_user", JSON.stringify({ id: user.id, email: user.email }))
    setLoading(false)
    return true
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
  
    if (error || !data.user) {
      setLoading(false)
      return false
    }
  
    // Save name to your `profiles` table
    await supabase.from("profiles").insert([{ id: data.user.id, fullname: name }])
  
    setUser({ id: data.user.id, email: data.user.email!, name })
    localStorage.setItem("coverly_user", JSON.stringify({ id: data.user.id, email: data.user.email, name }))
    setLoading(false)
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem("coverly_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

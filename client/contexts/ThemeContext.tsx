"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"
type AccentColor = "blue" | "purple" | "green" | "orange" | "red"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [accentColor, setAccentColor] = useState<AccentColor>("blue")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Load saved theme and accent color
    const savedTheme = localStorage.getItem("cvauto_theme") as Theme
    const savedAccentColor = localStorage.getItem("cvauto_accent_color") as AccentColor

    if (savedTheme) setTheme(savedTheme)
    if (savedAccentColor) setAccentColor(savedAccentColor)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous theme classes
    root.classList.remove("light", "dark")

    // Apply theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      setIsDark(systemTheme === "dark")
    } else {
      root.classList.add(theme)
      setIsDark(theme === "dark")
    }

    // Apply accent color
    root.style.setProperty("--accent-color", getAccentColorValue(accentColor))

    // Save to localStorage
    localStorage.setItem("cvauto_theme", theme)
    localStorage.setItem("cvauto_accent_color", accentColor)
  }, [theme, accentColor])

  const getAccentColorValue = (color: AccentColor) => {
    const colors = {
      blue: "221.2 83.2% 53.3%",
      purple: "262.1 83.3% 57.8%",
      green: "142.1 76.2% 36.3%",
      orange: "24.6 95% 53.1%",
      red: "0 84.2% 60.2%",
    }
    return colors[color]
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

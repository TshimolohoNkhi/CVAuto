import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { AppProvider } from "@/contexts/AppContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { OnboardingProvider } from "@/contexts/OnboardingContext"
import { Toaster } from "@/components/ui/toaster"
import { DonationProvider } from "@/contexts/DonationContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CVAuto - Automated Job Application Assistant",
  description: "Automated job application assistant for South African job seekers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <DonationProvider>
                <OnboardingProvider>
                  <AppProvider>
                    {children}
                    <Toaster />
                  </AppProvider>
                </OnboardingProvider>
              </DonationProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { AppProvider } from "@/contexts/AppContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { OnboardingProvider } from "@/contexts/OnboardingContext"
import { Toaster } from "@/components/ui/toaster"
import { DonationProvider } from "@/contexts/DonationContext"

export const metadata: Metadata = {
  title: "Coverly - Automated Job Application Assistant",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter">
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

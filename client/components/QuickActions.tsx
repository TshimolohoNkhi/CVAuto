"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Zap, FileText, Search, Settings } from "lucide-react"

interface QuickActionsProps {
  onAction: (action: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const actions = [
    { id: "profile", label: "Update Profile", icon: Settings, color: "bg-blue-500 hover:bg-blue-600" },
    { id: "preferences", label: "Job Preferences", icon: Search, color: "bg-green-500 hover:bg-green-600" },
    { id: "cv", label: "Edit CV", icon: FileText, color: "bg-purple-500 hover:bg-purple-600" },
    { id: "scrape", label: "Find Jobs", icon: Zap, color: "bg-orange-500 hover:bg-orange-600" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-2">
        {isExpanded && (
          <Card className="animate-in slide-in-from-bottom-2 duration-200">
            <CardContent className="p-2">
              <div className="flex flex-col space-y-2">
                {actions.map((action) => (
                  <Button
                    key={action.id}
                    variant="ghost"
                    size="sm"
                    className="justify-start w-full"
                    onClick={() => {
                      onAction(action.id)
                      setIsExpanded(false)
                    }}
                  >
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Button size="lg" className="rounded-full w-14 h-14 shadow-lg" onClick={() => setIsExpanded(!isExpanded)}>
          <Plus className={`h-6 w-6 transition-transform ${isExpanded ? "rotate-45" : ""}`} />
        </Button>
      </div>
    </div>
  )
}

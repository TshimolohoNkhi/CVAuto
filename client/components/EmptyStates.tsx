"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, FileText, Plus } from "lucide-react"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
        {action && (
          <Button onClick={action.onClick}>
            <Plus className="mr-2 h-4 w-4" />
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function NoApplicationsState({ onCreateProfile }: { onCreateProfile: () => void }) {
  return (
    <EmptyState
      icon={<Briefcase className="h-8 w-8 text-gray-400" />}
      title="No Applications Yet"
      description="You haven't applied to any jobs yet. Complete your profile and set your preferences to start receiving matched job opportunities automatically."
      action={{
        label: "Complete Profile",
        onClick: onCreateProfile,
      }}
    />
  )
}

export function NoCvTemplateState({ onCreateTemplate }: { onCreateTemplate: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-8 w-8 text-gray-400" />}
      title="No CV Template"
      description="Create or upload a CV template to automatically generate personalized CVs for your job applications."
      action={{
        label: "Create Template",
        onClick: onCreateTemplate,
      }}
    />
  )
}

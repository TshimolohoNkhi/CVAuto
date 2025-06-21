"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/contexts/AppContext"
import { CheckCircle, Circle, AlertCircle } from "lucide-react"

export function ProfileProgress() {
  const { profile, preferences, cvTemplate } = useApp()

  const checklistItems = [
    {
      id: "basic-info",
      label: "Basic Information",
      completed: !!(profile.fullName && profile.email && profile.phone),
      required: true,
    },
    {
      id: "address",
      label: "Address Details",
      completed: !!(profile.address && profile.city && profile.province),
      required: true,
    },
    {
      id: "education",
      label: "Education History",
      completed: profile.education.length > 0,
      required: true,
    },
    {
      id: "experience",
      label: "Work Experience",
      completed: profile.workExperience.length > 0,
      required: false,
    },
    {
      id: "skills",
      label: "Skills & Languages",
      completed: profile.skills.length > 0 && profile.languages.length > 0,
      required: true,
    },
    {
      id: "preferences",
      label: "Job Preferences",
      completed: !!(preferences.preferredLocations.length > 0 && preferences.preferredIndustries.length > 0),
      required: true,
    },
    {
      id: "cv-template",
      label: "CV Template",
      completed: !!cvTemplate,
      required: false,
    },
  ]

  const completedRequired = checklistItems.filter((item) => item.required && item.completed).length
  const totalRequired = checklistItems.filter((item) => item.required).length
  const completedOptional = checklistItems.filter((item) => !item.required && item.completed).length
  const totalOptional = checklistItems.filter((item) => !item.required).length

  const overallProgress = ((completedRequired + completedOptional) / checklistItems.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Profile Completion
          <Badge variant={overallProgress === 100 ? "default" : "secondary"}>{Math.round(overallProgress)}%</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="space-y-3">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {item.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : item.required ? (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
                <span className={`text-sm ${item.completed ? "text-gray-900" : "text-gray-600"}`}>{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.required && (
                  <Badge variant="outline" className="text-xs">
                    Required
                  </Badge>
                )}
                {item.completed && (
                  <Badge variant="secondary" className="text-xs">
                    ✓
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-green-600">
                {completedRequired}/{totalRequired}
              </div>
              <div className="text-xs text-gray-600">Required Complete</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {completedOptional}/{totalOptional}
              </div>
              <div className="text-xs text-gray-600">Optional Complete</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

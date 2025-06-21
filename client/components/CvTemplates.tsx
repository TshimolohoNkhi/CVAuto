"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useApp } from "@/contexts/AppContext"
import { useToast } from "@/hooks/use-toast"
import { FileText, Upload, Eye, Save } from "lucide-react"

export function CvTemplates() {
  const { cvTemplate, setCvTemplate, profile } = useApp()
  const { toast } = useToast()
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleSave = () => {
    setCvTemplate(cvTemplate)
    toast({ title: "CV template saved successfully!" })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCvTemplate(content)
        toast({ title: "CV template uploaded successfully!" })
      }
      reader.readAsText(file)
    }
  }

  const generatePreview = () => {
    return cvTemplate
      .replace(/\{fullName\}/g, profile.fullName || "[Your Full Name]")
      .replace(/\{email\}/g, profile.email || "[Your Email]")
      .replace(/\{phone\}/g, profile.phone || "[Your Phone]")
      .replace(/\{address\}/g, profile.address || "[Your Address]")
      .replace(/\{city\}/g, profile.city || "[Your City]")
      .replace(/\{province\}/g, profile.province || "[Your Province]")
      .replace(/\{skills\}/g, profile.skills.join(", ") || "[Your Skills]")
      .replace(/\{languages\}/g, profile.languages.join(", ") || "[Your Languages]")
  }

  const defaultTemplate = `{fullName}
{email} | {phone}
{address}, {city}, {province}

PROFESSIONAL SUMMARY
[Brief summary of your professional background and key achievements]

SKILLS
{skills}

LANGUAGES
{languages}

WORK EXPERIENCE
[Your work experience will be automatically populated here]

EDUCATION
[Your education details will be automatically populated here]

REFERENCES
Available upon request`

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CV Templates</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewMode ? "Edit Mode" : "Preview Mode"}
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              CV Template Editor
            </CardTitle>
            <CardDescription>
              Create or edit your CV template. Use placeholders like {"{fullName}"}, {"{email}"}, etc.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="cv-upload"
              />
              <Button variant="outline" onClick={() => document.getElementById("cv-upload")?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Template
              </Button>
              <Button variant="outline" onClick={() => setCvTemplate(defaultTemplate)}>
                Use Default Template
              </Button>
            </div>

            <Textarea
              value={cvTemplate}
              onChange={(e) => setCvTemplate(e.target.value)}
              placeholder="Enter your CV template here..."
              className="min-h-[400px] font-mono text-sm"
            />

            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Available placeholders:</p>
              <div className="grid grid-cols-2 gap-1">
                <span>{"{fullName}"}</span>
                <span>{"{email}"}</span>
                <span>{"{phone}"}</span>
                <span>{"{address}"}</span>
                <span>{"{city}"}</span>
                <span>{"{province}"}</span>
                <span>{"{skills}"}</span>
                <span>{"{languages}"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              CV Preview
            </CardTitle>
            <CardDescription>Preview of your CV with your profile data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white border rounded-lg p-6 min-h-[400px]">
              <pre className="whitespace-pre-wrap text-sm font-sans">
                {cvTemplate
                  ? generatePreview()
                  : "No template available. Create or upload a template to see the preview."}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Template Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Formatting Tips:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Use placeholders for dynamic content</li>
                <li>• Keep formatting simple and clean</li>
                <li>• Use consistent spacing and alignment</li>
                <li>• Include all relevant sections</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Start with a professional summary</li>
                <li>• List skills and languages prominently</li>
                <li>• Use action verbs for achievements</li>
                <li>• Keep it concise and relevant</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

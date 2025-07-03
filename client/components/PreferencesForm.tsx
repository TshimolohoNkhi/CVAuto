"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useApp } from "@/contexts/AppContext"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

const SA_LOCATIONS = [
  "Cape Town",
  "Johannesburg",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Pietermaritzburg",
  "Kimberley",
  "Polokwane",
]

const INDUSTRIES = [
  "Information Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Construction",
  "Mining",
  "Agriculture",
  "Tourism",
  "Media",
  "Legal",
]

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"]

const EDUCATION_LEVELS = [
  "Matric/Grade 12",
  "Certificate",
  "Diploma",
  "Bachelor's Degree",
  "Honours Degree",
  "Master's Degree",
  "Doctoral Degree",
]

const LANGUAGES = [
  "English",
  "Afrikaans",
  "Zulu",
  "Xhosa",
  "Sotho",
  "Tswana",
  "Pedi",
  "Venda",
  "Tsonga",
  "Ndebele",
  "Swati",
]

const AVAILABILITY_OPTIONS = [
  "Immediately",
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2 months",
  "Within 3 months",
]

export function PreferencesForm() {
  const { preferences, updatePreferences } = useApp()
  const { toast } = useToast()

  const handleSave = async () => {
    updatePreferences(preferences)
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      console.error("No user session found")
      toast({ title: "Error: Not logged in. Please reload page.", variant: "destructive" })
      return
    }

    const res = await fetch('/server/save_preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(preferences),
    })


    if (!res.ok) {
      toast({ title: "Failed to save preferences. Please try again.", variant: "destructive" })
      console.error(await res.text())
      return
    } else {
      toast({ title: "Preferences saved successfully!" })
    }
  }

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Preferences</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </div>

      {/* Location Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Location Preferences</CardTitle>
          <CardDescription>Select your preferred work locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SA_LOCATIONS.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={preferences.preferredLocations.includes(location)}
                  onCheckedChange={(checked) => {
                    updatePreferences({
                      preferredLocations: toggleArrayItem(preferences.preferredLocations, location),
                    })
                  }}
                />
                <Label htmlFor={`location-${location}`} className="text-sm">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Preferences</CardTitle>
          <CardDescription>Select industries you're interested in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {INDUSTRIES.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={`industry-${industry}`}
                  checked={preferences.preferredIndustries.includes(industry)}
                  onCheckedChange={(checked) => {
                    updatePreferences({
                      preferredIndustries: toggleArrayItem(preferences.preferredIndustries, industry),
                    })
                  }}
                />
                <Label htmlFor={`industry-${industry}`} className="text-sm">
                  {industry}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Criminal Record */}
      <Card>
        <CardHeader>
          <CardTitle>Background Information</CardTitle>
          <CardDescription>This information helps match you with appropriate opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Do you have a criminal record?</Label>
            <RadioGroup
              value={preferences.criminalRecord}
              onValueChange={(value: "yes" | "no" | "prefer-not-to-say") =>
                updatePreferences({ criminalRecord: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="criminal-no" />
                <Label htmlFor="criminal-no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="criminal-yes" />
                <Label htmlFor="criminal-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prefer-not-to-say" id="criminal-prefer" />
                <Label htmlFor="criminal-prefer">Prefer not to say</Label>
              </div>
            </RadioGroup>
          </div>

          {preferences.criminalRecord === "yes" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="willing-to-work"
                checked={preferences.willingToWorkWithRecord}
                onCheckedChange={(checked) => updatePreferences({ willingToWorkWithRecord: !!checked })}
              />
              <Label htmlFor="willing-to-work">
                I am willing to work with employers who accept candidates with a criminal record
              </Label>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Type Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Job Type Preferences</CardTitle>
          <CardDescription>Select your preferred employment types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {JOB_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`job-type-${type}`}
                  checked={preferences.jobTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    updatePreferences({
                      jobTypes: toggleArrayItem(preferences.jobTypes, type),
                    })
                  }}
                />
                <Label htmlFor={`job-type-${type}`} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Expectations */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Expectations</CardTitle>
          <CardDescription>Specify your salary range in South African Rand (ZAR)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary-min">Minimum Salary (ZAR)</Label>
              <Input
                id="salary-min"
                type="number"
                value={preferences.salaryMin}
                onChange={(e) => updatePreferences({ salaryMin: Number.parseInt(e.target.value) || 0 })}
                placeholder="25000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary-max">Maximum Salary (ZAR)</Label>
              <Input
                id="salary-max"
                type="number"
                value={preferences.salaryMax}
                onChange={(e) => updatePreferences({ salaryMax: Number.parseInt(e.target.value) || 0 })}
                placeholder="80000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education Level */}
      <Card>
        <CardHeader>
          <CardTitle>Education Level</CardTitle>
          <CardDescription>Select your highest level of education</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={preferences.educationLevel}
            onValueChange={(value) => updatePreferences({ educationLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {EDUCATION_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages Spoken</CardTitle>
          <CardDescription>Select all languages you can speak fluently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {LANGUAGES.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`language-${language}`}
                  checked={preferences.languagesSpoken.includes(language)}
                  onCheckedChange={(checked) => {
                    updatePreferences({
                      languagesSpoken: toggleArrayItem(preferences.languagesSpoken, language),
                    })
                  }}
                />
                <Label htmlFor={`language-${language}`} className="text-sm">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>When can you start working?</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={preferences.availability}
            onValueChange={(value) => updatePreferences({ availability: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Other Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Preferences</CardTitle>
          <CardDescription>Other job search preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="disability-friendly"
              checked={preferences.disabilityFriendly}
              onCheckedChange={(checked) => updatePreferences({ disabilityFriendly: !!checked })}
            />
            <Label htmlFor="disability-friendly">Only show disability-friendly jobs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote-only"
              checked={preferences.remoteOnly}
              onCheckedChange={(checked) => updatePreferences({ remoteOnly: !!checked })}
            />
            <Label htmlFor="remote-only">Only show remote work opportunities</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

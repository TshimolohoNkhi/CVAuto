"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { useApp } from "../contexts/AppContext"
import { useToast } from "../hooks/use-toast"
import { Plus, X, Save } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export function ProfileSetup() {
  const { profile, updateProfile } = useApp()
  const { toast } = useToast()
  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")

  const handleSave = async () => {
    updateProfile(profile)
    // TODO: Pass information to the backend to update the user's profile and populate the database
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      console.error("No user session found")
      toast({ title: "Error: Not logged in. Please reload the page.", variant: "destructive" })
      return
    }

    const res = await fetch('/server/save_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(profile),
    })

    //TODO: Add a processing animation until confirmation is received from the backend that the data has been saved

    if (!res.ok) {
      toast({ title: "Failed to save profile. Please try again.", variant: "destructive" })
      console.error(await res.text())
      return
    } else {
      toast({ title: "Profile saved successfully!" })
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      updateProfile({ skills: [...profile.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    updateProfile({ skills: profile.skills.filter((s) => s !== skill) })
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      updateProfile({ languages: [...profile.languages, newLanguage.trim()] })
      setNewLanguage("")
      // TODO: Add gentle reminder to remember to save the profile
    }
  }

  const removeLanguage = (language: string) => {
    updateProfile({ languages: profile.languages.filter((l) => l !== language) })
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    updateProfile({ education: [...profile.education, newEducation] })
  }

  const updateEducation = (id: string, updates: any) => {
    const updatedEducation = profile.education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu))
    updateProfile({ education: updatedEducation })
  }

  const removeEducation = (id: string) => {
    updateProfile({ education: profile.education.filter((edu) => edu.id !== id) })
  }

  const addWorkExperience = () => {
    const newWork = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    updateProfile({ workExperience: [...profile.workExperience, newWork] })
  }

  const updateWorkExperience = (id: string, updates: any) => {
    const updatedWork = profile.workExperience.map((work) => (work.id === id ? { ...work, ...updates } : work))
    updateProfile({ workExperience: updatedWork })
  }

  const removeWorkExperience = (id: string) => {
    updateProfile({ workExperience: profile.workExperience.filter((work) => work.id !== id) })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Setup</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Profile
        </Button>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => updateProfile({ fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => updateProfile({ email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => updateProfile({ phone: e.target.value })}
                placeholder="+27 12 345 6789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={profile.city}
                onChange={(e) => updateProfile({ city: e.target.value })}
                placeholder="Cape Town"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Input
                id="province"
                value={profile.province}
                onChange={(e) => updateProfile({ province: e.target.value })}
                placeholder="Western Cape"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={profile.postalCode}
                onChange={(e) => updateProfile({ postalCode: e.target.value })}
                placeholder="8001"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => updateProfile({ address: e.target.value })}
              placeholder="123 Main Street"
            />
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>Your educational background</CardDescription>
            </div>
            <Button onClick={addEducation} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Education Entry</h4>
                <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="University of Cape Town"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor's Degree"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    disabled={edu.current}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${edu.id}`}
                    checked={edu.current}
                    onChange={(e) => updateEducation(edu.id, { current: e.target.checked })}
                  />
                  <Label htmlFor={`current-${edu.id}`}>Currently studying</Label>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Your professional experience</CardDescription>
            </div>
            <Button onClick={addWorkExperience} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.workExperience.map((work) => (
            <div key={work.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Work Experience</h4>
                <Button variant="ghost" size="sm" onClick={() => removeWorkExperience(work.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={work.company}
                    onChange={(e) => updateWorkExperience(work.id, { company: e.target.value })}
                    placeholder="ABC Company"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={work.position}
                    onChange={(e) => updateWorkExperience(work.id, { position: e.target.value })}
                    placeholder="Software Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={work.startDate}
                    onChange={(e) => updateWorkExperience(work.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={work.endDate}
                    onChange={(e) => updateWorkExperience(work.id, { endDate: e.target.value })}
                    disabled={work.current}
                  />
                </div>
                <div className="flex items-center space-x-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id={`current-work-${work.id}`}
                    checked={work.current}
                    onChange={(e) => updateWorkExperience(work.id, { current: e.target.checked })}
                  />
                  <Label htmlFor={`current-work-${work.id}`}>Currently working here</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={work.description}
                  onChange={(e) => updateWorkExperience(work.id, { description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Add your professional skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Languages you can speak</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add a language..."
              onKeyPress={(e) => e.key === "Enter" && addLanguage()}
            />
            <Button onClick={addLanguage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((language) => (
              <Badge key={language} variant="secondary" className="flex items-center gap-1">
                {language}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(language)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

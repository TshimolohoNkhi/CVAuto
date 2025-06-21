"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/contexts/NotificationContext"
import { MessageSquare, Bug, Lightbulb, Send, Star, ThumbsUp, AlertTriangle } from "lucide-react"

export function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [priority, setPriority] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form
    setFeedbackType("")
    setTitle("")
    setDescription("")
    setEmail("")
    setPriority("")

    toast({
      title: "Feedback submitted! 🎉",
      description: "Thank you for helping us improve CVAuto. We'll review your feedback soon.",
    })

    addNotification({
      title: "Feedback submitted successfully",
      message: "Our team will review your feedback and get back to you if needed.",
      type: "success",
    })

    setIsSubmitting(false)
  }

  const feedbackTypes = [
    { value: "bug", label: "Bug Report", icon: Bug, color: "text-red-500" },
    { value: "feature", label: "Feature Request", icon: Lightbulb, color: "text-yellow-500" },
    { value: "improvement", label: "Improvement", icon: Star, color: "text-blue-500" },
    { value: "general", label: "General Feedback", icon: MessageSquare, color: "text-green-500" },
  ]

  const priorityLevels = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-500" />
          Feedback & Support
        </h2>
        <p className="text-gray-600">Help us improve CVAuto by reporting issues or suggesting new features</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Feedback Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>
                Your feedback helps us make CVAuto better for all South African job seekers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type */}
                <div className="space-y-3">
                  <Label>Feedback Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {feedbackTypes.map((type) => (
                      <Button
                        key={type.value}
                        type="button"
                        variant={feedbackType === type.value ? "default" : "outline"}
                        onClick={() => setFeedbackType(type.value)}
                        className="h-16 flex flex-col items-center justify-center"
                      >
                        <type.icon className={`h-5 w-5 mb-1 ${type.color}`} />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of your feedback"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your feedback..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                {/* Priority (for bugs) */}
                {feedbackType === "bug" && (
                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center gap-2">
                              <Badge className={level.color}>{level.label}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Email (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Provide your email if you'd like us to follow up on your feedback
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!feedbackType || !title || !description || isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">💡 Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <Bug className="h-3 w-3 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Bug Reports</p>
                    <p className="text-gray-600">Include steps to reproduce the issue</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Feature Requests</p>
                    <p className="text-gray-600">Explain how it would help your job search</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-3 w-3 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Improvements</p>
                    <p className="text-gray-600">Suggest ways to make existing features better</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">📞 Other Ways to Reach Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs space-y-2">
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-gray-600">support@cvauto.co.za</p>
                </div>
                <div>
                  <p className="font-medium">GitHub Issues</p>
                  <p className="text-gray-600">github.com/cvauto/issues</p>
                </div>
                <div>
                  <p className="font-medium">Community Discord</p>
                  <p className="text-gray-600">discord.gg/cvauto</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Response Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Critical bugs:</span>
                  <Badge className="bg-red-100 text-red-800">24 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span>General feedback:</span>
                  <Badge className="bg-blue-100 text-blue-800">3-5 days</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Feature requests:</span>
                  <Badge className="bg-green-100 text-green-800">1-2 weeks</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appreciation */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="text-center py-6">
              <ThumbsUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Thank You!</h4>
              <p className="text-xs text-gray-600">
                Your feedback helps us build better tools for South African job seekers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

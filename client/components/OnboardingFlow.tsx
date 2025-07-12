"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "@/contexts/OnboardingContext"
import { useNotifications } from "@/contexts/NotificationContext"
import {
  User,
  Settings,
  FileText,
  Briefcase,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to Coverly! 🎉",
    description: "Let's get you set up to find your dream job in South Africa",
    icon: Sparkles,
    content: (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Welcome to Coverly!</h3>
        <p className="text-gray-600">
          Coverly is your automated job application assistant. We'll help you find and apply to relevant jobs across
          South Africa while you focus on preparing for interviews.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-medium">Smart Matching</h4>
            <p className="text-sm text-gray-600">AI-powered job matching based on your profile</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-medium">Auto Apply</h4>
            <p className="text-sm text-gray-600">Automatic applications to matched positions</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <Briefcase className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-medium">Track Progress</h4>
            <p className="text-sm text-gray-600">Monitor all your applications in one place</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Complete Your Profile",
    description: "Add your personal information, education, and work experience",
    icon: User,
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="h-8 w-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Build Your Professional Profile</h3>
            <p className="text-gray-600">This information helps us match you with the right opportunities</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Personal information (name, contact details)</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Education history</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Work experience</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Skills and languages</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Set Job Preferences",
    description: "Tell us what kind of job you're looking for",
    icon: Settings,
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Settings className="h-8 w-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Define Your Job Preferences</h3>
            <p className="text-gray-600">Help us find the perfect matches for you</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Location & Industry</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Preferred cities in South Africa</li>
              <li>• Industries you're interested in</li>
              <li>• Remote work preferences</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Job Details</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Employment type (full-time, part-time)</li>
              <li>• Salary expectations</li>
              <li>• Availability to start</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Create CV Template",
    description: "Upload or create your CV template for applications",
    icon: FileText,
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold">Set Up Your CV Template</h3>
            <p className="text-gray-600">We'll use this to create personalized CVs for each application</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-medium mb-2">CV Template Features:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Dynamic placeholders for personal info</li>
            <li>• Automatic formatting with your profile data</li>
            <li>• Professional templates to choose from</li>
            <li>• Easy editing and customization</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "You're All Set! 🚀",
    description: "Start your automated job search journey",
    icon: CheckCircle,
    content: (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Congratulations! 🎉</h3>
        <p className="text-gray-600">
          You're now ready to start your automated job search. Coverly will begin finding and applying to relevant
          positions based on your preferences.
        </p>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
          <h4 className="font-medium mb-2">What happens next?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• We'll start scraping job sites for relevant positions</li>
            <li>• Matched jobs will appear in your dashboard</li>
            <li>• You'll receive notifications about new applications</li>
            <li>• Track your progress in the analytics section</li>
          </ul>
        </div>
      </div>
    ),
  },
]

export function OnboardingFlow() {
  const { currentStep, totalSteps, completeOnboarding, setCurrentStep, skipOnboarding } = useOnboarding()
  const { addNotification } = useNotifications()
  const [isCompleting, setIsCompleting] = useState(false)

  const currentStepData = onboardingSteps.find((step) => step.id === currentStep) || onboardingSteps[0]
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsCompleting(true)

    // Simulate completion process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    completeOnboarding()
    addNotification({
      title: "Welcome to Coverly! 🎉",
      message: "Your account is set up and ready. We'll start finding job opportunities for you.",
      type: "success",
    })

    setIsCompleting(false)
  }

  const handleSkip = () => {
    skipOnboarding()
    addNotification({
      title: "Onboarding skipped",
      message: "You can complete your profile setup anytime from the Profile tab.",
      type: "info",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <currentStepData.icon className="h-6 w-6 text-blue-500" />
              <div>
                <CardTitle>{currentStepData.title}</CardTitle>
                <CardDescription>{currentStepData.description}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStepData.content}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              <Button variant="ghost" onClick={handleSkip}>
                Skip Setup
              </Button>
            </div>

            <Button
              onClick={handleNext}
              disabled={isCompleting}
              className={currentStep === totalSteps ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isCompleting ? (
                "Completing..."
              ) : currentStep === totalSteps ? (
                "Complete Setup"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useDonation } from "@/contexts/DonationContext"
import { useNotifications } from "@/contexts/NotificationContext"
import { Heart, Users, Target, Zap, Coffee, Star, Gift, MessageSquare } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function DonationSection() {
  const { totalDonated, addDonation } = useDonation()
  const { addNotification } = useNotifications()
  const [showPayment, setShowPayment] = useState(false)
  const [showAppreciation, setShowAppreciation] = useState(false)

  // Mock data for demonstration
  const monthlyGoal = 5000
  const currentMonthDonations = 3250
  const totalSupporters = 127
  const progressPercentage = (currentMonthDonations / monthlyGoal) * 100

  const handleDonate = () => {
    setShowPayment(true)
  }

  if (showPayment) {
    return <PaymentModal onClose={() => setShowPayment(false)} />
  }

  if (showAppreciation) {
    return <AppreciationModal onClose={() => setShowAppreciation(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          Support CVAuto
        </h2>
        <p className="text-gray-600">Help us keep CVAuto free and improve job opportunities for South Africans</p>
      </div>

      {/* Monthly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Monthly Goal
            </span>
            <Badge variant="secondary">
              R{currentMonthDonations.toLocaleString()} / R{monthlyGoal.toLocaleString()}
            </Badge>
          </CardTitle>
          <CardDescription>Help us reach our monthly funding goal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{totalSupporters}</div>
              <div className="text-xs text-gray-600">Supporters</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                R{(monthlyGoal - currentMonthDonations).toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Contribution */}
      {totalDonated > 0 && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Gift className="h-5 w-5" />
              Your Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">R{totalDonated.toLocaleString()}</div>
              <p className="text-sm text-green-700">Thank you for supporting CVAuto! 🙏</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Impact Stories */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Server Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Your donations help us maintain reliable servers that process thousands of job applications daily.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-500" />
              New Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Fund development of new features like AI-powered CV optimization and interview preparation tools.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Free Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Keep CVAuto completely free for all South African job seekers, regardless of their financial situation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Donation Tiers */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tiers</CardTitle>
          <CardDescription>Choose a support level that works for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Coffee className="h-8 w-8 text-orange-500 mx-auto" />
              <h4 className="font-medium">Coffee Supporter</h4>
              <div className="text-lg font-bold">R25</div>
              <p className="text-xs text-gray-600">Buy us a coffee to keep coding!</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Zap className="h-8 w-8 text-blue-500 mx-auto" />
              <h4 className="font-medium">Power User</h4>
              <div className="text-lg font-bold">R100</div>
              <p className="text-xs text-gray-600">Help power our servers for a day</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Star className="h-8 w-8 text-purple-500 mx-auto" />
              <h4 className="font-medium">Feature Sponsor</h4>
              <div className="text-lg font-bold">R500</div>
              <p className="text-xs text-gray-600">Fund new feature development</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
              <Heart className="h-8 w-8 text-red-500 mx-auto" />
              <h4 className="font-medium">Champion</h4>
              <div className="text-lg font-bold">R1000+</div>
              <p className="text-xs text-gray-600">Become a CVAuto champion!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20 border-pink-200">
        <CardContent className="text-center py-8">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Ready to Support CVAuto?</h3>
          <p className="text-gray-600 mb-6">
            Every donation, no matter the size, helps us continue providing free job search automation to South
            Africans.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleDonate}
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 text-white font-semibold py-4 px-8 shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <Heart className="mr-2 h-5 w-5" />
              ❤️ Make a Donation ❤️
            </Button>

            <Button
              onClick={() => setShowAppreciation(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold py-4 px-8 shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <MessageSquare className="mr-2 h-5 w-5" />💙 Share Your Appreciation 💙
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transparency */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Transparency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-600 space-y-2">
            <p>• 100% of donations go towards CVAuto development and maintenance</p>
            <p>• Monthly financial reports available on our GitHub</p>
            <p>• Open source project - you can see exactly how we use funds</p>
            <p>• Based in South Africa, supporting local job seekers</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentModal({ onClose }: { onClose: () => void }) {
  const { addDonation } = useDonation()
  const { addNotification } = useNotifications()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const predefinedAmounts = [25, 50, 100, 200, 500, 1000]

  const handleDonation = async (amount: number) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    addDonation(amount)
    addNotification({
      title: "Thank you for your donation! 🎉",
      message: `Your R${amount} donation helps keep CVAuto free for everyone.`,
      type: "success",
    })

    setIsProcessing(false)
    onClose()
  }

  const handleAmountSelect = (amount: number) => {
    if (selectedAmount === amount) {
      // Deselect if clicking the same amount
      setSelectedAmount(null)
    } else {
      setSelectedAmount(amount)
      setCustomAmount("")
    }
  }

  const finalAmount = selectedAmount || Number.parseFloat(customAmount) || 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg animate-in slide-in-from-bottom-2 duration-300 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Support CVAuto
              </CardTitle>
              <CardDescription>Choose your donation amount</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Predefined Amounts */}
          <div className="space-y-3">
            <h4 className="font-medium">Quick amounts (ZAR)</h4>
            <div className="grid grid-cols-3 gap-2">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handleAmountSelect(amount)}
                  className="h-12"
                >
                  R{amount}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500">Click again to deselect</p>
          </div>

          {/* Custom Amount */}
          <div className="space-y-3">
            <h4 className="font-medium">Custom amount</h4>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(null)
                }}
                className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="font-medium">Payment method</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-16 flex flex-col">
                <span className="text-2xl mb-1">💳</span>
                <span className="text-xs">Credit Card</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col">
                <span className="text-2xl mb-1">🏦</span>
                <span className="text-xs">Bank Transfer</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col">
                <span className="text-2xl mb-1">📱</span>
                <span className="text-xs">PayFast</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col">
                <span className="text-2xl mb-1">💰</span>
                <span className="text-xs">SnapScan</span>
              </Button>
            </div>
          </div>

          {/* Donation Impact */}
          {finalAmount > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Your impact</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {finalAmount >= 1000 && <p>🚀 Helps us add 10+ new job sites</p>}
                {finalAmount >= 500 && <p>⚡ Powers our servers for a month</p>}
                {finalAmount >= 200 && <p>🔧 Funds major feature development</p>}
                {finalAmount >= 100 && <p>🎯 Supports AI improvements</p>}
                {finalAmount >= 50 && <p>☕ Keeps our developers productive</p>}
                {finalAmount >= 25 && <p>💙 Shows your support for the project</p>}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => handleDonation(finalAmount)}
              disabled={finalAmount <= 0 || isProcessing}
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  Donate R{finalAmount}
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>🔒 Secure payment processing</p>
            <p>All donations go towards keeping CVAuto free and improving the service</p>
            <p>🇿🇦 Supporting South African job seekers</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AppreciationModal({ onClose }: { onClose: () => void }) {
  const { addNotification } = useNotifications()
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    addNotification({
      title: "Thank you for your kind words! 🥰",
      message: "Your appreciation means the world to us and motivates our team.",
      type: "success",
    })

    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg animate-in slide-in-from-bottom-2 duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-500" />
                Share Your Appreciation
              </CardTitle>
              <CardDescription>Your kind words mean just as much to us as donations 💙</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
              <p className="text-sm text-gray-600">
                Can't donate right now? No problem! Your appreciation and kind words are incredibly valuable to our team
                and help us stay motivated to keep CVAuto free for everyone.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appreciation-name">Your Name (optional)</Label>
              <Input
                id="appreciation-name"
                placeholder="How should we address you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appreciation-message">Your Message</Label>
              <Textarea
                id="appreciation-message"
                placeholder="Share how CVAuto has helped you, what you appreciate about the service, or just say hello! Every word of encouragement helps our team stay motivated."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">💡 Ideas for your message:</h4>
              <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• How CVAuto has helped your job search</li>
                <li>• Features you love most</li>
                <li>• How it's made your life easier</li>
                <li>• Encouragement for our team</li>
                <li>• What CVAuto means to you</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!message.trim() || isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Send Appreciation
                  </>
                )}
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>💙 Your words of encouragement help us keep CVAuto free</p>
              <p>🇿🇦 Thank you for being part of our South African community</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

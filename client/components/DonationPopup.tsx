"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDonation } from "@/contexts/DonationContext"
import { useNotifications } from "@/contexts/NotificationContext"
import { Heart, X, Clock, Coffee, Zap, Star, MessageSquare } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function DonationPopup() {
  const { showDonationPopup, dismissDonation, snoozeForHour } = useDonation()
  const { addNotification } = useNotifications()
  const [showPayment, setShowPayment] = useState<string | false>(false)

  if (!showDonationPopup) return null

  const handleDonate = () => {
    setShowPayment("payment")
  }

  const handleDismiss = () => {
    dismissDonation()
    addNotification({
      title: "Thanks for considering! 💙",
      message: "Your support means the world to us. We'll ask again later.",
      type: "info",
    })
  }

  const handleSnooze = () => {
    snoozeForHour()
    addNotification({
      title: "Reminder snoozed ⏰",
      message: "We'll remind you about donations in an hour.",
      type: "info",
    })
  }

  if (showPayment === "payment") {
    return <PaymentModal onClose={() => setShowPayment(false)} />
  }

  if (showPayment === "appreciation") {
    return <AppreciationModal onClose={() => setShowPayment(false)} />
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-in slide-in-from-bottom-2 duration-300">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            Support Coverly 💙
            <Badge variant="secondary" className="bg-gradient-to-r from-pink-100 to-red-100 text-pink-700">
              Free to Use
            </Badge>
          </CardTitle>
          <CardDescription>Help us keep Coverly free and improve job opportunities for South Africans</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Coverly has helped you apply to jobs automatically. Your support helps us:
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Keep the service free for everyone</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                <Star className="h-4 w-4 text-green-500" />
                <span>Add more job sites and features</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                <Coffee className="h-4 w-4 text-purple-500" />
                <span>Support our development team</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 text-white font-semibold py-3 shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <Heart className="mr-2 h-5 w-5" />
              ❤️ Support Coverly ❤️
            </Button>

            <Button
              onClick={() => setShowPayment("appreciation")}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold py-3 shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <MessageSquare className="mr-2 h-5 w-5" />💙 Share Appreciation Instead 💙
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSnooze} className="flex-1">
                <Clock className="mr-2 h-4 w-4" />
                Remind me later
              </Button>
              <Button variant="ghost" onClick={handleDismiss} className="flex-1">
                <X className="mr-2 h-4 w-4" />
                Not now
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">🇿🇦 Proudly supporting South African job seekers</p>
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

  const predefinedAmounts = [25, 50, 100, 200, 500]

  const handleDonation = async (amount: number) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    addDonation(amount)
    addNotification({
      title: "Thank you for your donation! 🎉",
      message: `Your R${amount} donation helps keep Coverly free for everyone.`,
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
      <Card className="w-full max-w-lg animate-in slide-in-from-bottom-2 duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Support Coverly
              </CardTitle>
              <CardDescription>Choose your donation amount</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
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
              <Button variant="outline" className="h-12 flex flex-col">
                <span className="font-medium">💳</span>
                <span className="text-xs">Credit Card</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col">
                <span className="font-medium">🏦</span>
                <span className="text-xs">Bank Transfer</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col">
                <span className="font-medium">📱</span>
                <span className="text-xs">PayFast</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col">
                <span className="font-medium">💰</span>
                <span className="text-xs">SnapScan</span>
              </Button>
            </div>
          </div>

          {/* Donation Impact */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Your impact</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {finalAmount >= 500 && <p>🚀 Helps us add 5+ new job sites</p>}
              {finalAmount >= 200 && <p>⚡ Powers our servers for a week</p>}
              {finalAmount >= 100 && <p>🔧 Funds new feature development</p>}
              {finalAmount >= 50 && <p>☕ Keeps our developers caffeinated</p>}
              {finalAmount >= 25 && <p>💙 Shows your support for the project</p>}
            </div>
          </div>

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

          <div className="text-center text-xs text-gray-500">
            <p>🔒 Secure payment processing</p>
            <p>All donations go towards keeping Coverly free and improving the service</p>
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
                and help us stay motivated to keep Coverly free for everyone.
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
                placeholder="Share how Coverly has helped you, what you appreciate about the service, or just say hello! Every word of encouragement helps our team stay motivated."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">💡 Ideas for your message:</h4>
              <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• How Coverly has helped your job search</li>
                <li>• Features you love most</li>
                <li>• How it's made your life easier</li>
                <li>• Encouragement for our team</li>
                <li>• What Coverly means to you</li>
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
              <p>💙 Your words of encouragement help us keep Coverly free</p>
              <p>🇿🇦 Thank you for being part of our South African community</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

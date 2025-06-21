"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useApp } from "@/contexts/AppContext"
import { TrendingUp, TrendingDown, Target, Calendar, MapPin, Building } from "lucide-react"

export function AdvancedAnalytics() {
  const { applications } = useApp()

  // Calculate analytics
  const totalApplications = applications.length
  const thisMonth = applications.filter((app) => new Date(app.dateApplied).getMonth() === new Date().getMonth()).length
  const lastMonth = applications.filter(
    (app) => new Date(app.dateApplied).getMonth() === new Date().getMonth() - 1,
  ).length

  const monthlyGrowth = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0

  const statusCounts = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const responseRate =
    totalApplications > 0
      ? (((statusCounts.reviewing || 0) +
          (statusCounts.interview || 0) +
          (statusCounts.accepted || 0) +
          (statusCounts.rejected || 0)) /
          totalApplications) *
        100
      : 0
  const interviewRate =
    totalApplications > 0
      ? (((statusCounts.interview || 0) + (statusCounts.accepted || 0)) / totalApplications) * 100
      : 0
  const successRate = totalApplications > 0 ? ((statusCounts.accepted || 0) / totalApplications) * 100 : 0

  // Top locations and companies
  const locationCounts = applications.reduce(
    (acc, app) => {
      acc[app.location] = (acc[app.location] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const companyCounts = applications.reduce(
    (acc, app) => {
      acc[app.company] = (acc[app.company] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topLocations = Object.entries(locationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const topCompanies = Object.entries(companyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  // Weekly application trend
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dayApplications = applications.filter(
      (app) => new Date(app.dateApplied).toDateString() === date.toDateString(),
    ).length
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      applications: dayApplications,
    }
  })

  const maxWeeklyApplications = Math.max(...weeklyData.map((d) => d.applications), 1)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Response Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseRate.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {responseRate > 50 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              {responseRate > 50 ? "Above average" : "Below average"}
            </div>
          </CardContent>
        </Card>

        {/* Interview Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewRate.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-muted-foreground">Industry average: 8.2%</div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-muted-foreground">Job offers received</div>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyGrowth > 0 ? "+" : ""}
              {monthlyGrowth.toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">{thisMonth} applications this month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Application Trend</CardTitle>
            <CardDescription>Applications submitted in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{day.day}</span>
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-32">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(day.applications / maxWeeklyApplications) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-6 text-right">{day.applications}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Current status of all applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statusCounts).map(([status, count]) => {
                const percentage = totalApplications > 0 ? (count / totalApplications) * 100 : 0
                const statusLabels = {
                  applied: { label: "Applied", color: "bg-blue-500" },
                  reviewing: { label: "Under Review", color: "bg-yellow-500" },
                  interview: { label: "Interview", color: "bg-purple-500" },
                  rejected: { label: "Rejected", color: "bg-red-500" },
                  accepted: { label: "Accepted", color: "bg-green-500" },
                }

                const statusInfo = statusLabels[status as keyof typeof statusLabels]
                if (!statusInfo) return null

                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{statusInfo.label}</span>
                      <span>
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Top Locations
            </CardTitle>
            <CardDescription>Cities where you've applied most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLocations.length > 0 ? (
                topLocations.map(([location, count], index) => (
                  <div key={location} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <span className="text-sm">{location}</span>
                    </div>
                    <span className="text-sm font-medium">{count} applications</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No applications yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Companies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Top Companies
            </CardTitle>
            <CardDescription>Companies you've applied to most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCompanies.length > 0 ? (
                topCompanies.map(([company, count], index) => (
                  <div key={company} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <span className="text-sm">{company}</span>
                    </div>
                    <span className="text-sm font-medium">{count} applications</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No applications yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/contexts/AppContext"
import { useToast } from "@/hooks/use-toast"
import { Download, Calendar, TrendingUp, BarChart3 } from "lucide-react"

export function ApplicationHistory() {
  const { applications, exportData } = useApp()
  const { toast } = useToast()
  const [timeFilter, setTimeFilter] = useState("all")

  const handleExport = () => {
    exportData()
    toast({ title: "Data exported successfully!", description: "Your application history has been downloaded." })
  }

  const getFilteredApplications = () => {
    const now = new Date()
    const filterDate = new Date()

    switch (timeFilter) {
      case "week":
        filterDate.setDate(now.getDate() - 7)
        break
      case "month":
        filterDate.setMonth(now.getMonth() - 1)
        break
      case "quarter":
        filterDate.setMonth(now.getMonth() - 3)
        break
      case "year":
        filterDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        return applications
    }

    return applications.filter((app) => new Date(app.dateApplied) >= filterDate)
  }

  const filteredApplications = getFilteredApplications()

  const getStatusCounts = () => {
    const counts = {
      applied: 0,
      reviewing: 0,
      interview: 0,
      rejected: 0,
      accepted: 0,
    }

    filteredApplications.forEach((app) => {
      counts[app.status]++
    })

    return counts
  }

  const statusCounts = getStatusCounts()
  const totalApplications = filteredApplications.length
  const successRate = totalApplications > 0 ? ((statusCounts.accepted / totalApplications) * 100).toFixed(1) : "0"
  const interviewRate =
    totalApplications > 0
      ? (((statusCounts.interview + statusCounts.accepted) / totalApplications) * 100).toFixed(1)
      : "0"

  const getApplicationsByMonth = () => {
    const monthlyData: { [key: string]: number } = {}

    filteredApplications.forEach((app) => {
      const date = new Date(app.dateApplied)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1
    })

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6) // Last 6 months
  }

  const monthlyApplications = getApplicationsByMonth()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Application History & Analytics</h2>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">{timeFilter === "all" ? "All time" : `In selected period`}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewRate}%</div>
            <p className="text-xs text-muted-foreground">Applications leading to interviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">Applications resulting in offers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.applied + statusCounts.reviewing}</div>
            <p className="text-xs text-muted-foreground">Applications awaiting response</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status Breakdown</CardTitle>
          <CardDescription>Distribution of your application statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const percentage = totalApplications > 0 ? (count / totalApplications) * 100 : 0
              const statusLabels = {
                applied: "Applied",
                reviewing: "Under Review",
                interview: "Interview",
                rejected: "Rejected",
                accepted: "Accepted",
              }

              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        status === "applied"
                          ? "bg-blue-500"
                          : status === "reviewing"
                            ? "bg-yellow-500"
                            : status === "interview"
                              ? "bg-purple-500"
                              : status === "rejected"
                                ? "bg-red-500"
                                : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm font-medium">{statusLabels[status as keyof typeof statusLabels]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          status === "applied"
                            ? "bg-blue-500"
                            : status === "reviewing"
                              ? "bg-yellow-500"
                              : status === "interview"
                                ? "bg-purple-500"
                                : status === "rejected"
                                  ? "bg-red-500"
                                  : "bg-green-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      {monthlyApplications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Monthly application activity (last 6 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyApplications.map(([month, count]) => {
                const maxCount = Math.max(...monthlyApplications.map(([, c]) => c))
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
                const monthName = new Date(month + "-01").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })

                return (
                  <div key={month} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-32">{monthName}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Your most recent job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications
              .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
              .slice(0, 10)
              .map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{application.jobTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {application.company} • {application.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        application.status === "applied"
                          ? "bg-blue-100 text-blue-800"
                          : application.status === "reviewing"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "interview"
                              ? "bg-purple-100 text-purple-800"
                              : application.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                      }`}
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(application.dateApplied).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

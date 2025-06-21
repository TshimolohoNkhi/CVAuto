"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useApp } from "@/contexts/AppContext"
import { useToast } from "@/hooks/use-toast"
import { Search, Loader2, RefreshCw } from "lucide-react"

export function ScraperStatus() {
  const { scrapedJobsToday, matchedJobsToday, triggerScrape } = useApp()
  const { toast } = useToast()
  const [isScrapingInProgress, setIsScrapingInProgress] = useState(false)

  const handleTriggerScrape = async () => {
    setIsScrapingInProgress(true)
    try {
      await triggerScrape()
      toast({
        title: "Scraping completed!",
        description: "New job opportunities have been found and matched.",
      })
    } catch (error) {
      toast({
        title: "Scraping failed",
        description: "There was an error during the job scraping process.",
        variant: "destructive",
      })
    } finally {
      setIsScrapingInProgress(false)
    }
  }

  const matchRate = scrapedJobsToday > 0 ? (matchedJobsToday / scrapedJobsToday) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Job Scraper & Matcher Status
        </CardTitle>
        <CardDescription>Automated job discovery and application matching for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{scrapedJobsToday}</div>
            <div className="text-sm text-blue-800">Jobs Scraped Today</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{matchedJobsToday}</div>
            <div className="text-sm text-green-800">Jobs Matched & Applied</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{matchRate.toFixed(1)}%</div>
            <div className="text-sm text-purple-800">Match Rate</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Matching Progress</span>
            <span>{matchedJobsToday}/50 target</span>
          </div>
          <Progress value={(matchedJobsToday / 50) * 100} className="h-2" />
        </div>

        <div className="flex justify-center">
          <Button onClick={handleTriggerScrape} disabled={isScrapingInProgress} className="flex items-center gap-2">
            {isScrapingInProgress ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {isScrapingInProgress ? "Scraping in Progress..." : "Trigger Manual Scrape"}
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Last automatic scrape: {new Date().toLocaleTimeString()} • Next scrape in: 2h 15m
        </div>
      </CardContent>
    </Card>
  )
}

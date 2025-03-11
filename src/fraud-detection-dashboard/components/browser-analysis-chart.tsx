"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchBrowserAnalysis, type BrowserData } from "../services/api"
import { AlertTriangle } from "lucide-react"


export function BrowserAnalysisChart() {
  const [browserData, setBrowserData] = useState<BrowserData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchBrowserAnalysis()
        const sortedData = data.sort((a, b) => b.class - a.class)
        setBrowserData(sortedData)
        setError(null)
      } catch (err) {
        setError("Failed to load browser data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const total = browserData.reduce((sum, item) => sum + item.class, 0)

  // Define color configuration
  const COLORS = [
    "#3B82F6", // blue-500
    "#22C55E", // green-500
    "#EAB308", // yellow-500
    "#EF4444", // red-500
    "#8B5CF6", // purple-500
    "#EC4899", // pink-500
    "#6366F1", // indigo-500
    "#14B8A6", // teal-500
    "#F97316", // orange-500
    "#06B6D4", // cyan-500
  ]

  const getChartColor = (index: number) => COLORS[index % COLORS.length]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 bg-muted rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted/50 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (browserData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fraud by Browser</CardTitle>
          <CardDescription>Distribution of fraud cases by browser</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">No browser data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (browserData.length === 1) {
    const browser = browserData[0]
    const color = getChartColor(0)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Fraud by Browser</CardTitle>
          <CardDescription>Distribution of fraud cases by browser</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill={color} />
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-center">
              <div style={{ backgroundColor: color }} className="w-3 h-3 rounded-full"></div>
              <div className="text-sm">
                <span className="font-medium">{browser.browser}</span>
                <span className="text-muted-foreground"> ({browser.class} cases, 100%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud by Browser</CardTitle>
        <CardDescription>Distribution of fraud cases by browser</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <div className="relative w-full max-w-xs aspect-square">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {browserData.map((item, index) => {
                const percentage = (item.class / total) * 100
                const previousPercentages = browserData
                  .slice(0, index)
                  .reduce((sum, prev) => sum + (prev.class / total) * 100, 0)

                const startAngle = (previousPercentages / 100) * 360
                const endAngle = ((previousPercentages + percentage) / 100) * 360

                const startRad = (startAngle - 90) * (Math.PI / 180)
                const endRad = (endAngle - 90) * (Math.PI / 180)

                const x1 = 50 + 40 * Math.cos(startRad)
                const y1 = 50 + 40 * Math.sin(startRad)
                const x2 = 50 + 40 * Math.cos(endRad)
                const y2 = 50 + 40 * Math.sin(endRad)

                const largeArcFlag = percentage > 50 ? 1 : 0

                return (
                  <path
                    key={index}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={getChartColor(index)}
                    className="hover:opacity-90 transition-opacity"
                  />
                )
              })}
              <circle cx="50" cy="50" r="25" fill="white" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-6">
          {browserData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                style={{ backgroundColor: getChartColor(index) }}
                className="w-3 h-3 rounded-full"
              ></div>
              <div className="text-sm">
                <span className="font-medium">{item.browser}</span>
                <span className="text-muted-foreground">
                  {" "}
                  ({item.class} cases, {((item.class / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchFraudTrends } from "../services/api"
import { AlertTriangle } from "lucide-react"

interface FraudTrendsChartProps {
  fullWidth?: boolean
}

interface MonthlyData {
  month: string // e.g., "Jan", "Feb", etc.
  fraud_cases: number
}

export function FraudTrendsChart({ fullWidth = false }: FraudTrendsChartProps) {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchFraudTrends()
        
        // Aggregate data by month for 2015
        const monthlyMap = new Map<number, number>()
        data
          .filter(item => new Date(item.date).getFullYear() === 2015)
          .forEach(item => {
            const month = new Date(item.date).getMonth() // 0-11 (Jan-Dec)
            monthlyMap.set(month, (monthlyMap.get(month) || 0) + item.fraud_cases)
          })

        // Convert to array with month names and fill in all months
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]
        const aggregatedData: MonthlyData[] = monthNames.map((month, index) => ({
          month,
          fraud_cases: monthlyMap.get(index) || 0
        }))

        setMonthlyData(aggregatedData)
        setError(null)
      } catch (err) {
        setError("Failed to load fraud trends")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Find max value for scaling
  const maxValue = Math.max(...monthlyData.map((item) => item.fraud_cases), 0) || 1 // Avoid division by 0
  const chartHeight = 250
  const chartWidth = 600
  const barWidth = chartWidth / 12 - 10 // 12 months, with spacing

  if (loading) {
    return (
      <Card className={fullWidth ? "w-full" : ""}>
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

  if (monthlyData.length === 0) {
    return (
      <Card className={fullWidth ? "w-full" : ""}>
        <CardHeader>
          <CardTitle>Fraud Trends (2015)</CardTitle>
          <CardDescription>Number of detected fraud cases by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">No fraud data available for 2015</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={fullWidth ? "w-full" : ""}>
      <CardHeader>
        <CardTitle>Fraud Trends (2015)</CardTitle>
        <CardDescription>Number of detected fraud cases by month in 2015</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full overflow-x-auto">
          <svg width={chartWidth} height={chartHeight} className="mx-auto">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((level) => (
              <line
                key={level}
                x1="40"
                y1={chartHeight - level * (chartHeight - 40)}
                x2={chartWidth}
                y2={chartHeight - level * (chartHeight - 40)}
                stroke="#e5e7eb"
                strokeDasharray="4"
              />
            ))}

            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((level) => (
              <text
                key={level}
                x="35"
                y={chartHeight - level * (chartHeight - 40) + 5}
                textAnchor="end"
                className="text-xs text-muted-foreground"
              >
                {Math.round(level * maxValue)}
              </text>
            ))}

            {/* Bars */}
            {monthlyData.map((item, i) => {
              const barHeight = (item.fraud_cases / maxValue) * (chartHeight - 40)
              const x = 40 + i * (barWidth + 10)
              const y = chartHeight - barHeight

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={`hsl(220, 70%, ${60 + (item.fraud_cases / maxValue) * 20}%)`}
                    rx="4"
                    className="transition-all duration-300 hover:opacity-80"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 15}
                    textAnchor="middle"
                    className="text-sm font-medium"
                  >
                    {item.month}
                  </text>
                  {item.fraud_cases > 0 && (
                    <text
                      x={x + barWidth / 2}
                      y={y - 5}
                      textAnchor="middle"
                      className="text-xs text-muted-foreground"
                    >
                      {item.fraud_cases}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Axes */}
            <line x1="40" y1="0" x2="40" y2={chartHeight} stroke="#d1d5db" />
            <line x1="40" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#d1d5db" />
          </svg>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Total cases: {monthlyData.reduce((sum, item) => sum + item.fraud_cases, 0).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
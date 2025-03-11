"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CreditCard, DollarSign, TrendingUp } from "lucide-react"
import { fetchSummaryStatistics, type SummaryStatistics } from "../services/api"

export function SummaryCards() {
  const [summaryData, setSummaryData] = useState<SummaryStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchSummaryStatistics()
        setSummaryData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load summary statistics")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
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

  const stats = [
    {
      title: "Total Transactions",
      value: summaryData?.total_transactions.toLocaleString() || "0",
      icon: CreditCard,
    },
    {
      title: "Fraud Cases",
      value: summaryData?.fraud_cases.toLocaleString() || "0",
      icon: AlertTriangle,
      trend: "up",
    },
    {
      title: "Fraud Percentage",
      value: `${summaryData?.fraud_percentage.toFixed(2) || "0"}%`,
      icon: TrendingUp,
    },
    {
      title: "Estimated Savings",
      value: `$${((summaryData?.fraud_cases || 0) * 120).toLocaleString()}`,
      icon: DollarSign,
      trend: "up",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 ${index === 1 ? "bg-red-100" : "bg-muted"} rounded-full`}>
              <stat.icon className={`h-4 w-4 ${index === 1 ? "text-red-600" : ""}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.trend && (
              <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                {stat.trend === "up" ? "+" : "-"}5.2%
                <span className="text-xs">from last month</span>
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


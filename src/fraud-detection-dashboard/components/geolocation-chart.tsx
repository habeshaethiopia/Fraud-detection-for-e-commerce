"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchGeolocationAnalysis, type GeolocationData } from "../services/api"
import { AlertTriangle, Globe } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function GeolocationChart() {
  const [geoData, setGeoData] = useState<GeolocationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchGeolocationAnalysis()
        // Sort by fraud cases in descending order
        const sortedData = data.sort((a, b) => b.fraud_cases - a.fraud_cases).slice(0, 10)
        setGeoData(sortedData)
        setError(null)
      } catch (err) {
        setError("Failed to load geolocation data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Find max value for scaling
  const maxValue = Math.max(...geoData.map((item) => item.fraud_cases), 0)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 bg-muted rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/6"></div>
                </div>
                <div className="h-2 bg-muted rounded"></div>
              </div>
            ))}
          </div>
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Fraud by Country</CardTitle>
          <CardDescription>Top 10 countries with highest fraud cases</CardDescription>
        </div>
        <Globe className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {geoData.map((item) => (
            <div key={item.country} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.country}</p>
                </div>
                <p className="font-medium">{item.fraud_cases}</p>
              </div>
              <Progress value={(item.fraud_cases / maxValue) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


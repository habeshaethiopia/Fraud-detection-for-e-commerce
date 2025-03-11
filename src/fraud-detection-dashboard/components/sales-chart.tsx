"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SalesChart() {
  const [activeTab, setActiveTab] = useState("weekly")

  // Mock data for the chart
  const chartData = {
    weekly: [1200, 1800, 2200, 1800, 2400, 2800, 3200],
    monthly: [12000, 18000, 22000, 18000, 24000, 28000, 32000],
    yearly: [120000, 180000, 220000, 180000, 240000, 280000, 320000],
  }

  const labels = {
    weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    yearly: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
  }

  // Find the max value for scaling
  const maxValue = Math.max(...chartData[activeTab as keyof typeof chartData])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Compare sales performance over time</CardDescription>
          </div>
          <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <div className="flex h-full items-end gap-2">
            {chartData[activeTab as keyof typeof chartData].map((value, i) => (
              <div key={i} className="relative flex flex-1 flex-col items-center">
                <div
                  className="w-full bg-primary rounded-t-sm"
                  style={{
                    height: `${(value / maxValue) * 100}%`,
                    minHeight: "10px",
                  }}
                />
                <span className="mt-2 text-xs">{labels[activeTab as keyof typeof labels][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


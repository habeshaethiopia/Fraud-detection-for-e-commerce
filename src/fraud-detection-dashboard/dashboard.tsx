"use client"

import { useState } from "react"
import { Header } from "./components/header"
import { Sidebar } from "./components/sidebar"
import { SummaryCards } from "./components/summary-cards"
import { FraudTrendsChart } from "./components/fraud-trends-chart"
import { GeolocationChart } from "./components/geolocation-chart"
import { BrowserAnalysisChart } from "./components/browser-analysis-chart"
import { PredictionForm } from "./components/prediction-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-muted/40">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold">Fraud Detection Dashboard</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Fraud Trends</TabsTrigger>
                <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
                <TabsTrigger value="prediction">Fraud Prediction</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6">
                  <SummaryCards />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FraudTrendsChart />
                    <GeolocationChart />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="mt-6">
                <FraudTrendsChart fullWidth />
              </TabsContent>

              <TabsContent value="analysis" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GeolocationChart />
                  <BrowserAnalysisChart />
                </div>
              </TabsContent>

              <TabsContent value="prediction" className="mt-6">
                <PredictionForm />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}


// Import mock data
import {
  mockSummaryStatistics,
  mockFraudTrends,
  mockGeolocationData,
  mockBrowserData,
  mockPredictionResult,
  mockShapValues,
} from "./api-mock"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5001"

// Types for API responses
export interface SummaryStatistics {
  total_transactions: number
  fraud_cases: number
  fraud_percentage: number
}

export interface FraudTrend {
  date: string
  fraud_cases: number
}

export interface GeolocationData {
  country: string
  fraud_cases: number
}

export interface BrowserData {
  browser: string
  class: number
}

export interface PredictionResult {
  prediction: number
  probability: number
}

export interface ShapValues {
  shap_values: number[][]
}

// API service functions with mock data fallback
export const fetchSummaryStatistics = async (): Promise<SummaryStatistics> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/summary_statistics`)
    if (!response.ok) {
      throw new Error("Failed to fetch summary statistics")
    }
    return response.json()
  } catch (error) {
    console.warn("Using mock data for summary statistics:", error)
    return mockSummaryStatistics
  }
}

export const fetchFraudTrends = async (): Promise<FraudTrend[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/fraud_trends`)
    if (!response.ok) {
      throw new Error("Failed to fetch fraud trends")
    }
    return response.json()
  } catch (error) {
    console.warn("Using mock data for fraud trends:", error)
    return mockFraudTrends
  }
}

export const fetchGeolocationAnalysis = async (): Promise<GeolocationData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/geolocation_analysis`)
    if (!response.ok) {
      throw new Error("Failed to fetch geolocation analysis")
    }
    return response.json()
  } catch (error) {
    console.warn("Using mock data for geolocation analysis:", error)
    return mockGeolocationData
  }
}

export const fetchBrowserAnalysis = async (): Promise<BrowserData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/fraud_by_device_browser`)
    if (!response.ok) {
      throw new Error("Failed to fetch browser analysis")
    }
    return response.json()
  } catch (error) {
    console.warn("Using mock data for browser analysis:", error)
    return mockBrowserData
  }
}

export const predictFraud = async (data: Record<string, any>): Promise<PredictionResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to make prediction")
    }

    return response.json()
  } catch (error) {
    console.warn("Using mock data for prediction:", error)
    return mockPredictionResult
  }
}

export const explainPrediction = async (data: Record<string, any>): Promise<ShapValues> => {
  try {
    const response = await fetch(`${API_BASE_URL}/explain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to get explanation")
    }

    return response.json()
  } catch (error) {
    console.warn("Using mock data for explanation:", error)
    return mockShapValues
  }
}


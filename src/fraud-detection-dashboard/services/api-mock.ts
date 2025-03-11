// Mock data for development
export const mockSummaryStatistics = {
    total_transactions: 45231,
    fraud_cases: 1245,
    fraud_percentage: 2.75,
  }
  
export const mockFraudTrends = [
    { date: "Mon, 01 Jan 2015 00:00:00 GMT", fraud_cases: 120 },
    { date: "Tue, 02 Jan 2023 00:00:00 GMT", fraud_cases: 145 },
    { date: "Wed, 03 Jan 2023 00:00:00 GMT", fraud_cases: 132 },
    { date: "Thu, 04 Jan 2023 00:00:00 GMT", fraud_cases: 165 },
    { date: "Fri, 05 Jan 2023 00:00:00 GMT", fraud_cases: 189 },
    { date: "Sat, 06 Jan 2023 00:00:00 GMT", fraud_cases: 176 },
    { date: "Sun, 07 Jan 2023 00:00:00 GMT", fraud_cases: 198 },
]
  
  export const mockGeolocationData = [
    { country: "United States", fraud_cases: 450 },
    { country: "China", fraud_cases: 320 },
    { country: "Russia", fraud_cases: 280 },
    { country: "Nigeria", fraud_cases: 240 },
    { country: "Brazil", fraud_cases: 190 },
    { country: "India", fraud_cases: 170 },
    { country: "Ukraine", fraud_cases: 150 },
    { country: "Mexico", fraud_cases: 130 },
    { country: "Philippines", fraud_cases: 110 },
    { country: "Indonesia", fraud_cases: 90 },
  ]
  
  export const mockBrowserData = [
    { browser: "Chrome", class: 450 },
    { browser: "Firefox", class: 280 },
    { browser: "Safari", class: 230 },
    { browser: "Edge", class: 180 },
    { browser: "Opera", class: 90 },
  ]
  
  export const mockPredictionResult = {
    prediction: 1,
    probability: 0.87,
  }
  
  export const mockShapValues = {
    shap_values: [[0.23, -0.15, 0.42, 0.18, -0.09, 0.31, -0.22, 0.17, 0.05, -0.12, 0.28, -0.19, 0.11, -0.07]],
  }
  
  
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { predictFraud, explainPrediction } from "../services/api"
import { Progress } from "@/components/ui/progress"

export function PredictionForm() {
  const [formData, setFormData] = useState({
    amount: "",
    country: "US",
    browser: "Chrome",
    purchase_time: "",
    card_bin: "",
    card_type: "visa",
    card_category: "credit",
    cvv_provided: "1",
    transaction_type: "online",
    // Add other required fields with default values
    email_domain: "gmail.com",
    shipping_address: "1",
    billing_address: "1",
    ip_address: "192.168.1.1",
    device_id: "device123",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ prediction: number; probability: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [shapValues, setShapValues] = useState<number[] | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Convert string values to appropriate types
      const processedData = {
        ...formData,
        amount: Number.parseFloat(formData.amount),
        cvv_provided: Number.parseInt(formData.cvv_provided),
        shipping_address: Number.parseInt(formData.shipping_address),
        billing_address: Number.parseInt(formData.billing_address),
      }

      const predictionResult = await predictFraud(processedData)
      setResult(predictionResult)

      // Get SHAP values for explanation
      try {
        const explanation = await explainPrediction(processedData)
        setShapValues(explanation.shap_values[0])
      } catch (explainError) {
        console.error("Failed to get explanation:", explainError)
      }
    } catch (err) {
      setError("Failed to make prediction. Please check your inputs.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Get top features that contributed to the prediction
  const getTopFeatures = () => {
    if (!shapValues) return []

    // Create array of [feature, value] pairs
    const featurePairs = Object.keys(formData).map((key, index) => {
      return [key, shapValues[index]]
    })

    // Sort by absolute SHAP value (importance)
    return featurePairs.sort((a, b) => Math.abs(b[1] as number) - Math.abs(a[1] as number)).slice(0, 5)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Fraud Prediction</CardTitle>
          <CardDescription>Enter transaction details to predict fraud probability</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Transaction Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="browser">Browser</Label>
                <Select value={formData.browser} onValueChange={(value) => handleSelectChange("browser", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select browser" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chrome">Chrome</SelectItem>
                    <SelectItem value="Firefox">Firefox</SelectItem>
                    <SelectItem value="Safari">Safari</SelectItem>
                    <SelectItem value="Edge">Edge</SelectItem>
                    <SelectItem value="Opera">Opera</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="purchase_time">Purchase Time</Label>
                <Input
                  id="purchase_time"
                  name="purchase_time"
                  type="datetime-local"
                  value={formData.purchase_time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="card_bin">Card BIN (first 6 digits)</Label>
                <Input
                  id="card_bin"
                  name="card_bin"
                  placeholder="Enter card BIN"
                  value={formData.card_bin}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="card_type">Card Type</Label>
                <Select value={formData.card_type} onValueChange={(value) => handleSelectChange("card_type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="amex">American Express</SelectItem>
                    <SelectItem value="discover">Discover</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cvv_provided">CVV Provided</Label>
                <Select
                  value={formData.cvv_provided}
                  onValueChange={(value) => handleSelectChange("cvv_provided", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="CVV provided?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Predict Fraud Risk"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prediction Result</CardTitle>
          <CardDescription>Fraud risk assessment and explanation</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className={`p-4 rounded-md ${result.prediction === 1 ? "bg-red-50" : "bg-green-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.prediction === 1 ? (
                    <>
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                      <h3 className="text-lg font-semibold text-red-600">Fraud Detected</h3>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-600">Transaction Appears Safe</h3>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Fraud Probability</p>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={result.probability * 100}
                        className={`h-2 ${result.prediction === 1 ? "bg-red-500" : "bg-green-500"}`}
                      />
                      <span className="text-sm font-medium">{(result.probability * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {shapValues && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Key Factors</h3>
                  <div className="space-y-3">
                    {getTopFeatures().map(([feature, value], index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{feature}</span>
                          <span className={Number(value) > 0 ? "text-red-500" : "text-green-500"}>
                            {Number(value) > 0 ? "+" : ""}
                            {(value as number).toFixed(4)}
                          </span>
                        </div>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          {Number(value) > 0 ? (
                            <div
                              className="absolute top-0 right-1/2 h-full bg-red-500"
                              style={{ width: `${Math.abs(value as number) * 100}%` }}
                            ></div>
                          ) : (
                            <div
                              className="absolute top-0 left-1/2 h-full bg-green-500"
                              style={{ width: `${Math.abs(value as number) * 100}%` }}
                            ></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
              <p>Enter transaction details and click &quot;Predict Fraud Risk&quot; to get a prediction</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


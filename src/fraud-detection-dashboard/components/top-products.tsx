import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TopProducts() {
  const products = [
    {
      name: "Wireless Earbuds",
      sales: 1823,
      percentage: 28,
    },
    {
      name: "Smart Watch",
      sales: 1456,
      percentage: 22,
    },
    {
      name: "Bluetooth Speaker",
      sales: 1245,
      percentage: 19,
    },
    {
      name: "Laptop Stand",
      sales: 986,
      percentage: 15,
    },
    {
      name: "Phone Charger",
      sales: 765,
      percentage: 12,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Your best performing products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales.toLocaleString()} sales</p>
                </div>
                <p className="font-medium">{product.percentage}%</p>
              </div>
              <Progress value={product.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


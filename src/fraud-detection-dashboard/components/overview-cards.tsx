import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "New Customers",
      value: "2,350",
      change: "+10.5%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "12,234",
      change: "+12.3%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Growth Rate",
      value: "15.3%",
      change: "-2.5%",
      icon: TrendingUp,
      trend: "down",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="p-2 bg-muted rounded-full">
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center gap-1 mt-1`}
            >
              {stat.change}
              <span className="text-xs">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


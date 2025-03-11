import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      action: "placed an order",
      target: "Wireless Earbuds",
      time: "2 minutes ago",
      status: "completed",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      action: "cancelled their subscription",
      target: "Premium Plan",
      time: "45 minutes ago",
      status: "cancelled",
    },
    {
      id: 3,
      user: {
        name: "Robert Johnson",
        email: "robert@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RJ",
      },
      action: "requested a refund",
      target: "Smart Watch",
      time: "1 hour ago",
      status: "pending",
    },
    {
      id: 4,
      user: {
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ED",
      },
      action: "left a review",
      target: "Bluetooth Speaker",
      time: "3 hours ago",
      status: "completed",
    },
    {
      id: 5,
      user: {
        name: "Michael Wilson",
        email: "michael@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MW",
      },
      action: "signed up for",
      target: "Newsletter",
      time: "5 hours ago",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium">{activity.target}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


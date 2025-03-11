"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  LayoutDashboard,
  AlertTriangle,
  BarChart3,
  Globe,
  LineChart,
  Settings,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard")

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { id: "fraud-alerts", label: "Fraud Alerts", icon: AlertTriangle, href: "/fraud-alerts" },
    { id: "transactions", label: "Transactions", icon: BarChart3, href: "/transactions" },
    { id: "geo-analysis", label: "Geo Analysis", icon: Globe, href: "/geo-analysis" },
    { id: "trends", label: "Trends", icon: LineChart, href: "/trends" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
    { id: "help", label: "Help", icon: HelpCircle, href: "/help" },
  ]

  return (
    <aside
      className={cn(
        "bg-background border-r flex flex-col transition-all duration-300 ease-in-out h-screen",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-xl font-bold">Fraud Detection</h2>}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "rotate-180")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">{collapsed ? "Expand" : "Collapse"} sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  activeItem === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
                onClick={() => setActiveItem(item.id)}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            <p>Fraud Detection v1.0</p>
          </div>
        )}
      </div>
    </aside>
  )
}


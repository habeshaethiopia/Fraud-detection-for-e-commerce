"use client"

import { Menu, Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function Header({ collapsed, setCollapsed }: HeaderProps) {
  return (
    <header className="border-b bg-background px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search transactions..." className="w-64 pl-8" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


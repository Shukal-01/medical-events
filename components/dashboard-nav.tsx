"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, Home, Settings, Bell, LogOut } from "lucide-react"

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  const pathname = usePathname()

  const doctorRoutes = [
    {
      href: "/doctor/dashboard",
      icon: Home,
      title: "Dashboard",
    },
    {
      href: "/doctor/events",
      icon: Calendar,
      title: "My Events",
    },
    {
      href: "/doctor/notifications",
      icon: Bell,
      title: "Notifications",
    },
    {
      href: "/doctor/profile",
      icon: Settings,
      title: "Profile",
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {doctorRoutes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button variant={pathname === route.href ? "secondary" : "ghost"} className="w-full justify-start">
            <route.icon className="mr-2 h-4 w-4" />
            {route.title}
          </Button>
        </Link>
      ))}
      <div className="mt-auto pt-4">
        <Link href="/login">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  )
}


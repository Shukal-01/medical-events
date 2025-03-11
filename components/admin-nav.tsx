"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Users, Calendar, Settings, HelpCircle, LogOut } from "lucide-react"

interface AdminNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminNav({ className, ...props }: AdminNavProps) {
  const pathname = usePathname()

  const adminRoutes = [
    {
      href: "/admin/dashboard",
      icon: Home,
      title: "Dashboard",
    },
    {
      href: "/admin/users",
      icon: Users,
      title: "Users",
    },
    {
      href: "/admin/doctors",
      icon: Users,
      title: "Doctors",
    },
    {
      href: "/admin/events",
      icon: Calendar,
      title: "Events",
    },
    {
      href: "/admin/queries",
      icon: HelpCircle,
      title: "Help Queries",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {adminRoutes.map((route) => (
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


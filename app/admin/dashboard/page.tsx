"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Users, Calendar, DollarSign, Activity, TrendingUp, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for admin dashboard
const stats = {
  totalUsers: 245,
  totalDoctors: 38,
  totalEvents: 67,
  totalBookings: 512,
  revenue: 15680,
  newRegistrations: {
    users: 12,
    doctors: 3,
  },
}

// Mock data for recent users
const recentUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    type: "user",
    registeredOn: "2025-03-15",
    status: "active",
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    type: "doctor",
    registeredOn: "2025-03-14",
    status: "pending",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    type: "user",
    registeredOn: "2025-03-12",
    status: "active",
  },
  {
    id: "4",
    name: "Dr. Emily Davis",
    email: "emily@example.com",
    type: "doctor",
    registeredOn: "2025-03-10",
    status: "active",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@example.com",
    type: "user",
    registeredOn: "2025-03-08",
    status: "inactive",
  },
]

// Mock data for recent events
const recentEvents = [
  {
    id: "1",
    title: "Cardiology Conference",
    doctorName: "Dr. John Smith",
    date: "2025-04-15",
    bookings: 45,
    maxBookings: 100,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Health Seminar",
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-20",
    bookings: 120,
    maxBookings: 120,
    status: "full",
  },
  {
    id: "3",
    title: "Medical Workshop",
    doctorName: "Dr. Michael Brown",
    date: "2025-03-10",
    bookings: 65,
    maxBookings: 80,
    status: "completed",
  },
]

export default function AdminDashboard() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Filter users based on search query
  const filteredUsers = recentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRefreshData = async () => {
    setIsRefreshing(true)

    try {
      // Simulate API call to refresh data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Data refreshed",
        description: "Dashboard data has been updated with the latest information.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "There was a problem refreshing the dashboard data.",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExportData = async () => {
    setIsExporting(true)

    try {
      // Simulate API call to export data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Data exported",
        description: "Dashboard data has been exported successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "There was a problem exporting the dashboard data.",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <AdminNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportData} disabled={isExporting}>
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Exporting..." : "Export Data"}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{stats.newRegistrations.users}</span>
                  <span className="ml-1">new this week</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDoctors}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{stats.newRegistrations.doctors}</span>
                  <span className="ml-1">new this week</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground">{stats.totalBookings} total bookings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.revenue}</div>
                <p className="text-xs text-muted-foreground">From all event bookings</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Recent registrations and events</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="users">
                  <TabsList className="mb-4">
                    <TabsTrigger value="users">Recent Users</TabsTrigger>
                    <TabsTrigger value="events">Recent Events</TabsTrigger>
                  </TabsList>

                  <TabsContent value="users">
                    <div className="relative mb-4">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Registered On</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.type === "doctor" ? "default" : "secondary"}>
                                {user.type === "doctor" ? "Doctor" : "User"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(user.registeredOn).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.status === "active"
                                    ? "success"
                                    : user.status === "pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link href={`/admin/${user.type}s/${user.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Navigating to user details",
                                      description: `Viewing details for ${user.name}`,
                                    })
                                  }}
                                >
                                  View
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="events">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Bookings</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{event.doctorName}</TableCell>
                            <TableCell>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </TableCell>
                            <TableCell>
                              {event.bookings} / {event.maxBookings}
                              {event.bookings === event.maxBookings && (
                                <Badge className="ml-2" variant="outline">
                                  Full
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  event.status === "upcoming"
                                    ? "default"
                                    : event.status === "completed"
                                      ? "secondary"
                                      : event.status === "full"
                                        ? "destructive"
                                        : "outline"
                                }
                              >
                                {event.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link href={`/admin/events/${event.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Navigating to event details",
                                      description: `Viewing details for ${event.title}`,
                                    })
                                  }}
                                >
                                  View
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>Platform usage statistics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Activity className="h-16 w-16 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed analytics would be displayed here in a production environment
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      toast({
                        title: "Analytics feature",
                        description: "This feature would display detailed analytics in a production environment.",
                      })
                    }}
                  >
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { DoctorHeader } from "@/components/doctor-header"
import { EventCard } from "@/components/event-card"
import { useToast } from "@/components/ui/use-toast"
import { Download, TrendingUp, TrendingDown, Users, BarChart4, Bell } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for doctor events
const upcomingEvents = [
  {
    id: "1",
    title: "Cardiology Conference",
    date: "2025-04-15",
    time: "09:00 AM - 05:00 PM",
    location: "Medical Center, New York",
    entryFee: 150,
    bookedCount: 45,
    maxBookings: 100,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Health Seminar",
    date: "2025-04-20",
    time: "10:00 AM - 01:00 PM",
    location: "Community Hall, Boston",
    entryFee: 50,
    bookedCount: 120,
    maxBookings: 120,
    status: "full",
  },
]

const pastEvents = [
  {
    id: "3",
    title: "Medical Workshop",
    date: "2025-03-10",
    time: "02:00 PM - 06:00 PM",
    location: "University Hospital, Chicago",
    entryFee: 75,
    bookedCount: 65,
    maxBookings: 80,
    status: "completed",
  },
]

// New mock data for doctor insights
const doctorInsights = {
  totalRevenue: 12750,
  lastMonthRevenue: 4500,
  revenueChange: 15, // percentage
  totalAttendees: 230,
  lastMonthAttendees: 85,
  attendeesChange: 8, // percentage
  upcomingBookings: 45,
  averageRating: 4.8,
  reviewCount: 37,
  popularEvents: [
    { name: "Cardiology Conference", count: 45 },
    { name: "Health Seminar", count: 120 },
    { name: "Medical Workshop", count: 65 },
  ],
}

export default function DoctorDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isExporting, setIsExporting] = useState(false)
  const [isSendingReminders, setIsSendingReminders] = useState(false)

  const handleExportData = async () => {
    setIsExporting(true)

    try {
      // Simulate API call to export data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Data exported",
        description: "Your event data has been exported successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "There was a problem exporting your event data.",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleSendReminders = async () => {
    setIsSendingReminders(true)

    try {
      // Simulate API call to send reminders
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Reminders sent",
        description: "Event reminders have been sent to all attendees.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send reminders",
        description: "There was a problem sending event reminders.",
      })
    } finally {
      setIsSendingReminders(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DoctorHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Events Dashboard</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSendReminders} disabled={isSendingReminders}>
                <Bell className="mr-2 h-4 w-4" />
                {isSendingReminders ? "Sending..." : "Send Reminders"}
              </Button>
              <Link href="/doctor/events/create">
                <Button>Create New Event</Button>
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle>Overview</CardTitle>
                <CardDescription>Your event statistics at a glance</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Total Events</h4>
                  <div className="text-2xl font-bold">{upcomingEvents.length + pastEvents.length}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Upcoming Events</h4>
                  <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Total Bookings</h4>
                  <div className="text-2xl font-bold">
                    {upcomingEvents.reduce((acc, event) => acc + event.bookedCount, 0) +
                      pastEvents.reduce((acc, event) => acc + event.bookedCount, 0)}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Revenue</h4>
                  <div className="text-2xl font-bold">
                    $
                    {upcomingEvents.reduce((acc, event) => acc + event.entryFee * event.bookedCount, 0) +
                      pastEvents.reduce((acc, event) => acc + event.entryFee * event.bookedCount, 0)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Insights Card */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Insights</CardTitle>
                    <CardDescription>Performance metrics and trends</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportData} disabled={isExporting}>
                    <Download className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export Data"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Revenue</h4>
                      <div
                        className={`flex items-center text-xs ${doctorInsights.revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {doctorInsights.revenueChange >= 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {doctorInsights.revenueChange}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold">${doctorInsights.totalRevenue}</div>
                    <p className="text-xs text-muted-foreground">${doctorInsights.lastMonthRevenue} last month</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Attendees</h4>
                      <div
                        className={`flex items-center text-xs ${doctorInsights.attendeesChange >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {doctorInsights.attendeesChange >= 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {doctorInsights.attendeesChange}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{doctorInsights.totalAttendees}</div>
                    <p className="text-xs text-muted-foreground">{doctorInsights.lastMonthAttendees} last month</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Upcoming Bookings</h4>
                    <div className="text-2xl font-bold">{doctorInsights.upcomingBookings}</div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Next 30 days</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Average Rating</h4>
                    <div className="text-2xl font-bold">{doctorInsights.averageRating}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Based on {doctorInsights.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-sm font-medium">Popular Events</h4>
                    <div className="space-y-4">
                      {doctorInsights.popularEvents.map((event, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{event.name}</span>
                            <span className="font-medium">{event.count} attendees</span>
                          </div>
                          <Progress
                            value={(event.count / Math.max(...doctorInsights.popularEvents.map((e) => e.count))) * 100}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <BarChart4 className="h-24 w-24 text-muted-foreground opacity-50" />
                    <h4 className="mt-2 text-sm font-medium">Detailed Analytics</h4>
                    <p className="text-center text-xs text-muted-foreground">
                      View detailed analytics about your events and attendees
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        toast({
                          title: "Analytics",
                          description: "Detailed analytics would be displayed in a production environment.",
                        })
                      }}
                    >
                      View Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <p className="mb-4 text-center text-muted-foreground">You don't have any upcoming events.</p>
                      <Link href="/doctor/events/create">
                        <Button>Create Your First Event</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((event) => (
                      <Link href={`/doctor/events/${event.id}`} key={event.id}>
                        <EventCard
                          title={event.title}
                          date={event.date}
                          time={event.time}
                          location={event.location}
                          status={event.status}
                          bookedCount={event.bookedCount}
                          maxBookings={event.maxBookings}
                          entryFee={event.entryFee}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastEvents.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <p className="text-center text-muted-foreground">You don't have any past events.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.map((event) => (
                      <Link href={`/doctor/events/${event.id}`} key={event.id}>
                        <EventCard
                          title={event.title}
                          date={event.date}
                          time={event.time}
                          location={event.location}
                          status={event.status}
                          bookedCount={event.bookedCount}
                          maxBookings={event.maxBookings}
                          entryFee={event.entryFee}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}


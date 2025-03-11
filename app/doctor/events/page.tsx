"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DoctorHeader } from "@/components/doctor-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { EventCard } from "@/components/event-card"
import { Search } from "lucide-react"

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

export default function DoctorEventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter events based on search query
  const filteredUpcomingEvents = upcomingEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPastEvents = pastEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <DoctorHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
            <Link href="/doctor/events/create">
              <Button>Create New Event</Button>
            </Link>
          </div>

          <div className="relative mt-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4 space-y-4">
              {filteredUpcomingEvents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="mb-4 text-center text-muted-foreground">
                      {searchQuery ? "No events found matching your search." : "You don't have any upcoming events."}
                    </p>
                    <Link href="/doctor/events/create">
                      <Button>Create Your First Event</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredUpcomingEvents.map((event) => (
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

            <TabsContent value="past" className="mt-4 space-y-4">
              {filteredPastEvents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-center text-muted-foreground">
                      {searchQuery ? "No events found matching your search." : "You don't have any past events."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPastEvents.map((event) => (
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
        </main>
      </div>
    </div>
  )
}


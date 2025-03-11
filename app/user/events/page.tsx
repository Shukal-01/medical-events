"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { EventCard } from "@/components/event-card"
import { Search } from "lucide-react"

// Mock data for available events
const availableEvents = [
  {
    id: "1",
    title: "Cardiology Conference",
    doctorName: "Dr. John Smith",
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
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-20",
    time: "10:00 AM - 01:00 PM",
    location: "Community Hall, Boston",
    entryFee: 50,
    bookedCount: 120,
    maxBookings: 120,
    status: "full",
  },
  {
    id: "3",
    title: "Medical Workshop",
    doctorName: "Dr. Michael Brown",
    date: "2025-04-25",
    time: "02:00 PM - 06:00 PM",
    location: "University Hospital, Chicago",
    entryFee: 75,
    bookedCount: 65,
    maxBookings: 80,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Dental Health Symposium",
    doctorName: "Dr. Patricia Lee",
    date: "2025-05-05",
    time: "10:00 AM - 02:00 PM",
    location: "Dental College, San Francisco",
    entryFee: 100,
    bookedCount: 30,
    maxBookings: 75,
    status: "upcoming",
  },
  {
    id: "5",
    title: "Pediatrics Summit",
    doctorName: "Dr. Robert Wilson",
    date: "2025-05-12",
    time: "09:00 AM - 05:00 PM",
    location: "Children's Hospital, Miami",
    entryFee: 125,
    bookedCount: 50,
    maxBookings: 80,
    status: "upcoming",
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")

  // Filter available events based on search and filters
  const filteredEvents = availableEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.doctorName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = locationFilter === "all" || event.location.includes(locationFilter)
    const matchesDoctor = doctorFilter === "all" || event.doctorName.includes(doctorFilter)

    return matchesSearch && matchesLocation && matchesDoctor
  })

  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <UserNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Find Events</h1>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Search Medical Events</CardTitle>
              <CardDescription>Find events by name, location, or specialty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by event name or doctor"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="location-filter">Location</Label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger id="location-filter">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Boston">Boston</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="San Francisco">San Francisco</SelectItem>
                      <SelectItem value="Miami">Miami</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor-filter">Doctor</Label>
                  <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                    <SelectTrigger id="doctor-filter">
                      <SelectValue placeholder="All Doctors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Doctors</SelectItem>
                      <SelectItem value="Dr. John Smith">Dr. John Smith</SelectItem>
                      <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="Dr. Michael Brown">Dr. Michael Brown</SelectItem>
                      <SelectItem value="Dr. Patricia Lee">Dr. Patricia Lee</SelectItem>
                      <SelectItem value="Dr. Robert Wilson">Dr. Robert Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty-filter">Specialty</Label>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger id="specialty-filter">
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="general">General Health</SelectItem>
                      <SelectItem value="dental">Dental</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Available Events ({filteredEvents.length})</h2>

            {filteredEvents.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-center text-muted-foreground">No events found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setLocationFilter("all")
                      setDoctorFilter("all")
                      setSpecialtyFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <Link href={`/user/events/${event.id}`} key={event.id}>
                    <EventCard
                      title={event.title}
                      subtitle={event.doctorName}
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
          </div>
        </main>
      </div>
    </div>
  )
}


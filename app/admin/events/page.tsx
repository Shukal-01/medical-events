"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, MoreHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for events
const events = [
  {
    id: "1",
    title: "Cardiology Conference",
    doctorName: "Dr. John Smith",
    doctorId: "1",
    date: "2025-04-15",
    time: "09:00 AM - 05:00 PM",
    location: "Medical Center, New York",
    entryFee: 150,
    bookedCount: 45,
    maxBookings: 100,
    status: "upcoming",
    featured: true,
  },
  {
    id: "2",
    title: "Health Seminar",
    doctorName: "Dr. Sarah Johnson",
    doctorId: "2",
    date: "2025-04-20",
    time: "10:00 AM - 01:00 PM",
    location: "Community Hall, Boston",
    entryFee: 50,
    bookedCount: 120,
    maxBookings: 120,
    status: "full",
    featured: false,
  },
  {
    id: "3",
    title: "Medical Workshop",
    doctorName: "Dr. Michael Brown",
    doctorId: "3",
    date: "2025-03-10",
    time: "02:00 PM - 06:00 PM",
    location: "University Hospital, Chicago",
    entryFee: 75,
    bookedCount: 65,
    maxBookings: 80,
    status: "completed",
    featured: false,
  },
  {
    id: "4",
    title: "Dental Health Symposium",
    doctorName: "Dr. Patricia Lee",
    doctorId: "6",
    date: "2025-05-05",
    time: "10:00 AM - 02:00 PM",
    location: "Dental College, San Francisco",
    entryFee: 100,
    bookedCount: 30,
    maxBookings: 75,
    status: "upcoming",
    featured: true,
  },
  {
    id: "5",
    title: "Orthopedic Seminar",
    doctorName: "Dr. Robert Wilson",
    doctorId: "5",
    date: "2025-05-15",
    time: "09:00 AM - 04:00 PM",
    location: "Orthopedic Institute, Los Angeles",
    entryFee: 125,
    bookedCount: 50,
    maxBookings: 80,
    status: "upcoming",
    featured: false,
  },
]

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.doctorName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesLocation = locationFilter === "all" || event.location.includes(locationFilter)

    return matchesSearch && matchesStatus && matchesLocation
  })

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <AdminNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Medical Events</CardTitle>
              <CardDescription>Manage all medical events on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status-filter" className="w-20">
                      Status:
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status-filter" className="w-[180px]">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="location-filter" className="w-20">
                      Location:
                    </Label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger id="location-filter" className="w-[180px]">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Boston">Boston</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No events found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div className="font-medium">
                              {event.title}
                              {event.featured && (
                                <Badge variant="outline" className="ml-2">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Link href={`/admin/doctors/${event.doctorId}`} className="text-primary hover:underline">
                              {event.doctorName}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>
                            {event.bookedCount} / {event.maxBookings}
                            {event.bookedCount === event.maxBookings && (
                              <Badge className="ml-2" variant="outline">
                                Full
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>${event.entryFee}</TableCell>
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Link href={`/admin/events/${event.id}`} className="w-full">
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                {!event.featured && <DropdownMenuItem>Mark as Featured</DropdownMenuItem>}
                                {event.featured && <DropdownMenuItem>Remove from Featured</DropdownMenuItem>}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredEvents.length} of {events.length} events
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}


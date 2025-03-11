"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { Calendar, Clock, MapPin } from "lucide-react"

// Mock data for user's bookings
const bookings = [
  {
    id: "1",
    title: "Neurology Symposium",
    doctorName: "Dr. Emily Davis",
    date: "2025-05-10",
    time: "09:00 AM - 04:00 PM",
    location: "Research Center, San Francisco",
    entryFee: 200,
    tokenNumber: 15,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Dental Health Symposium",
    doctorName: "Dr. Patricia Lee",
    date: "2025-05-15",
    time: "10:00 AM - 02:00 PM",
    location: "Dental College, San Francisco",
    entryFee: 100,
    tokenNumber: 8,
    status: "upcoming",
  },
]

// Mock data for past bookings
const pastBookings = [
  {
    id: "3",
    title: "Medical Workshop",
    doctorName: "Dr. Michael Brown",
    date: "2025-03-10",
    time: "02:00 PM - 06:00 PM",
    location: "University Hospital, Chicago",
    entryFee: 75,
    tokenNumber: 12,
    status: "completed",
  },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <UserNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <Link href="/user/events">
              <Button>Find Events</Button>
            </Link>
          </div>

          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="past">Past Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {bookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="mb-4 text-center text-muted-foreground">You don't have any upcoming bookings.</p>
                    <Link href="/user/events">
                      <Button>Find Events</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {bookings.map((booking) => (
                    <Link href={`/user/bookings/${booking.id}`} key={booking.id}>
                      <Card className="overflow-hidden hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{booking.title}</CardTitle>
                          <CardDescription>{booking.doctorName}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {new Date(booking.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{booking.location}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Token #{booking.tokenNumber}</Badge>
                          </div>
                          <div className="text-sm font-medium">${booking.entryFee}</div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-center text-muted-foreground">You don't have any past bookings.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pastBookings.map((booking) => (
                    <Link href={`/user/bookings/${booking.id}`} key={booking.id}>
                      <Card className="overflow-hidden hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{booking.title}</CardTitle>
                          <CardDescription>{booking.doctorName}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {new Date(booking.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{booking.location}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
                          <Badge variant="secondary">Completed</Badge>
                          <div className="text-sm font-medium">${booking.entryFee}</div>
                        </CardFooter>
                      </Card>
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


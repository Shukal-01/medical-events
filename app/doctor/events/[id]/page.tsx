"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DoctorHeader } from "@/components/doctor-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Calendar, Clock, MapPin, DollarSign, Search, Download, Printer, QrCode } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock event data
const eventData = {
  id: "1",
  title: "Cardiology Conference",
  description: "A comprehensive conference on the latest advancements in cardiology.",
  date: "2025-04-15",
  time: "09:00 AM - 05:00 PM",
  location: "Medical Center, New York",
  entryFee: 150,
  bookedCount: 45,
  maxBookings: 100,
  status: "upcoming",
  currentToken: 12,
}

// Mock attendees data
const attendees = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    gender: "Male",
    age: 35,
    location: "New York",
    paymentStatus: "Paid",
    tokenNumber: 1,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    gender: "Female",
    age: 42,
    location: "Boston",
    paymentStatus: "Paid",
    tokenNumber: 2,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    gender: "Male",
    age: 28,
    location: "Chicago",
    paymentStatus: "Pending",
    tokenNumber: 3,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    gender: "Female",
    age: 31,
    location: "San Francisco",
    paymentStatus: "Paid",
    tokenNumber: 4,
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@example.com",
    gender: "Male",
    age: 45,
    location: "Los Angeles",
    paymentStatus: "Paid",
    tokenNumber: 5,
  },
]

export default function EventDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const eventId = params.id
  const [searchQuery, setSearchQuery] = useState("")
  const [currentToken, setCurrentToken] = useState(eventData.currentToken)
  const [selectedAttendee, setSelectedAttendee] = useState<(typeof attendees)[0] | null>(null)
  const [showQRDialog, setShowQRDialog] = useState(false)

  // Filter attendees based on search query
  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const updateCurrentToken = (newToken: number) => {
    if (newToken > 0 && newToken <= eventData.bookedCount) {
      setCurrentToken(newToken)

      toast({
        title: "Token updated",
        description: `Current token is now ${newToken}`,
      })
    }
  }

  const handleViewAttendeeQR = (attendee: (typeof attendees)[0]) => {
    setSelectedAttendee(attendee)
    setShowQRDialog(true)
  }

  const handlePrintAttendeeList = () => {
    // In a real app, this would open the print dialog with the attendee list
    window.print()
    toast({
      title: "Print dialog opened",
      description: "Attendee list is ready to print.",
    })
  }

  const handleDownloadAttendeeList = () => {
    // In a real app, this would download the attendee list as CSV or PDF
    toast({
      title: "Attendee list downloaded",
      description: "The attendee list has been downloaded successfully.",
    })
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
            <h1 className="text-3xl font-bold tracking-tight">{eventData.title}</h1>
            <div className="flex gap-2">
              <Link href={`/doctor/events/${eventId}/edit`}>
                <Button variant="outline">Edit Event</Button>
              </Link>
              <Button variant="default">Send Notification</Button>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Information about your event</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(eventData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{eventData.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{eventData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Entry Fee</p>
                    <p className="text-sm text-muted-foreground">${eventData.entryFee}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-1 rounded-lg border p-3">
                  <h4 className="text-sm font-medium">Bookings</h4>
                  <div className="text-2xl font-bold">
                    {eventData.bookedCount} / {eventData.maxBookings}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((eventData.bookedCount / eventData.maxBookings) * 100)}% booked
                  </p>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(eventData.bookedCount / eventData.maxBookings) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 rounded-lg border p-3">
                  <h4 className="text-sm font-medium">Status</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={eventData.status === "upcoming" ? "default" : "secondary"}>
                      {eventData.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Badge>
                    {eventData.bookedCount >= eventData.maxBookings && (
                      <Badge variant="destructive">Fully Booked</Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 rounded-lg border p-3">
                  <h4 className="text-sm font-medium">Current Token</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{currentToken}</div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateCurrentToken(currentToken - 1)}
                        disabled={currentToken <= 1}
                      >
                        -
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateCurrentToken(currentToken + 1)}
                        disabled={currentToken >= eventData.bookedCount}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {eventData.bookedCount - currentToken} attendees remaining
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">{eventData.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Attendees</CardTitle>
                  <CardDescription>List of users who have booked this event</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrintAttendeeList}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print List
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadAttendeeList}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id} className={attendee.tokenNumber <= currentToken ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">
                        {attendee.tokenNumber}
                        {attendee.tokenNumber === currentToken && (
                          <Badge className="ml-2" variant="outline">
                            Current
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://ui-avatars.com/api/?name=${attendee.name.replace(" ", "+")}&background=random`}
                            />
                            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{attendee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{attendee.email}</TableCell>
                      <TableCell>{attendee.gender}</TableCell>
                      <TableCell>{attendee.age}</TableCell>
                      <TableCell>{attendee.location}</TableCell>
                      <TableCell>
                        <Badge variant={attendee.paymentStatus === "Paid" ? "success" : "outline"}>
                          {attendee.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewAttendeeQR(attendee)}>
                          <QrCode className="h-4 w-4" />
                          <span className="sr-only">View QR</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredAttendees.length} of {attendees.length} attendees
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

          <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Attendee QR Code</DialogTitle>
                <DialogDescription>QR code for {selectedAttendee?.name}'s token</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-4">
                {selectedAttendee && (
                  <>
                    <QRCodeGenerator
                      data={JSON.stringify({
                        attendeeId: selectedAttendee.id,
                        name: selectedAttendee.name,
                        tokenNumber: selectedAttendee.tokenNumber,
                        eventId: eventId,
                      })}
                      size={250}
                    />
                    <div className="mt-4 text-center">
                      <p className="font-medium">Token #{selectedAttendee.tokenNumber}</p>
                      <p className="text-sm text-muted-foreground">{selectedAttendee.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedAttendee.email}</p>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}


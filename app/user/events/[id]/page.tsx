"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, MapPin, Users, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { QRCodeGenerator } from "@/components/qr-code-generator"

// Mock event data
const eventData = {
  id: "1",
  title: "Cardiology Conference",
  description:
    "A comprehensive conference on the latest advancements in cardiology. Join leading experts for discussions, presentations, and networking opportunities.",
  doctorName: "Dr. John Smith",
  doctorSpecialization: "Cardiology",
  doctorQualifications: "MD, PhD, FACC",
  doctorExperience: "15+ years",
  date: "2025-04-15",
  time: "09:00 AM - 05:00 PM",
  location: "Medical Center, New York",
  entryFee: 150,
  bookedCount: 45,
  maxBookings: 100,
  status: "upcoming",
}

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const eventId = params.id
  const [isBooking, setIsBooking] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [tokenNumber, setTokenNumber] = useState<number | null>(null)

  const handleBookEvent = () => {
    setShowPaymentDialog(true)
  }

  const handlePayment = async () => {
    setIsBooking(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setPaymentComplete(true)
      setTokenNumber(eventData.bookedCount + 1)

      toast({
        title: "Payment successful",
        description: "Your payment has been processed successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "There was a problem processing your payment.",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const handleConfirmBooking = () => {
    setBookingConfirmed(true)

    // Simulate API call to confirm booking
    setTimeout(() => {
      setShowPaymentDialog(false)

      toast({
        title: "Booking confirmed",
        description: "Your booking has been confirmed. You can view your booking details in My Bookings.",
      })

      // Redirect to bookings page
      router.push("/user/dashboard?tab=booked")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <UserNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{eventData.title}</h1>
            <Link href="/user/dashboard">
              <Button variant="outline">Back to Events</Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Information about this medical event</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Availability</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {eventData.bookedCount} of {eventData.maxBookings} spots booked
                      </p>
                      {eventData.bookedCount >= eventData.maxBookings && (
                        <Badge variant="destructive">Fully Booked</Badge>
                      )}
                    </div>
                    <div className="mt-1 h-2 w-full max-w-md overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(eventData.bookedCount / eventData.maxBookings) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">{eventData.description}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleBookEvent}
                  disabled={isBooking || eventData.bookedCount >= eventData.maxBookings}
                >
                  {isBooking
                    ? "Processing..."
                    : eventData.bookedCount >= eventData.maxBookings
                      ? "Fully Booked"
                      : "Book Now"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Doctor Profile</CardTitle>
                <CardDescription>Event host information</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" />
                    <AvatarFallback>{eventData.doctorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{eventData.doctorName}</h3>
                    <p className="text-sm text-muted-foreground">{eventData.doctorSpecialization}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 text-sm font-medium">Qualifications</h4>
                  <p className="text-sm text-muted-foreground">{eventData.doctorQualifications}</p>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Experience</h4>
                  <p className="text-sm text-muted-foreground">{eventData.doctorExperience}</p>
                </div>

                <Button variant="outline" className="mt-2">
                  View Full Profile
                </Button>

                <Button variant="secondary">Follow Doctor</Button>
              </CardContent>
            </Card>
          </div>

          <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{!paymentComplete ? "Complete Your Booking" : "Booking Confirmation"}</DialogTitle>
                <DialogDescription>
                  {!paymentComplete
                    ? "Please confirm your booking details and proceed to payment."
                    : "Your payment has been processed successfully."}
                </DialogDescription>
              </DialogHeader>

              {!paymentComplete ? (
                <>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <h3 className="font-medium">Booking Summary</h3>
                      <div className="rounded-md bg-muted p-3">
                        <div className="mb-2">
                          <p className="font-medium">{eventData.title}</p>
                          <p className="text-sm text-muted-foreground">{eventData.doctorName}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="font-medium">Date:</p>
                            <p>{new Date(eventData.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium">Time:</p>
                            <p>{eventData.time}</p>
                          </div>
                          <div>
                            <p className="font-medium">Location:</p>
                            <p>{eventData.location}</p>
                          </div>
                          <div>
                            <p className="font-medium">Fee:</p>
                            <p>${eventData.entryFee}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <h3 className="font-medium">Payment Method</h3>
                      <div className="flex items-center gap-2 rounded-md border p-3">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                          <DollarSign className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-sm text-muted-foreground">Pay directly to the doctor</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePayment} disabled={isBooking}>
                      {isBooking ? "Processing..." : "Pay $" + eventData.entryFee}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center justify-center gap-2 py-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium">Payment Successful</h3>
                      <p className="text-center text-sm text-muted-foreground">
                        Your booking has been confirmed. Your token number is:
                      </p>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                        {tokenNumber}
                      </div>
                    </div>

                    <div className="rounded-md bg-muted p-3">
                      <div className="mb-2">
                        <p className="font-medium">{eventData.title}</p>
                        <p className="text-sm text-muted-foreground">{eventData.doctorName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Date:</p>
                          <p>{new Date(eventData.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-medium">Time:</p>
                          <p>{eventData.time}</p>
                        </div>
                        <div>
                          <p className="font-medium">Location:</p>
                          <p>{eventData.location}</p>
                        </div>
                        <div>
                          <p className="font-medium">Amount Paid:</p>
                          <p>${eventData.entryFee}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-sm text-muted-foreground">Your QR code for the event:</p>
                      <QRCodeGenerator
                        data={JSON.stringify({
                          eventId: eventId,
                          tokenNumber: tokenNumber,
                          eventTitle: eventData.title,
                          date: eventData.date,
                        })}
                        size={150}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button onClick={handleConfirmBooking} disabled={bookingConfirmed}>
                      {bookingConfirmed ? "Redirecting..." : "View My Bookings"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}


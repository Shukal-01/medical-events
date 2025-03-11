"use client"

import Link from "next/link"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Download, Share2, CheckCircle2 } from "lucide-react"
import { QRCode } from "@/components/qr-code"

// Mock event data
const eventData = {
  id: "1",
  title: "Cardiology Conference",
  doctorName: "Dr. John Smith",
  date: "2025-04-15",
  time: "09:00 AM - 05:00 PM",
  location: "Medical Center, New York",
  entryFee: 150,
  description: "Join us for the latest advancements in cardiology research and treatment methods.",
}

// Mock booking data
const bookingData = {
  id: "B12345",
  tokenNumber: 42,
  paymentId: "PAY-1234567890",
  paymentDate: new Date().toISOString(),
  totalAmount: 169.5, // Including fees and taxes
}

export default function PaymentConfirmationPage({ params }: { params: { eventId: string } }) {
  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert("Ticket download functionality would be implemented in production")
  }

  const handleShareTicket = () => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: `Ticket for ${eventData.title}`,
        text: `I'm attending ${eventData.title} on ${new Date(eventData.date).toLocaleDateString()}. Join me!`,
        url: window.location.href,
      })
    } else {
      alert("Share functionality would be implemented in production")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <UserNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Payment Successful</h1>
              <p className="text-muted-foreground">Your booking has been confirmed</p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Your event booking information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium">{eventData.title}</h3>
                  <p className="text-sm text-muted-foreground">{eventData.doctorName}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(eventData.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{eventData.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{eventData.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Your Token Number</p>
                    <p className="text-3xl font-bold">{bookingData.tokenNumber}</p>
                  </div>

                  <div className="p-2 bg-white rounded-lg">
                    <QRCode
                      value={`BOOKING:${bookingData.id}:EVENT:${eventData.id}:TOKEN:${bookingData.tokenNumber}`}
                      size={180}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">Scan this QR code at the event for entry</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Booking ID</span>
                    <span>{bookingData.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Payment ID</span>
                    <span>{bookingData.paymentId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Payment Date</span>
                    <span>
                      {new Date(bookingData.paymentDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Amount Paid</span>
                    <span>${bookingData.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <div className="flex w-full gap-3">
                  <Button className="flex-1" variant="outline" onClick={handleDownloadTicket}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Ticket
                  </Button>
                  <Button className="flex-1" variant="outline" onClick={handleShareTicket}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Link href="/user/bookings" className="w-full">
                  <Button className="w-full">View My Bookings</Button>
                </Link>
              </CardFooter>
            </Card>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to your registered email address.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                If you have any questions, please contact our{" "}
                <Link href="/user/support" className="text-primary underline underline-offset-2">
                  support team
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


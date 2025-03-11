"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { Calendar, Clock, MapPin, Download, QrCode, Printer, Share2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock booking data
const bookingData = {
  id: "1",
  eventTitle: "Neurology Symposium",
  eventDate: "2025-05-10",
  eventTime: "09:00 AM - 04:00 PM",
  eventLocation: "Research Center, San Francisco",
  doctorName: "Dr. Emily Davis",
  doctorSpecialization: "Neurology",
  entryFee: 200,
  paymentStatus: "Paid",
  tokenNumber: 15,
  currentToken: 5,
  totalAttendees: 50,
  invoiceNumber: "INV-2025-0015",
  bookingDate: "2025-03-15",
}

export default function BookingDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const bookingId = params.id
  const [showQRDialog, setShowQRDialog] = useState(false)

  // QR code data
  const qrCodeData = JSON.stringify({
    bookingId: bookingId,
    eventTitle: bookingData.eventTitle,
    tokenNumber: bookingData.tokenNumber,
    patientName: "John Smith", // This would come from user context in a real app
    date: bookingData.eventDate,
  })

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF invoice
    toast({
      title: "Invoice downloaded",
      description: "Your invoice has been downloaded successfully.",
    })
  }

  const handlePrintToken = () => {
    // In a real app, this would open the print dialog with the token
    window.print()
    toast({
      title: "Print dialog opened",
      description: "Your token is ready to print.",
    })
  }

  const handleSaveQRCode = () => {
    // In a real app, this would download the QR code as an image
    toast({
      title: "QR Code saved",
      description: "Your QR Code has been saved to your device.",
    })
  }

  const handleShareBooking = () => {
    // In a real app, this would open the share dialog
    toast({
      title: "Sharing options",
      description: "Share options would appear here in a real app.",
    })
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
            <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
            <Link href="/user/dashboard?tab=booked">
              <Button variant="outline">Back to Bookings</Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{bookingData.eventTitle}</CardTitle>
                    <CardDescription>
                      Booking #{bookingData.id} • Invoice #{bookingData.invoiceNumber}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {bookingData.paymentStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(bookingData.eventDate).toLocaleDateString("en-US", {
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
                      <p className="text-sm text-muted-foreground">{bookingData.eventTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{bookingData.eventLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">{bookingData.doctorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Doctor</p>
                      <p className="text-sm text-muted-foreground">{bookingData.doctorName}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Your Token</h3>
                      <p className="text-sm text-muted-foreground">Position in queue</p>
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                      {bookingData.tokenNumber}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current Token: {bookingData.currentToken}</span>
                      <span>Your Token: {bookingData.tokenNumber}</span>
                    </div>
                    <Progress value={(bookingData.currentToken / bookingData.tokenNumber) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {bookingData.tokenNumber - bookingData.currentToken} people ahead of you
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Payment Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Amount Paid</p>
                      <p className="text-lg font-bold">${bookingData.entryFee}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Date</p>
                      <p className="text-sm">
                        {new Date(bookingData.bookingDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <QrCode className="mr-2 h-4 w-4" />
                      Show QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Your Event QR Code</DialogTitle>
                      <DialogDescription>
                        Scan this QR code at the event to check your position in the queue.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-4">
                      <QRCodeGenerator data={qrCodeData} size={250} />
                      <div className="mt-4 text-center">
                        <p className="font-medium">Token #{bookingData.tokenNumber}</p>
                        <p className="text-sm text-muted-foreground">{bookingData.eventTitle}</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button onClick={handleSaveQRCode}>
                        <Download className="mr-2 h-4 w-4" />
                        Save QR Code
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full sm:w-auto" onClick={handlePrintToken}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Token
                </Button>
                <Button className="w-full sm:w-auto" onClick={handleDownloadInvoice}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QR Code</CardTitle>
                <CardDescription>Scan at the event</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="aspect-square w-full max-w-[200px] rounded-lg bg-white p-2">
                  <QRCodeGenerator data={qrCodeData} size={180} />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium">Token #{bookingData.tokenNumber}</p>
                  <p className="text-xs text-muted-foreground">Scan this code to check your position</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={handleSaveQRCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Save QR Code
                </Button>
                <Button variant="ghost" className="w-full" onClick={handleShareBooking}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}


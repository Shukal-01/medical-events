"use client"

import { useState } from "react"
import { DoctorHeader } from "@/components/doctor-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarPlus, Clock } from "lucide-react"

// Mock schedule data
const scheduleData = {
  events: [
    { id: "1", title: "Cardiology Conference", date: "2025-04-15", time: "09:00 AM - 05:00 PM", type: "event" },
    { id: "2", title: "Patient Consultation", date: "2025-04-16", time: "10:00 AM - 11:00 AM", type: "appointment" },
    { id: "3", title: "Team Meeting", date: "2025-04-17", time: "02:00 PM - 03:00 PM", type: "meeting" },
    { id: "4", title: "Webinar: Latest Treatments", date: "2025-04-18", time: "11:00 AM - 12:00 PM", type: "event" },
    { id: "5", title: "Follow-up Appointment", date: "2025-04-19", time: "03:00 PM - 04:00 PM", type: "appointment" },
  ],
  availability: [
    { day: "Monday", hours: "09:00 AM - 05:00 PM" },
    { day: "Tuesday", hours: "09:00 AM - 05:00 PM" },
    { day: "Wednesday", hours: "09:00 AM - 05:00 PM" },
    { day: "Thursday", hours: "09:00 AM - 05:00 PM" },
    { day: "Friday", hours: "09:00 AM - 03:00 PM" },
  ],
}

export default function SchedulePage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showNewEventDialog, setShowNewEventDialog] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: "", date: "", startTime: "", endTime: "", type: "appointment" })

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleAddEvent = () => {
    // In a real app, this would send the new event data to an API
    console.log("Adding new event:", newEvent)
    toast({
      title: "Event Added",
      description: `New ${newEvent.type} "${newEvent.title}" has been added to your schedule.`,
    })
    setShowNewEventDialog(false)
    setNewEvent({ title: "", date: "", startTime: "", endTime: "", type: "appointment" })
  }

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return []
    const dateString = selectedDate.toISOString().split("T")[0]
    return scheduleData.events.filter((event) => event.date === dateString)
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
            <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
            <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
              <DialogTrigger asChild>
                <Button>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Create a new event or appointment in your schedule.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appointment">Appointment</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEvent}>Add Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_300px]">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View and manage your schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Events for {selectedDate?.toDateString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEventsForSelectedDate().map((event) => (
                    <div key={event.id} className="flex items-center justify-between space-x-4">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge
                        variant={
                          event.type === "appointment" ? "default" : event.type === "event" ? "secondary" : "outline"
                        }
                      >
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                  {getEventsForSelectedDate().length === 0 && (
                    <p className="text-sm text-muted-foreground">No events scheduled for this date.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Set your regular working hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="availability">
                <TabsList className="mb-4">
                  <TabsTrigger value="availability">Regular Hours</TabsTrigger>
                  <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
                </TabsList>
                <TabsContent value="availability">
                  <div className="space-y-4">
                    {scheduleData.availability.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="font-medium">{day.day}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{day.hours}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="exceptions">
                  <p className="text-sm text-muted-foreground">
                    Set exceptions to your regular hours, such as holidays or special events.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() =>
                      toast({
                        title: "Add Exception",
                        description: "This would open a form to add availability exceptions.",
                      })
                    }
                  >
                    Add Exception
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}


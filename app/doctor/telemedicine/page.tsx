"use client"

import { useState } from "react"
import { DoctorHeader } from "@/components/doctor-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Video, Phone, MessageSquare, Users } from "lucide-react"

// Mock telemedicine data
const telemedicineData = {
  upcomingConsultations: [
    { id: "1", patientName: "John Smith", date: "2025-04-15", time: "10:00 AM", type: "video" },
    { id: "2", patientName: "Sarah Johnson", date: "2025-04-16", time: "02:30 PM", type: "audio" },
    { id: "3", patientName: "Michael Brown", date: "2025-04-17", time: "11:15 AM", type: "video" },
  ],
  waitingRoom: [
    { id: "4", patientName: "Emily Davis", waitingSince: "10 minutes" },
    { id: "5", patientName: "Robert Wilson", waitingSince: "5 minutes" },
  ],
}

export default function TelemedicinePage() {
  const { toast } = useToast()
  const [roomCode, setRoomCode] = useState("")

  const handleStartConsultation = (patientName: string) => {
    toast({
      title: "Starting Consultation",
      description: `Initiating telemedicine session with ${patientName}.`,
    })
  }

  const handleCreateRoom = () => {
    if (roomCode.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid room code.",
      })
      return
    }
    toast({
      title: "Room Created",
      description: `Telemedicine room ${roomCode} has been created.`,
    })
    setRoomCode("")
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
            <h1 className="text-3xl font-bold tracking-tight">Telemedicine</h1>
            <Button onClick={handleCreateRoom}>
              <Video className="mr-2 h-4 w-4" />
              Create New Room
            </Button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Consultations</CardTitle>
                <CardDescription>Your scheduled telemedicine appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {telemedicineData.upcomingConsultations.map((consultation) => (
                  <div key={consultation.id} className="mb-4 flex items-center justify-between last:mb-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${consultation.patientName.replace(" ", "+")}&background=random`}
                        />
                        <AvatarFallback>{consultation.patientName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{consultation.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(consultation.date).toLocaleDateString()} at {consultation.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant={consultation.type === "video" ? "default" : "secondary"}>
                      {consultation.type === "video" ? (
                        <Video className="mr-1 h-3 w-3" />
                      ) : (
                        <Phone className="mr-1 h-3 w-3" />
                      )}
                      {consultation.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Appointments
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Virtual Waiting Room</CardTitle>
                <CardDescription>Patients waiting for their consultation</CardDescription>
              </CardHeader>
              <CardContent>
                {telemedicineData.waitingRoom.map((patient) => (
                  <div key={patient.id} className="mb-4 flex items-center justify-between last:mb-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${patient.patientName.replace(" ", "+")}&background=random`}
                        />
                        <AvatarFallback>{patient.patientName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.patientName}</p>
                        <p className="text-sm text-muted-foreground">Waiting for {patient.waitingSince}</p>
                      </div>
                    </div>
                    <Button onClick={() => handleStartConsultation(patient.patientName)}>Start</Button>
                  </div>
                ))}
                {telemedicineData.waitingRoom.length === 0 && (
                  <p className="text-center text-muted-foreground">No patients currently waiting.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create Telemedicine Room</CardTitle>
              <CardDescription>Set up a new virtual consultation room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="room-code">Room Code</Label>
                  <Input
                    id="room-code"
                    placeholder="Enter a unique room code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                  />
                </div>
                <Button className="mt-8" onClick={handleCreateRoom}>
                  Create Room
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Telemedicine Resources</CardTitle>
              <CardDescription>Helpful tools and guidelines for virtual consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4" />
                  <span>Video Consultation Guide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Patient Communication Tips</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Group Session Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Audio-Only Consultation Best Practices</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Access Resource Center
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}


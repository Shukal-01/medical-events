"use client"

import { useState } from "react"
import Link from "next/link"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import {
  FileText,
  Upload,
  Download,
  Share2,
  Lock,
  Heart,
  Activity,
  Pill,
  Stethoscope,
  Calendar,
  Plus,
  FileUp,
} from "lucide-react"

// Mock health records data
const healthRecordsData = {
  records: [
    {
      id: "rec1",
      title: "Annual Physical Examination",
      doctor: "Dr. Sarah Johnson",
      date: "2025-02-10",
      type: "examination",
      fileSize: "2.4 MB",
      shared: false,
    },
    {
      id: "rec2",
      title: "Blood Test Results",
      doctor: "Dr. Michael Brown",
      date: "2025-01-15",
      type: "lab",
      fileSize: "1.8 MB",
      shared: true,
    },
    {
      id: "rec3",
      title: "Vaccination Record",
      doctor: "Dr. Emily Davis",
      date: "2024-12-05",
      type: "vaccination",
      fileSize: "1.2 MB",
      shared: false,
    },
    {
      id: "rec4",
      title: "Cardiology Consultation",
      doctor: "Dr. John Smith",
      date: "2024-11-20",
      type: "consultation",
      fileSize: "3.5 MB",
      shared: true,
    },
  ],
  medications: [
    {
      id: "med1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2025-01-01",
      endDate: "2025-06-30",
      prescribedBy: "Dr. John Smith",
      remainingDays: 112,
      totalDays: 180,
    },
    {
      id: "med2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2025-02-15",
      endDate: "2025-05-15",
      prescribedBy: "Dr. Sarah Johnson",
      remainingDays: 66,
      totalDays: 90,
    },
  ],
  appointments: [
    {
      id: "apt1",
      title: "Follow-up Consultation",
      doctor: "Dr. John Smith",
      date: "2025-04-20",
      time: "10:00 AM",
      location: "Medical Center, New York",
      status: "upcoming",
    },
    {
      id: "apt2",
      title: "Dental Checkup",
      doctor: "Dr. Patricia Lee",
      date: "2025-05-05",
      time: "02:30 PM",
      location: "Dental Clinic, Boston",
      status: "upcoming",
    },
    {
      id: "apt3",
      title: "Annual Physical",
      doctor: "Dr. Sarah Johnson",
      date: "2025-01-15",
      time: "09:00 AM",
      location: "Community Hospital, Chicago",
      status: "completed",
    },
  ],
  healthMetrics: {
    bloodPressure: [
      { date: "2025-03-01", value: "120/80" },
      { date: "2025-02-15", value: "118/78" },
      { date: "2025-02-01", value: "122/82" },
    ],
    weight: [
      { date: "2025-03-01", value: "165 lbs" },
      { date: "2025-02-15", value: "167 lbs" },
      { date: "2025-02-01", value: "168 lbs" },
    ],
    heartRate: [
      { date: "2025-03-01", value: "72 bpm" },
      { date: "2025-02-15", value: "75 bpm" },
      { date: "2025-02-01", value: "74 bpm" },
    ],
  },
}

export default function HealthRecordsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("records")
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadRecord = () => {
    setIsUploading(true)

    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Record uploaded",
        description: "Your health record has been uploaded successfully.",
      })
    }, 2000)
  }

  const handleDownloadRecord = (recordId: string) => {
    const record = healthRecordsData.records.find((r) => r.id === recordId)

    if (record) {
      toast({
        title: "Downloading record",
        description: `Downloading ${record.title}...`,
      })
    }
  }

  const handleShareRecord = (recordId: string) => {
    const record = healthRecordsData.records.find((r) => r.id === recordId)

    if (record) {
      toast({
        title: "Share record",
        description: `Sharing options for ${record.title} would be displayed in production.`,
      })
    }
  }

  const handleAddMedication = () => {
    toast({
      title: "Add medication",
      description: "A form to add a new medication would be displayed in production.",
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Health Records</h1>
            <p className="text-muted-foreground">Manage your medical records and health information</p>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="records" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Medical Records</CardTitle>
                      <CardDescription>View and manage your medical documents</CardDescription>
                    </div>
                    <Button onClick={handleUploadRecord} disabled={isUploading}>
                      <Upload className="mr-2 h-4 w-4" />
                      {isUploading ? "Uploading..." : "Upload Record"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {healthRecordsData.records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{record.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>{record.doctor}</TableCell>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.fileSize}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleDownloadRecord(record.id)}>
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleShareRecord(record.id)}>
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Share</span>
                              </Button>
                              {record.shared && (
                                <div className="flex h-8 w-8 items-center justify-center text-blue-500">
                                  <Lock className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Record Sharing</CardTitle>
                  <CardDescription>Manage who can access your medical records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Doctor Access</h4>
                        <p className="text-sm text-muted-foreground">
                          Control which doctors can view your medical records
                        </p>
                      </div>
                      <Button variant="outline">Manage Access</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Current Medications</CardTitle>
                      <CardDescription>Track your prescribed medications</CardDescription>
                    </div>
                    <Button onClick={handleAddMedication}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Medication
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {healthRecordsData.medications.map((medication) => (
                    <div key={medication.id} className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Pill className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">{medication.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {medication.dosage} - {medication.frequency}
                          </p>
                          <p className="text-sm text-muted-foreground">Prescribed by {medication.prescribedBy}</p>
                        </div>
                        <div className="text-sm">
                          <div className="text-right">
                            <span className="font-medium">{medication.remainingDays} days remaining</span>
                          </div>
                          <div className="mt-2 w-40">
                            <Progress value={(medication.remainingDays / medication.totalDays) * 100} className="h-2" />
                          </div>
                          <div className="mt-1 text-right text-xs text-muted-foreground">
                            {new Date(medication.startDate).toLocaleDateString()} -{" "}
                            {new Date(medication.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medication Reminders</CardTitle>
                  <CardDescription>Set up reminders for your medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Reminder Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure how you want to receive medication reminders
                        </p>
                      </div>
                      <Button variant="outline">Configure Reminders</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled medical appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {healthRecordsData.appointments
                    .filter((appointment) => appointment.status === "upcoming")
                    .map((appointment) => (
                      <div key={appointment.id} className="rounded-lg border p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Stethoscope className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">{appointment.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                            <p className="text-sm text-muted-foreground">{appointment.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {new Date(appointment.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="text-sm text-muted-foreground">{appointment.time}</div>
                            <div className="mt-2">
                              <Link href={`/user/appointments/${appointment.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {healthRecordsData.appointments.filter((appointment) => appointment.status === "upcoming").length ===
                    0 && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Calendar className="h-12 w-12 text-muted-foreground opacity-50" />
                      <p className="mt-4 text-center text-muted-foreground">
                        You don't have any upcoming appointments.
                      </p>
                      <Link href="/user/find-events">
                        <Button className="mt-4">Find Events</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                  <CardDescription>Your previous medical appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Appointment</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {healthRecordsData.appointments
                        .filter((appointment) => appointment.status === "completed")
                        .map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">{appointment.title}</TableCell>
                            <TableCell>{appointment.doctor}</TableCell>
                            <TableCell>
                              {new Date(appointment.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </TableCell>
                            <TableCell>{appointment.location}</TableCell>
                            <TableCell className="text-right">
                              <Link href={`/user/appointments/${appointment.id}`}>
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Health Metrics</CardTitle>
                      <CardDescription>Track your health measurements over time</CardDescription>
                    </div>
                    <Button variant="outline">
                      <FileUp className="mr-2 h-4 w-4" />
                      Add New Measurement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-medium">Blood Pressure</h3>
                    <div className="space-y-4">
                      {healthRecordsData.healthMetrics.bloodPressure.map((reading, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="font-medium">{reading.value}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(reading.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-medium">Weight</h3>
                    <div className="space-y-4">
                      {healthRecordsData.healthMetrics.weight.map((reading, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{reading.value}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(reading.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-medium">Heart Rate</h3>
                    <div className="space-y-4">
                      {healthRecordsData.healthMetrics.heartRate.map((reading, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="font-medium">{reading.value}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(reading.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Detailed Health Reports
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}


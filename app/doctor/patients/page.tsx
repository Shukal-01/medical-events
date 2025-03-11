"use client"

import { useState } from "react"
import { DoctorHeader } from "@/components/doctor-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Search, UserPlus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock patient data
const patients = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    age: 35,
    gender: "Male",
    lastVisit: "2025-03-15",
    upcomingAppointment: "2025-04-20",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    age: 42,
    gender: "Female",
    lastVisit: "2025-02-28",
    upcomingAppointment: "2025-04-15",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    age: 28,
    gender: "Male",
    lastVisit: "2025-03-10",
    upcomingAppointment: null,
    status: "inactive",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    age: 31,
    gender: "Female",
    lastVisit: "2025-03-05",
    upcomingAppointment: "2025-04-22",
    status: "active",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@example.com",
    age: 45,
    gender: "Male",
    lastVisit: "2025-01-20",
    upcomingAppointment: "2025-04-18",
    status: "active",
  },
]

export default function PatientManagementPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddPatient = () => {
    toast({
      title: "Add Patient",
      description: "This would open a form to add a new patient in a real application.",
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
            <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
            <Button onClick={handleAddPatient}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Patients</CardTitle>
              <CardDescription>Manage and view your patient list</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Upcoming Appointment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://ui-avatars.com/api/?name=${patient.name.replace(" ", "+")}&background=random`}
                              alt={patient.name}
                            />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {patient.upcomingAppointment
                          ? new Date(patient.upcomingAppointment).toLocaleDateString()
                          : "No upcoming appointment"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={patient.status === "active" ? "default" : "secondary"}>{patient.status}</Badge>
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
                            <DropdownMenuItem
                              onClick={() => toast({ title: "View Profile", description: "Viewing patient profile" })}
                            >
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toast({ title: "Edit Patient", description: "Editing patient information" })
                              }
                            >
                              Edit Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toast({ title: "Schedule Appointment", description: "Scheduling appointment" })
                              }
                            >
                              Schedule Appointment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                toast({ title: "Medical History", description: "Viewing medical history" })
                              }
                            >
                              Medical History
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toast({ title: "Prescriptions", description: "Managing prescriptions" })}
                            >
                              Prescriptions
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}


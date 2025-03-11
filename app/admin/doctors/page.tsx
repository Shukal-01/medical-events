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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
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

// Mock data for doctors
const doctors = [
  {
    id: "1",
    name: "Dr. John Smith",
    email: "drjsmith@example.com",
    specialization: "Cardiology",
    qualifications: "MD, PhD, FACC",
    experience: "15+ years",
    location: "Medical Center, New York",
    registeredOn: "2025-03-10",
    status: "active",
    verified: true,
    events: 5,
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "drsarah@example.com",
    specialization: "Neurology",
    qualifications: "MD, FAAN",
    experience: "12 years",
    location: "University Hospital, Boston",
    registeredOn: "2025-03-08",
    status: "active",
    verified: true,
    events: 3,
  },
  {
    id: "3",
    name: "Dr. Michael Brown",
    email: "drmichael@example.com",
    specialization: "Pediatrics",
    qualifications: "MD, FAAP",
    experience: "8 years",
    location: "Children's Hospital, Chicago",
    registeredOn: "2025-03-05",
    status: "active",
    verified: true,
    events: 2,
  },
  {
    id: "4",
    name: "Dr. Emily Davis",
    email: "dremily@example.com",
    specialization: "Dermatology",
    qualifications: "MD, FAAD",
    experience: "10 years",
    location: "Skin Care Center, San Francisco",
    registeredOn: "2025-03-01",
    status: "pending",
    verified: false,
    events: 0,
  },
  {
    id: "5",
    name: "Dr. Robert Wilson",
    email: "drrobert@example.com",
    specialization: "Orthopedics",
    qualifications: "MD, FAAOS",
    experience: "20 years",
    location: "Orthopedic Institute, Los Angeles",
    registeredOn: "2025-02-25",
    status: "active",
    verified: true,
    events: 7,
  },
  {
    id: "6",
    name: "Dr. Patricia Lee",
    email: "drpatricia@example.com",
    specialization: "Dentistry",
    qualifications: "DDS, FAGD",
    experience: "9 years",
    location: "Dental College, San Francisco",
    registeredOn: "2025-02-20",
    status: "inactive",
    verified: true,
    events: 1,
  },
]

export default function AdminDoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specializationFilter, setSpecializationFilter] = useState("all")

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || doctor.status === statusFilter
    const matchesSpecialization = specializationFilter === "all" || doctor.specialization === specializationFilter

    return matchesSearch && matchesStatus && matchesSpecialization
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
            <h1 className="text-3xl font-bold tracking-tight">Doctors Management</h1>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Doctor
            </Button>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Doctors</CardTitle>
              <CardDescription>Manage registered doctors on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search doctors..."
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="specialization-filter" className="w-20">
                      Specialty:
                    </Label>
                    <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                      <SelectTrigger id="specialization-filter" className="w-[180px]">
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                        <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="Dentistry">Dentistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDoctors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No doctors found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDoctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://ui-avatars.com/api/?name=${doctor.name.replace(" ", "+")}&background=random`}
                                />
                                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{doctor.name}</div>
                                <div className="text-xs text-muted-foreground">{doctor.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{doctor.specialization}</TableCell>
                          <TableCell>{doctor.experience}</TableCell>
                          <TableCell>{doctor.location}</TableCell>
                          <TableCell>{doctor.events}</TableCell>
                          <TableCell>
                            {doctor.verified ? (
                              <div className="flex items-center">
                                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-xs">Verified</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <XCircle className="mr-1 h-4 w-4 text-amber-500" />
                                <span className="text-xs">Unverified</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                doctor.status === "active"
                                  ? "success"
                                  : doctor.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {doctor.status}
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
                                  <Link href={`/admin/doctors/${doctor.id}`} className="w-full">
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Doctor</DropdownMenuItem>
                                {!doctor.verified && <DropdownMenuItem>Verify Doctor</DropdownMenuItem>}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  {doctor.status === "active" ? "Deactivate" : "Activate"} Doctor
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete Doctor</DropdownMenuItem>
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
                Showing {filteredDoctors.length} of {doctors.length} doctors
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


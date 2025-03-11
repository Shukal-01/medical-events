"use client"

import { useState } from "react"
import { DoctorHeader } from "@/components/doctor-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, FileText, Send } from "lucide-react"

// Mock prescription data
const prescriptionData = [
  {
    id: "1",
    patientName: "John Smith",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    date: "2025-04-10",
  },
  {
    id: "2",
    patientName: "Sarah Johnson",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    date: "2025-04-09",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    date: "2025-04-08",
  },
  {
    id: "4",
    patientName: "Emily Davis",
    medication: "Levothyroxine",
    dosage: "100mcg",
    frequency: "Once daily",
    date: "2025-04-07",
  },
  {
    id: "5",
    patientName: "Robert Wilson",
    medication: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    date: "2025-04-06",
  },
]

export default function PrescriptionsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPrescriptionDialog, setShowNewPrescriptionDialog] = useState(false)
  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    medication: "",
    dosage: "",
    frequency: "",
    instructions: "",
  })

  const filteredPrescriptions = prescriptionData.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreatePrescription = () => {
    // In a real app, this would send the new prescription data to an API
    console.log("Creating new prescription:", newPrescription)
    toast({
      title: "Prescription Created",
      description: `New prescription for ${newPrescription.patientName} has been created.`,
    })
    setShowNewPrescriptionDialog(false)
    setNewPrescription({ patientName: "", medication: "", dosage: "", frequency: "", instructions: "" })
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
            <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
            <Dialog open={showNewPrescriptionDialog} onOpenChange={setShowNewPrescriptionDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Prescription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Prescription</DialogTitle>
                  <DialogDescription>Enter the details for the new prescription.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={newPrescription.patientName}
                      onChange={(e) => setNewPrescription({ ...newPrescription, patientName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="medication">Medication</Label>
                    <Input
                      id="medication"
                      value={newPrescription.medication}
                      onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input
                        id="dosage"
                        value={newPrescription.dosage}
                        onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select
                        value={newPrescription.frequency}
                        onValueChange={(value) => setNewPrescription({ ...newPrescription, frequency: value })}
                      >
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once_daily">Once Daily</SelectItem>
                          <SelectItem value="twice_daily">Twice Daily</SelectItem>
                          <SelectItem value="three_times_daily">Three Times Daily</SelectItem>
                          <SelectItem value="four_times_daily">Four Times Daily</SelectItem>
                          <SelectItem value="as_needed">As Needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={newPrescription.instructions}
                      onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreatePrescription}>Create Prescription</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Prescription Management</CardTitle>
              <CardDescription>View and manage patient prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prescriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Date Prescribed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.patientName}</TableCell>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.frequency}</TableCell>
                      <TableCell>{new Date(prescription.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast({ title: "View Prescription", description: "Viewing prescription details" })
                          }
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast({ title: "Send Prescription", description: "Sending prescription to pharmacy" })
                          }
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Send
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => toast({ title: "Export Prescriptions", description: "Exporting prescription data" })}
              >
                Export Data
              </Button>
              <Button
                variant="outline"
                onClick={() => toast({ title: "Print Prescriptions", description: "Printing prescription list" })}
              >
                Print List
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}


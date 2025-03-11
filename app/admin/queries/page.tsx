"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, MessageCircle } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Mock data for help queries
const queries = [
  {
    id: "1",
    subject: "Payment Issue",
    message: "I made a payment for an event but it's not showing in my bookings.",
    userName: "John Smith",
    userEmail: "john@example.com",
    userType: "user",
    date: "2025-04-10T09:15:00",
    status: "open",
    priority: "high",
  },
  {
    id: "2",
    subject: "Event Cancellation",
    message: "How do I cancel my event and issue refunds to attendees?",
    userName: "Dr. Sarah Johnson",
    userEmail: "drsarah@example.com",
    userType: "doctor",
    date: "2025-04-09T14:30:00",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "3",
    subject: "Account Verification",
    message: "I submitted my documents for verification 3 days ago but haven't heard back.",
    userName: "Dr. Michael Brown",
    userEmail: "drmichael@example.com",
    userType: "doctor",
    date: "2025-04-08T11:45:00",
    status: "open",
    priority: "medium",
  },
  {
    id: "4",
    subject: "Refund Request",
    message: "I couldn't attend the event due to an emergency. Can I get a refund?",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    userType: "user",
    date: "2025-04-07T16:20:00",
    status: "open",
    priority: "low",
  },
  {
    id: "5",
    subject: "Technical Issue",
    message: "The QR code for my event isn't working properly.",
    userName: "Robert Wilson",
    userEmail: "robert@example.com",
    userType: "user",
    date: "2025-04-05T10:10:00",
    status: "resolved",
    priority: "high",
  },
]

export default function AdminQueriesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedQuery, setSelectedQuery] = useState<(typeof queries)[0] | null>(null)
  const [responseText, setResponseText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter queries based on search and filters
  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.userEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || query.status === statusFilter
    const matchesPriority = priorityFilter === "all" || query.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleSubmitResponse = async () => {
    if (!selectedQuery || !responseText.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to submit the response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Response sent",
        description: `Your response to ${selectedQuery.userName} has been sent successfully.`,
      })

      setResponseText("")
      setSelectedQuery(null)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send response",
        description: "There was a problem sending your response. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <AdminNav className="p-1" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Help Queries</h1>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage and respond to user and doctor support queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search queries..."
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
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="priority-filter" className="w-20">
                      Priority:
                    </Label>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger id="priority-filter" className="w-[180px]">
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQueries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No queries found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredQueries.map((query) => (
                        <TableRow key={query.id}>
                          <TableCell>
                            <div className="font-medium">{query.subject}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[250px]">{query.message}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://ui-avatars.com/api/?name=${query.userName.replace(" ", "+")}&background=random`}
                                />
                                <AvatarFallback>{query.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm">{query.userName}</div>
                                <div className="text-xs text-muted-foreground">{query.userEmail}</div>
                                <Badge variant="outline" className="mt-1">
                                  {query.userType === "doctor" ? "Doctor" : "User"}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(query.date)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                query.priority === "high"
                                  ? "destructive"
                                  : query.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {query.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                query.status === "open"
                                  ? "outline"
                                  : query.status === "in-progress"
                                    ? "default"
                                    : "success"
                              }
                            >
                              {query.status === "in-progress"
                                ? "In Progress"
                                : query.status === "resolved"
                                  ? "Resolved"
                                  : "Open"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onClick={() => setSelectedQuery(query)}>
                                      View Details
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DropdownMenuItem>
                                    Mark as {query.status === "in-progress" ? "Resolved" : "In Progress"}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">Delete Query</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>

                              <DialogContent className="sm:max-w-[600px]">
                                {selectedQuery && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle>{selectedQuery.subject}</DialogTitle>
                                      <DialogDescription>
                                        From {selectedQuery.userName} ({selectedQuery.userEmail})
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <div className="rounded-md bg-muted p-4 mb-4">
                                        <p className="text-sm">{selectedQuery.message}</p>
                                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                          <span>Received: {formatDate(selectedQuery.date)}</span>
                                          <Badge variant="outline">
                                            {selectedQuery.userType === "doctor" ? "Doctor" : "User"}
                                          </Badge>
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="response">Your Response</Label>
                                        <Textarea
                                          id="response"
                                          placeholder="Type your response here..."
                                          className="min-h-[120px]"
                                          value={responseText}
                                          onChange={(e) => setResponseText(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setSelectedQuery(null)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={handleSubmitResponse}
                                        disabled={!responseText.trim() || isSubmitting}
                                      >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        {isSubmitting ? "Sending..." : "Send Response"}
                                      </Button>
                                    </DialogFooter>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
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
                Showing {filteredQueries.length} of {queries.length} queries
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


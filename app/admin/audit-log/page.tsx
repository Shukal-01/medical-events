"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Search, Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock audit log data
const auditLogData = [
  {
    id: "1",
    action: "User Login",
    user: "john@example.com",
    timestamp: "2025-04-15T10:30:00Z",
    details: "Successful login",
  },
  {
    id: "2",
    action: "Create Event",
    user: "dr.sarah@example.com",
    timestamp: "2025-04-15T11:15:00Z",
    details: "Created event: Cardiology Conference",
  },
  {
    id: "3",
    action: "Update User",
    user: "admin@medconnect.com",
    timestamp: "2025-04-15T12:00:00Z",
    details: "Updated user profile: michael@example.com",
  },
  {
    id: "4",
    action: "Delete Event",
    user: "dr.emily@example.com",
    timestamp: "2025-04-15T13:45:00Z",
    details: "Deleted event: Health Seminar",
  },
  {
    id: "5",
    action: "System Settings",
    user: "admin@medconnect.com",
    timestamp: "2025-04-15T14:30:00Z",
    details: "Updated email configuration",
  },
]

export default function AuditLogPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredLogs = auditLogData.filter(
    (log) =>
      (log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (actionFilter === "all" || log.action === actionFilter),
  )

  const handleExportLogs = () => {
    toast({
      title: "Exporting Audit Logs",
      description: "Your audit logs are being exported and will be downloaded shortly.",
    })
  }

  const handleRefreshLogs = async () => {
    setIsRefreshing(true)
    // Simulate log refresh
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Logs Refreshed",
      description: "Audit logs have been updated with the latest entries.",
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
            <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRefreshLogs} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Logs"}
              </Button>
              <Button onClick={handleExportLogs}>
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </Button>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>Track and monitor all system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="User Login">User Login</SelectItem>
                    <SelectItem value="Create Event">Create Event</SelectItem>
                    <SelectItem value="Update User">Update User</SelectItem>
                    <SelectItem value="Delete Event">Delete Event</SelectItem>
                    <SelectItem value="System Settings">System Settings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{log.details}</TableCell>
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


"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, RefreshCw } from "lucide-react"

// Mock report data
const reportData = {
  userGrowth: [
    { month: "Jan", users: 100 },
    { month: "Feb", users: 150 },
    { month: "Mar", users: 200 },
    { month: "Apr", users: 280 },
    { month: "May", users: 350 },
    { month: "Jun", users: 400 },
  ],
  eventStatistics: [
    { month: "Jan", events: 5, attendees: 75 },
    { month: "Feb", events: 8, attendees: 120 },
    { month: "Mar", events: 12, attendees: 180 },
    { month: "Apr", events: 15, attendees: 225 },
    { month: "May", events: 18, attendees: 270 },
    { month: "Jun", events: 22, attendees: 330 },
  ],
  revenueData: [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7500 },
    { month: "Mar", revenue: 10000 },
    { month: "Apr", revenue: 12500 },
    { month: "May", revenue: 15000 },
    { month: "Jun", revenue: 18000 },
  ],
  userTypeDistribution: [
    { name: "Patients", value: 350 },
    { name: "Doctors", value: 50 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function ReportsPage() {
  const { toast } = useToast()
  const [reportType, setReportType] = useState("userGrowth")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: "Your report is being generated and will be downloaded shortly.",
    })
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Data Refreshed",
      description: "Report data has been updated with the latest information.",
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
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRefreshData} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
              <Button onClick={handleExportReport}>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Analytics Report</CardTitle>
                  <CardDescription>Comprehensive data analysis and statistics</CardDescription>
                </div>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="userGrowth">User Growth</SelectItem>
                    <SelectItem value="eventStatistics">Event Statistics</SelectItem>
                    <SelectItem value="revenueAnalysis">Revenue Analysis</SelectItem>
                    <SelectItem value="userDistribution">User Distribution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {reportType === "userGrowth" && (
                <div>
                  <h3 className="mb-4 text-lg font-medium">User Growth Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reportData.userGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {reportType === "eventStatistics" && (
                <div>
                  <h3 className="mb-4 text-lg font-medium">Event and Attendee Statistics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData.eventStatistics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="events" fill="#8884d8" name="Events" />
                      <Bar yAxisId="right" dataKey="attendees" fill="#82ca9d" name="Attendees" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {reportType === "revenueAnalysis" && (
                <div>
                  <h3 className="mb-4 text-lg font-medium">Revenue Analysis</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData.revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {reportType === "userDistribution" && (
                <div>
                  <h3 className="mb-4 text-lg font-medium">User Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportData.userTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {reportData.userTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}


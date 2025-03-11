"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { Bell, Calendar, Info, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for notifications
const notifications = [
  {
    id: "1",
    title: "Your appointment is tomorrow",
    description: "Neurology Symposium with Dr. Emily Davis starts at 9:00 AM tomorrow.",
    date: "2025-05-09T15:00:00",
    type: "reminder",
    isRead: false,
  },
  {
    id: "2",
    title: "Booking confirmed",
    description: "Your booking for Dental Health Symposium has been confirmed. Token #8 assigned.",
    date: "2025-05-05T10:30:00",
    type: "confirmation",
    isRead: true,
  },
  {
    id: "3",
    title: "Payment successful",
    description: "Your payment of $100 for Dental Health Symposium has been received.",
    date: "2025-05-05T10:29:00",
    type: "payment",
    isRead: true,
  },
  {
    id: "4",
    title: "Venue changed",
    description: "The venue for Medical Workshop has been changed to University Hospital, East Wing.",
    date: "2025-03-08T14:15:00",
    type: "alert",
    isRead: true,
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter((notification) => !notification.isRead).length

  const filteredNotifications = notificationsList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, isRead: true })))

    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const markAsRead = (id: string) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const clearAllNotifications = () => {
    setNotificationsList([])

    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared.",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "confirmation":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "payment":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else {
      return date.toLocaleDateString()
    }
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
            <div className="flex items-center">
              <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
              {unreadCount > 0 && <Badge className="ml-2">{unreadCount} unread</Badge>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                Mark all as read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllNotifications}
                disabled={notificationsList.length === 0}
              >
                Clear all
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="reminder">Reminders</TabsTrigger>
              <TabsTrigger value="confirmation">Confirmations</TabsTrigger>
              <TabsTrigger value="alert">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === "all"
                      ? "All Notifications"
                      : activeTab === "unread"
                        ? "Unread Notifications"
                        : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
                  </CardTitle>
                  <CardDescription>
                    {filteredNotifications.length === 0
                      ? "No notifications to display"
                      : `You have ${filteredNotifications.length} notification${filteredNotifications.length !== 1 ? "s" : ""}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activeTab === "all"
                          ? "You don't have any notifications yet."
                          : activeTab === "unread"
                            ? "You have read all your notifications."
                            : `You don't have any ${activeTab} notifications.`}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`relative rounded-lg border p-4 transition-colors ${notification.isRead ? "bg-card" : "bg-muted/40"}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className={`font-medium ${notification.isRead ? "" : "text-primary"}`}>
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                            </div>
                          </div>
                          {!notification.isRead && (
                            <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}


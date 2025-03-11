"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserHeader } from "@/components/user-header"
import { UserNav } from "@/components/user-nav"
import { EventCard } from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Search, Bell, Filter, Heart, Bookmark } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for available events
const availableEvents = [
  {
    id: "1",
    title: "Cardiology Conference",
    doctorName: "Dr. John Smith",
    date: "2025-04-15",
    time: "09:00 AM - 05:00 PM",
    location: "Medical Center, New York",
    entryFee: 150,
    bookedCount: 45,
    maxBookings: 100,
    status: "upcoming",
    isFavorite: false,
    tags: ["cardiology", "conference"],
  },
  {
    id: "2",
    title: "Health Seminar",
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-20",
    time: "10:00 AM - 01:00 PM",
    location: "Community Hall, Boston",
    entryFee: 50,
    bookedCount: 120,
    maxBookings: 120,
    status: "full",
    isFavorite: true,
    tags: ["health", "seminar"],
  },
  {
    id: "3",
    title: "Medical Workshop",
    doctorName: "Dr. Michael Brown",
    date: "2025-04-25",
    time: "02:00 PM - 06:00 PM",
    location: "University Hospital, Chicago",
    entryFee: 75,
    bookedCount: 65,
    maxBookings: 80,
    status: "upcoming",
    isFavorite: false,
    tags: ["workshop", "medical"],
  },
]

// Mock data for user's booked events
const bookedEvents = [
  {
    id: "4",
    title: "Neurology Symposium",
    doctorName: "Dr. Emily Davis",
    date: "2025-05-10",
    time: "09:00 AM - 04:00 PM",
    location: "Research Center, San Francisco",
    entryFee: 200,
    tokenNumber: 15,
    status: "upcoming",
  },
]

// Mock data for recommended events
const recommendedEvents = [
  {
    id: "5",
    title: "Dental Health Symposium",
    doctorName: "Dr. Patricia Lee",
    date: "2025-05-05",
    time: "10:00 AM - 02:00 PM",
    location: "Dental College, San Francisco",
    entryFee: 100,
    bookedCount: 30,
    maxBookings: 75,
    status: "upcoming",
    isFavorite: false,
    tags: ["dental", "health"],
  },
  {
    id: "6",
    title: "Pediatrics Summit",
    doctorName: "Dr. Robert Wilson",
    date: "2025-05-12",
    time: "09:00 AM - 05:00 PM",
    location: "Children's Hospital, Miami",
    entryFee: 125,
    bookedCount: 50,
    maxBookings: 80,
    status: "upcoming",
    isFavorite: false,
    tags: ["pediatrics", "children"],
  },
]

export default function UserDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState(tabParam || "available")
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [events, setEvents] = useState(availableEvents)

  // Update URL when tab changes
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set("tab", activeTab)
    window.history.pushState({}, "", url)
  }, [activeTab])

  // Filter available events based on search and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.tags && event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesLocation = locationFilter === "all" || event.location.includes(locationFilter)
    const matchesDoctor = doctorFilter === "all" || event.doctorName.includes(doctorFilter)

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under50" && event.entryFee < 50) ||
      (priceFilter === "50to100" && event.entryFee >= 50 && event.entryFee <= 100) ||
      (priceFilter === "over100" && event.entryFee > 100)

    return matchesSearch && matchesLocation && matchesDoctor && matchesPrice
  })

  const handleToggleFavorite = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === eventId ? { ...event, isFavorite: !event.isFavorite } : event)),
    )

    const event = events.find((e) => e.id === eventId)
    if (event) {
      toast({
        title: event.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: `${event.title} has been ${event.isFavorite ? "removed from" : "added to"} your favorites.`,
      })
    }
  }

  const handleSetReminder = (eventId: string) => {
    toast({
      title: "Reminder set",
      description: "You will be notified before this event starts.",
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Medical Events</h1>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="available">Available Events</TabsTrigger>
              <TabsTrigger value="booked">My Bookings</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4">
              <Card className="mt-4">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Find Events</CardTitle>
                      <CardDescription>Browse and filter available medical events</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                      <Filter className="mr-2 h-4 w-4" />
                      {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by event name, doctor, or tags"
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {showFilters && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="location-filter">Filter by Location</Label>
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                          <SelectTrigger id="location-filter">
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="New York">New York</SelectItem>
                            <SelectItem value="Boston">Boston</SelectItem>
                            <SelectItem value="Chicago">Chicago</SelectItem>
                            <SelectItem value="San Francisco">San Francisco</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctor-filter">Filter by Doctor</Label>
                        <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                          <SelectTrigger id="doctor-filter">
                            <SelectValue placeholder="All Doctors" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Doctors</SelectItem>
                            <SelectItem value="Dr. John Smith">Dr. John Smith</SelectItem>
                            <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                            <SelectItem value="Dr. Michael Brown">Dr. Michael Brown</SelectItem>
                            <SelectItem value="Dr. Emily Davis">Dr. Emily Davis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price-filter">Filter by Price</Label>
                        <Select value={priceFilter} onValueChange={setPriceFilter}>
                          <SelectTrigger id="price-filter">
                            <SelectValue placeholder="All Prices" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Prices</SelectItem>
                            <SelectItem value="under50">Under $50</SelectItem>
                            <SelectItem value="50to100">$50 - $100</SelectItem>
                            <SelectItem value="over100">Over $100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {filteredEvents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-center text-muted-foreground">No events found matching your criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("")
                        setLocationFilter("all")
                        setDoctorFilter("all")
                        setPriceFilter("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="relative group">
                      <Link href={`/user/events/${event.id}`}>
                        <EventCard
                          title={event.title}
                          subtitle={event.doctorName}
                          date={event.date}
                          time={event.time}
                          location={event.location}
                          status={event.status}
                          bookedCount={event.bookedCount}
                          maxBookings={event.maxBookings}
                          entryFee={event.entryFee}
                        />
                      </Link>
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={(e) => {
                            e.preventDefault()
                            handleToggleFavorite(event.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${event.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                          <span className="sr-only">
                            {event.isFavorite ? "Remove from favorites" : "Add to favorites"}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={(e) => {
                            e.preventDefault()
                            handleSetReminder(event.id)
                          }}
                        >
                          <Bell className="h-4 w-4" />
                          <span className="sr-only">Set reminder</span>
                        </Button>
                      </div>
                      {event.tags && (
                        <div className="absolute bottom-14 left-2 flex flex-wrap gap-1">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="booked" className="space-y-4">
              {bookedEvents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="mb-4 text-center text-muted-foreground">You haven't booked any events yet.</p>
                    <Button onClick={() => setActiveTab("available")}>Browse Events</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {bookedEvents.map((event) => (
                    <Link href={`/user/bookings/${event.id}`} key={event.id}>
                      <Card className="overflow-hidden hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>{event.doctorName}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Token #{event.tokenNumber}</Badge>
                          </div>
                          <div className="text-sm font-medium">${event.entryFee}</div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="recommended" className="space-y-4">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Recommended For You</CardTitle>
                  <CardDescription>Events you might be interested in based on your preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendedEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6">
                      <p className="text-center text-muted-foreground">No recommendations available yet.</p>
                      <p className="text-center text-sm text-muted-foreground mt-1">
                        Book more events to get personalized recommendations.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {recommendedEvents.map((event) => (
                        <div key={event.id} className="relative group">
                          <Link href={`/user/events/${event.id}`}>
                            <EventCard
                              title={event.title}
                              subtitle={event.doctorName}
                              date={event.date}
                              time={event.time}
                              location={event.location}
                              status={event.status}
                              bookedCount={event.bookedCount}
                              maxBookings={event.maxBookings}
                              entryFee={event.entryFee}
                            />
                          </Link>
                          <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                              onClick={(e) => {
                                e.preventDefault()
                                handleToggleFavorite(event.id)
                              }}
                            >
                              <Heart className={`h-4 w-4 ${event.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                              <span className="sr-only">
                                {event.isFavorite ? "Remove from favorites" : "Add to favorites"}
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                              onClick={(e) => {
                                e.preventDefault()
                                handleSetReminder(event.id)
                              }}
                            >
                              <Bell className="h-4 w-4" />
                              <span className="sr-only">Set reminder</span>
                            </Button>
                          </div>
                          {event.tags && (
                            <div className="absolute bottom-14 left-2 flex flex-wrap gap-1">
                              {event.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Events</CardTitle>
                  <CardDescription>Events you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  {events.filter((e) => e.isFavorite).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Bookmark className="h-12 w-12 text-muted-foreground opacity-50" />
                      <p className="mt-4 text-center text-muted-foreground">You haven't saved any events yet.</p>
                      <p className="text-center text-sm text-muted-foreground mt-1">
                        Click the heart icon on any event to save it for later.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {events
                        .filter((e) => e.isFavorite)
                        .map((event) => (
                          <div key={event.id} className="relative group">
                            <Link href={`/user/events/${event.id}`}>
                              <EventCard
                                title={event.title}
                                subtitle={event.doctorName}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                status={event.status}
                                bookedCount={event.bookedCount}
                                maxBookings={event.maxBookings}
                                entryFee={event.entryFee}
                              />
                            </Link>
                            <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleToggleFavorite(event.id)
                                }}
                              >
                                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                <span className="sr-only">Remove from favorites</span>
                              </Button>
                            </div>
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


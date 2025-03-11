import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface EventCardProps {
  title: string
  subtitle?: string
  date: string
  time: string
  location: string
  status: string
  bookedCount?: number
  maxBookings?: number
  entryFee: number
}

export function EventCard({
  title,
  subtitle,
  date,
  time,
  location,
  status,
  bookedCount,
  maxBookings,
  entryFee,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </div>
          {bookedCount !== undefined && maxBookings !== undefined && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {bookedCount} of {maxBookings} spots booked
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
        <div className="flex items-center gap-2">
          {status === "upcoming" && <Badge>Upcoming</Badge>}
          {status === "full" && <Badge variant="destructive">Fully Booked</Badge>}
          {status === "completed" && <Badge variant="secondary">Completed</Badge>}
        </div>
        <div className="text-sm font-medium">${entryFee}</div>
      </CardFooter>
    </Card>
  )
}


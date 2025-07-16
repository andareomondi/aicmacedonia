"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase-client"

interface Event {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  category: string
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const today = new Date().toISOString().split("T")[0]

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", today) // Only get events from today onwards
        .order("event_date", { ascending: true })
        .limit(6)

      if (!error && data) {
        setEvents(data)
      }
      setLoading(false)
    }

    fetchUpcomingEvents()
  }, [])

  const calculateDaysRemaining = (eventDate: string) => {
    const today = new Date()
    const event = new Date(eventDate)
    const diffTime = event.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays > 0) return `${diffDays} days`
    return "Past"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-64">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50" id="events">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Upcoming Events
        </motion.h2>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500">Check back soon for new events and activities!</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => {
              const daysRemaining = calculateDaysRemaining(event.event_date)
              const isToday = daysRemaining === "Today"
              const isTomorrow = daysRemaining === "Tomorrow"

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`h-full hover:shadow-lg transition-all duration-300 ${
                      isToday ? "ring-2 ring-pink-500 shadow-lg" : ""
                    }`}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold line-clamp-2">{event.title}</h3>
                        <Badge
                          variant={isToday ? "default" : isTomorrow ? "secondary" : "outline"}
                          className={isToday ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white" : ""}
                        >
                          {daysRemaining}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-pink-500" />
                        {formatDate(event.event_date)}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        {event.location}
                      </div>

                      {event.category && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4 text-purple-500" />
                          {event.category}
                        </div>
                      )}

                      <p className="text-gray-600 line-clamp-3">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

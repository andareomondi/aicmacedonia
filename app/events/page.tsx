"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase-client"
import React, { useState } from "react"

const categoryColors = {
  Youth: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Worship: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Outreach: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Conference: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Fellowship: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Children: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
}

export default function EventsPage() {
  const supabase = createClient()

  const [events, setEvents] = useState([])
  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })
    if (error) {
      console.error("Error fetching events:", error)
      return []
    }
    return data
  }
  React.useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents()
      setEvents(fetchedEvents)
    }
    loadEvents()
  }, [])
  if (!events || events.length === 0) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">No upcoming events at the moment.</p>
      </div>
    )
  }
  if (events.length === 0) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 p-2"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Upcoming Events
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join us for these exciting upcoming events and be part of our growing church family.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${event.image}')` }} />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                        {event.category}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{event.description}</p>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-pink-500" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const events = [
  {
    id: 1,
    title: "Youth Fellowship",
    date: "Sat, 27 Jul 2025  2 PM",
    location: "Church Hall",
    description: "Interactive Bible study and fun activities for all youths.",
  },
  {
    id: 2,
    title: "Praise & Worship Night",
    date: "Fri, 02 Aug 2025  6 PM",
    location: "Main Sanctuary",
    description: "An evening of heartfelt praise and worship open to everyone.",
  },
  {
    id: 3,
    title: "Community Outreach",
    date: "Sat, 10 Aug 2025  9 AM",
    location: "Jamcity, Athiriver",
    description: "Join us as we serve the community with donations and prayer.",
  },
]

export function UpcomingEvents() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
      id="events"
    >
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 text-pink-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    {event.location}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

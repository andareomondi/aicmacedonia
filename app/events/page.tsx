"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Youth Fellowship",
    date: "2024-01-27",
    time: "2:00 PM - 5:00 PM",
    location: "Church Hall",
    description: "Interactive Bible study, games, and fellowship for all youth members. Come and bring a friend!",
    category: "Youth",
    image: "https://picsum.photos/400/300?random=100",
  },
  {
    id: 2,
    title: "Praise & Worship Night",
    date: "2024-02-02",
    time: "6:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    description:
      "An evening of heartfelt praise and worship featuring all our choirs. Open to everyone in the community.",
    category: "Worship",
    image: "https://picsum.photos/400/300?random=101",
  },
  {
    id: 3,
    title: "Community Outreach",
    date: "2024-02-10",
    time: "9:00 AM - 3:00 PM",
    location: "Jamcity, Athiriver",
    description: "Join us as we serve the community with food donations, medical checkups, and prayer ministry.",
    category: "Outreach",
    image: "https://picsum.photos/400/300?random=102",
  },
  {
    id: 4,
    title: "Women's Conference",
    date: "2024-02-17",
    time: "8:00 AM - 4:00 PM",
    location: "Main Sanctuary",
    description: "Annual women's conference focusing on 'Women of Purpose'. Registration required.",
    category: "Conference",
    image: "https://picsum.photos/400/300?random=103",
  },
  {
    id: 5,
    title: "Men's Breakfast",
    date: "2024-02-24",
    time: "7:00 AM - 10:00 AM",
    location: "Church Hall",
    description: "Monthly men's fellowship over breakfast. Topic: 'Leading with Integrity'",
    category: "Fellowship",
    image: "https://picsum.photos/400/300?random=104",
  },
  {
    id: 6,
    title: "Children's Fun Day",
    date: "2024-03-02",
    time: "10:00 AM - 4:00 PM",
    location: "Church Grounds",
    description: "A day of fun activities, games, and Bible stories for children aged 3-12 years.",
    category: "Children",
    image: "https://picsum.photos/400/300?random=105",
  },
]

const categoryColors = {
  Youth: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Worship: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Outreach: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Conference: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Fellowship: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Children: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
}

export default function EventsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
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

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { Calendar, MapPin } from "lucide-react"

interface Event {
  id: string
  title: string
  event_date: string
  location: string
}

export function TodayEventsMarquee() {
  const [todayEvents, setTodayEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchTodayEvents = async () => {
      const today = new Date().toISOString().split("T")[0]

      const { data, error } = await supabase
        .from("events")
        .select("id, title, event_date, location")
        .eq("event_date", today)
        .order("event_date", { ascending: true })

      if (!error && data) {
        setTodayEvents(data)
      }
    }

    fetchTodayEvents()
  }, [])

  if (todayEvents.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-lg font-semibold mx-8">🎉 TODAY'S EVENTS:</span>
        {todayEvents.map((event, index) => (
          <span key={event.id} className="mx-8 inline-flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="font-medium">{event.title}</span>
            <MapPin className="h-4 w-4 ml-4 mr-1" />
            <span>{event.location}</span>
            {index < todayEvents.length - 1 && <span className="mx-4">•</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

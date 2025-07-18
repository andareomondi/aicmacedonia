
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Calendar, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"
import Image from "next/image"

interface Choir {
  id: string
  name: string
  description: string
  leader_name: string
  leader_phone: string
  leader_image_url: string
  image_url: string
  youtube_videos: string[]
  meeting_day: string
  meeting_time: string
  is_active: boolean
  created_at: string
}

export function Choirs() {
  const [choirs, setChoirs] = useState<Choir[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChoirs()
  }, [])

  const fetchChoirs = async () => {
    try {
      const { data, error } = await supabase
        .from("choirs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (error) throw error
      setChoirs(data || [])
    } catch (error) {
      console.error("Error fetching choirs:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900" id="choirs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="choirs">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Choirs
        </motion.h2>

        {choirs.length === 0 ? (
          <div className="text-center py-16">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No active choirs at the moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {choirs.map((choir, idx) => (
              <motion.div
                key={choir.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <Link href={`/choirs/${choir.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      {choir.image_url ? (
                        <Image
                          src={choir.image_url || "/placeholder.svg"}
                          alt={choir.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
                          <Music className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90">
                          Active
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {choir.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{choir.description}</p>
                      </div>

                      <div className="space-y-2">
                        {choir.leader_name && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>Led by {choir.leader_name}</span>
                          </div>
                        )}

                        {choir.meeting_day && choir.meeting_time && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {choir.meeting_day} at {choir.meeting_time}
                            </span>
                          </div>
                        )}

                        {choir.youtube_videos && choir.youtube_videos.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Music className="h-4 w-4" />
                            <span>
                              {choir.youtube_videos.length} video{choir.youtube_videos.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-blue-50 group-hover:border-blue-200 bg-transparent"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


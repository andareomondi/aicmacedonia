"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Music, Users, Clock, Phone } from "lucide-react"
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
      <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Our Choirs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the beautiful voices that lift our spirits in worship and praise
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Our Choirs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the beautiful voices that lift our spirits in worship and praise
          </p>
        </motion.div>

        {choirs.length === 0 ? (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Choirs Available</h3>
            <p className="text-gray-500">Check back later for choir information.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {choirs.map((choir, index) => (
              <motion.div
                key={choir.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link href={`/choirs/${choir.id}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={choir.image_url || "/placeholder.jpg"}
                        alt={choir.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
                          <Music className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {choir.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{choir.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          Led by {choir.leader_name}
                        </div>
                        {choir.meeting_day && choir.meeting_time && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {choir.meeting_day}s at {choir.meeting_time}
                          </div>
                        )}
                        {choir.leader_phone && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-2" />
                            {choir.leader_phone}
                          </div>
                        )}
                      </div>

                      {choir.youtube_videos && choir.youtube_videos.length > 0 && (
                        <div className="mb-4">
                          <Badge variant="outline" className="text-xs">
                            {choir.youtube_videos.length} Video{choir.youtube_videos.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                      )}

                      <Button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white">
                        Learn More
                      </Button>
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

export default Choirs


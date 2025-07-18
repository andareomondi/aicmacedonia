"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Music, Users, Calendar, Phone, Play } from "lucide-react"
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

export default function ChoirDetailPage() {
  const [choir, setChoir] = useState<Choir | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter()
  const choirId = params.id as string

  useEffect(() => {
    fetchChoir()
  }, [choirId])

  const fetchChoir = async () => {
    try {
      const { data, error } = await supabase.from("choirs").select("*").eq("id", choirId).single()

      if (error) throw error

      if (!data) {
        setError("Choir not found")
        return
      }

      setChoir(data)
    } catch (error) {
      console.error("Error fetching choir:", error)
      setError("Failed to load choir details")
    } finally {
      setLoading(false)
    }
  }

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const getEmbedUrl = (url: string) => {
    const videoId = extractVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !choir) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Choir Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The choir you're looking for doesn't exist."}</p>
          <Link href="/choirs">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Choirs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/choirs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              {choir.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={choir.is_active ? "default" : "secondary"}>
                {choir.is_active ? "Active" : "Inactive"}
              </Badge>
              <span className="text-gray-500 text-sm">Established {new Date(choir.created_at).getFullYear()}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card>
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
                  {choir.image_url ? (
                    <Image src={choir.image_url || "/placeholder.svg"} alt={choir.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
                      <Music className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">About {choir.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{choir.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* YouTube Videos */}
            {choir.youtube_videos && choir.youtube_videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Videos ({choir.youtube_videos.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {choir.youtube_videos.map((videoUrl, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium text-lg">
                          {choir.name} - Performance {index + 1}
                        </h3>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={getEmbedUrl(videoUrl)}
                            title={`${choir.name} - Video ${index + 1}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leader Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Leadership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {choir.leader_image_url && (
                    <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden">
                      <Image
                        src={choir.leader_image_url || "/placeholder.svg"}
                        alt={choir.leader_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{choir.leader_name}</h3>
                    <p className="text-gray-600 text-sm">Choir Leader</p>
                    {choir.leader_phone && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{choir.leader_phone}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Meeting Schedule */}
            {(choir.meeting_day || choir.meeting_time) && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {choir.meeting_day && (
                        <div>
                          <span className="font-medium">Day:</span>
                          <span className="ml-2">{choir.meeting_day}</span>
                        </div>
                      )}
                      {choir.meeting_time && (
                        <div>
                          <span className="font-medium">Time:</span>
                          <span className="ml-2">{choir.meeting_time}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Interested in Joining?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact our choir leader to learn more about joining {choir.name}.
                  </p>
                  {choir.leader_phone && (
                    <Button className="w-full" asChild>
                      <a href={`tel:${choir.leader_phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call {choir.leader_name}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

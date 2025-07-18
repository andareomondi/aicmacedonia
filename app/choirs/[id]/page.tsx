"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Music, Users, Clock, Phone, Play } from "lucide-react"
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
      setChoir(data)
    } catch (error) {
      console.error("Error fetching choir:", error)
      router.push("/choirs")
    } finally {
      setLoading(false)
    }
  }

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const getVideoTitle = (url: string, index: number) => {
    // You could enhance this to fetch actual video titles from YouTube API
    return `Performance ${index + 1}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!choir) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Choir Not Found</h1>
          <Link href="/choirs">
            <Button>Back to Choirs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/choirs">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                {choir.name}
              </h1>
              <p className="text-gray-600 mt-2">Church Choir</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Choir Image */}
              <Card>
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={choir.image_url || "/placeholder.jpg"}
                    alt={choir.name}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
                      <Music className="h-3 w-3 mr-1" />
                      Active Choir
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About {choir.name}</h2>
                  <p className="text-gray-600 leading-relaxed">{choir.description}</p>
                </CardContent>
              </Card>

              {/* YouTube Videos */}
              {choir.youtube_videos && choir.youtube_videos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Performances
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {choir.youtube_videos.map((videoUrl, index) => {
                        const videoId = getYouTubeVideoId(videoUrl)
                        if (!videoId) return null

                        return (
                          <div key={index} className="space-y-2">
                            <h3 className="font-semibold text-lg">{getVideoTitle(videoUrl, index)}</h3>
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={`${choir.name} - Performance ${index + 1}`}
                                className="w-full h-full"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Leader Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Choir Leader
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={choir.leader_image_url || "/placeholder-user.jpg"}
                        alt={choir.leader_name}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{choir.leader_name}</h3>
                      <p className="text-gray-600">Choir Director</p>
                    </div>
                  </div>

                  {choir.leader_phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a href={`tel:${choir.leader_phone}`} className="text-blue-600 hover:underline">
                        {choir.leader_phone}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Meeting Schedule */}
              {choir.meeting_day && choir.meeting_time && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Day:</span>
                        <span className="font-semibold">{choir.meeting_day}s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-semibold">{choir.meeting_time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Get Involved</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Interested in joining {choir.name}? Contact our choir leader to learn more about auditions and
                    rehearsal schedules.
                  </p>
                  {choir.leader_phone && (
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${choir.leader_phone}`}>Call {choir.leader_name}</a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


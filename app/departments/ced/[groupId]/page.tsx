"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase-client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Users, Calendar, Music, BookOpen, Lightbulb, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CEDGroup {
  id: string
  name: string
  description: string | null
  leader_name: string | null
  leader_phone: string | null
  leader_email: string | null
  meeting_day: string | null
  group_song: string | null
  mission: string | null
  vision: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export default function CEDGroupPage() {
  const { groupId } = useParams()
  const [group, setGroup] = useState<CEDGroup | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGroup() {
      if (!groupId) return

      setLoading(true)
      setError(null)
      try {
        const supabase = createClient()

        // Decode the URL parameter and fetch by name instead of UUID
        const groupName = decodeURIComponent(groupId as string)

        const { data, error } = await supabase.from("ced_groups").select("*").eq("name", groupName).single()

        if (error) {
          throw error
        }
        setGroup(data)
      } catch (err: any) {
        console.error("Error fetching CED group:", err.message)
        setError("Failed to load group details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchGroup()
  }, [groupId])

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-gray-600">Loading group details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-red-500">
        <p className="text-xl font-semibold mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-gray-600">
        <p className="text-xl font-semibold mb-4">Group not found.</p>
        <Link href="/departments/ced">
          <Button>Back to CED Groups</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              {group.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {group.description || "A dedicated group within our Christian Education Department."}
            </p>
          </motion.div>

          {/* Group Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16 rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src={group.image_url || `https://picsum.photos/seed/${group.name}/800/600`}
              alt={`${group.name} Group`}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Leader Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full border-2 border-gradient-to-r from-pink-200 to-blue-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Users className="h-6 w-6 mr-3 text-blue-500" />
                    Group Leader
                  </h2>
                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="w-24 h-24 ring-4 ring-pink-200">
                      <AvatarImage
                        src={`https://picsum.photos/seed/${group.leader_name}/200/200`}
                        alt={group.leader_name || "Leader"}
                      />
                      <AvatarFallback className="text-xl bg-gradient-to-r from-pink-100 to-blue-100">
                        {group.leader_name
                          ? group.leader_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "GL"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{group.leader_name || "To be announced"}</h3>
                      <p className="text-pink-600 font-medium">CED Group Leader</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    {group.leader_phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-pink-500" />
                        <span>{group.leader_phone}</span>
                      </div>
                    )}
                    {group.leader_email && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-blue-500" />
                        <span>{group.leader_email}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Group Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="h-full border-2 border-gradient-to-r from-blue-200 to-pink-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <BookOpen className="h-6 w-6 mr-3 text-pink-500" />
                    Group Details
                  </h2>
                  <div className="space-y-6 text-gray-700">
                    {group.meeting_day && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-blue-500 mt-1" />
                        <div>
                          <span className="font-semibold block">Meeting Day:</span>
                          <span className="text-gray-600">{group.meeting_day}</span>
                        </div>
                      </div>
                    )}
                    {group.group_song && (
                      <div className="flex items-start">
                        <Music className="h-5 w-5 mr-3 text-pink-500 mt-1" />
                        <div>
                          <span className="font-semibold block">Group Song:</span>
                          <span className="text-gray-600 italic">"{group.group_song}"</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Mission and Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            {group.mission && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card className="h-full border-2 border-blue-200">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-600">
                      <BookOpen className="h-6 w-6 mr-3" />
                      Our Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{group.mission}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {group.vision && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Card className="h-full border-2 border-pink-200">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-pink-600">
                      <Lightbulb className="h-6 w-6 mr-3" />
                      Our Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{group.vision}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link href="/departments/ced">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-3"
              >
                Back to All CED Groups
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase, type CEDGroup } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Users, Calendar, Music, BookOpen, Lightbulb, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
        const { data, error } = await supabase
          .from("ced_groups")
          .select("*")
          .eq("id", groupId as string)
          .single()

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
              {group.description || "No description available."}
            </p>
          </motion.div>

          {/* Group Image */}
          {group.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-16 rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={group.image_url || "/placeholder.svg"}
                alt={`${group.name} Group`}
                className="w-full h-96 object-cover"
              />
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Leader Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full border-gradient">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Users className="h-6 w-6 mr-3 text-blue-500" />
                    Group Leader
                  </h2>
                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="w-24 h-24 ring-4 ring-gradient-to-r from-pink-200 to-blue-200">
                      <AvatarImage src={group.image_url || "/placeholder.svg"} alt={group.leader_name || "Leader"} />
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
                      <h3 className="text-xl font-semibold">{group.leader_name || "N/A"}</h3>
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
              <Card className="h-full border-gradient">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <BookOpen className="h-6 w-6 mr-3 text-pink-500" />
                    Group Details
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    {group.meeting_day && (
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                        <span className="font-semibold">Meeting Day:</span>
                        <span className="ml-2">{group.meeting_day}</span>
                      </div>
                    )}
                    {group.group_song && (
                      <div className="flex items-center">
                        <Music className="h-5 w-5 mr-3 text-pink-500" />
                        <span className="font-semibold">Group Song:</span>
                        <span className="ml-2 italic">"{group.group_song}"</span>
                      </div>
                    )}
                    {group.mission && (
                      <div>
                        <div className="flex items-center mb-2">
                          <BookOpen className="h-5 w-5 mr-3 text-blue-500" />
                          <span className="font-semibold">Mission:</span>
                        </div>
                        <p className="ml-8">{group.mission}</p>
                      </div>
                    )}
                    {group.vision && (
                      <div>
                        <div className="flex items-center mb-2">
                          <Lightbulb className="h-5 w-5 mr-3 text-pink-500" />
                          <span className="font-semibold">Vision:</span>
                        </div>
                        <p className="ml-8">{group.vision}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link href="/departments/ced">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Back to All CED Groups
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

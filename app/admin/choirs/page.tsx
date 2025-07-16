"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Music, User, Phone } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"

interface Choir {
  id: string
  name: string
  description: string
  leader_name: string
  leader_phone: string
  leader_image_url: string
  youtube_videos: string[]
  image_url: string
  created_at: string
}

export default function AdminChoirsPage() {
  const [choirs, setChoirs] = useState<Choir[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchChoirs()
  }, [])

  const fetchChoirs = async () => {
    try {
      const { data, error } = await supabase.from("choirs").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setChoirs(data || [])
    } catch (error) {
      console.error("Error fetching choirs:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteChoir = async (id: string) => {
    if (!confirm("Are you sure you want to delete this choir?")) return

    try {
      const { error } = await supabase.from("choirs").delete().eq("id", id)

      if (error) throw error

      setChoirs(choirs.filter((choir) => choir.id !== id))
    } catch (error) {
      console.error("Error deleting choir:", error)
    }
  }

  const filteredChoirs = choirs.filter(
    (choir) =>
      choir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      choir.leader_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Manage Choirs
            </h1>
            <p className="text-gray-600 mt-2">Add, edit, and manage church choirs</p>
          </div>
          <Link href="/admin/choirs/new">
            <Button className="bg-gradient-to-r from-pink-500 to-blue-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Choir
            </Button>
          </Link>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search choirs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Choirs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChoirs.map((choir, index) => (
            <motion.div
              key={choir.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={choir.image_url || `https://picsum.photos/seed/${choir.name}/400/300`}
                    alt={choir.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-orange-500">
                      <Music className="h-3 w-3 mr-1" />
                      Choir
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{choir.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{choir.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2 text-blue-500" />
                      {choir.leader_name}
                    </div>
                    {choir.leader_phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-green-500" />
                        {choir.leader_phone}
                      </div>
                    )}
                  </div>

                  {choir.youtube_videos && choir.youtube_videos.length > 0 && (
                    <div className="mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {choir.youtube_videos.length} Video{choir.youtube_videos.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link href={`/admin/choirs/edit/${choir.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => deleteChoir(choir.id)} className="flex-1">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredChoirs.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 text-lg">No choirs found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

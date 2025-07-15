"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Calendar, Clock, User } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import type { Sermon } from "@/lib/supabase"
import Link from "next/link"

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      const { data, error } = await supabase.from("sermons").select("*").order("date_preached", { ascending: false })

      if (error) throw error
      setSermons(data || [])
    } catch (error) {
      console.error("Error fetching sermons:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteSermon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sermon?")) return

    try {
      const { error } = await supabase.from("sermons").delete().eq("id", id)

      if (error) throw error

      setSermons(sermons.filter((sermon) => sermon.id !== id))
    } catch (error) {
      console.error("Error deleting sermon:", error)
    }
  }

  const filteredSermons = sermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.pastor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
              Manage Sermons
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Add, edit, and manage church sermons</p>
          </div>
          <Link href="/admin/sermons/new">
            <Button className="bg-gradient-to-r from-pink-500 to-blue-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Sermon
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
              placeholder="Search sermons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Sermons List */}
        <div className="grid gap-6">
          {filteredSermons.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    {/* Video Thumbnail */}
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={sermon.youtube_url}
                        title={sermon.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    {/* Sermon Details */}
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>

                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-blue-500" />
                          {sermon.pastor}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                          {new Date(sermon.date_preached).toLocaleDateString()}
                        </div>
                        {sermon.duration && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-blue-500" />
                            {sermon.duration}
                          </div>
                        )}
                      </div>

                      {sermon.category && (
                        <Badge variant="secondary" className="mb-2">
                          {sermon.category}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Link href={`/admin/sermons/edit/${sermon.id}`}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteSermon(sermon.id)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredSermons.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No sermons found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

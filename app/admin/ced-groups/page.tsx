"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Users, User, Phone, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"

interface CedGroup {
  id: string
  name: string
  description: string
  leader_name: string
  leader_phone: string
  leader_image_url: string
  meeting_day: string
  group_song: string
  mission: string
  vision: string
  image_url: string
  created_at: string
}

export default function AdminCedGroupsPage() {
  const [cedGroups, setCedGroups] = useState<CedGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchCedGroups()
  }, [])

  const fetchCedGroups = async () => {
    try {
      const { data, error } = await supabase.from("ced_groups").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setCedGroups(data || [])
    } catch (error) {
      console.error("Error fetching CED groups:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCedGroup = async (id: string) => {
    if (!confirm("Are you sure you want to delete this CED group?")) return

    try {
      const { error } = await supabase.from("ced_groups").delete().eq("id", id)

      if (error) throw error

      setCedGroups(cedGroups.filter((group) => group.id !== id))
    } catch (error) {
      console.error("Error deleting CED group:", error)
    }
  }

  const filteredGroups = cedGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.leader_name.toLowerCase().includes(searchTerm.toLowerCase()),
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
              Manage CED Groups
            </h1>
            <p className="text-gray-600 mt-2">Add, edit, and manage Christian Education Department groups</p>
          </div>
          <Link href="/admin/ced-groups/new">
            <Button className="bg-gradient-to-r from-pink-500 to-blue-500">
              <Plus className="h-4 w-4 mr-2" />
              Add CED Group
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
              placeholder="Search CED groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={group.image_url || `https://picsum.photos/seed/${group.name}/400/300`}
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-pink-500">
                      <Users className="h-3 w-3 mr-1" />
                      CED Group
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2 text-blue-500" />
                      {group.leader_name}
                    </div>
                    {group.leader_phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-green-500" />
                        {group.leader_phone}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      {group.meeting_day}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/admin/ced-groups/edit/${group.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => deleteCedGroup(group.id)} className="flex-1">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 text-lg">No CED groups found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

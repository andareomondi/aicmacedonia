"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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
}

export default function EditChoirPage() {
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader_name: "",
    leader_phone: "",
    leader_image_url: "",
    image_url: "",
    youtube_videos: [""],
    meeting_day: "",
    meeting_time: "",
    is_active: true,
  })
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const choirId = params.id as string

  useEffect(() => {
    checkAdminAccess()
    fetchChoir()
  }, [choirId])

  const checkAdminAccess = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const isAdmin = user.user_metadata?.role === "admin" || user.raw_user_meta_data?.role === "admin"

      if (!isAdmin) {
        router.push("/admin/unauthorized")
        return
      }
    } catch (error) {
      console.error("Error checking admin access:", error)
      router.push("/login")
    }
  }

  const fetchChoir = async () => {
    try {
      const { data, error } = await supabase.from("choirs").select("*").eq("id", choirId).single()

      if (error) throw error

      if (data) {
        setFormData({
          name: data.name || "",
          description: data.description || "",
          leader_name: data.leader_name || "",
          leader_phone: data.leader_phone || "",
          leader_image_url: data.leader_image_url || "",
          image_url: data.image_url || "",
          youtube_videos: data.youtube_videos && data.youtube_videos.length > 0 ? data.youtube_videos : [""],
          meeting_day: data.meeting_day || "",
          meeting_time: data.meeting_time || "",
          is_active: data.is_active ?? true,
        })
      }
    } catch (error) {
      console.error("Error fetching choir:", error)
      toast({
        title: "Error",
        description: "Failed to fetch choir details",
        variant: "destructive",
      })
      router.push("/admin/choirs")
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("choirs")
        .update({
          ...formData,
          youtube_videos: formData.youtube_videos.filter((url) => url.trim() !== ""),
        })
        .eq("id", choirId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Choir updated successfully!",
      })

      router.push("/admin/choirs")
    } catch (error) {
      console.error("Error updating choir:", error)
      toast({
        title: "Error",
        description: "Failed to update choir. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addVideoField = () => {
    setFormData({
      ...formData,
      youtube_videos: [...formData.youtube_videos, ""],
    })
  }

  const removeVideoField = (index: number) => {
    const newVideos = formData.youtube_videos.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      youtube_videos: newVideos.length > 0 ? newVideos : [""],
    })
  }

  const updateVideoField = (index: number, value: string) => {
    const newVideos = [...formData.youtube_videos]
    newVideos[index] = value
    setFormData({
      ...formData,
      youtube_videos: newVideos,
    })
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/choirs">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Edit Choir
              </h1>
              <p className="text-gray-600 mt-2">Update choir information</p>
            </div>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Choir Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Choir Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter choir name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter choir description"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leader_name">Leader Name</Label>
                    <Input
                      id="leader_name"
                      value={formData.leader_name}
                      onChange={(e) => setFormData({ ...formData, leader_name: e.target.value })}
                      placeholder="Enter leader name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leader_phone">Leader Phone</Label>
                    <Input
                      id="leader_phone"
                      value={formData.leader_phone}
                      onChange={(e) => setFormData({ ...formData, leader_phone: e.target.value })}
                      placeholder="Enter leader phone"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="meeting_day">Meeting Day</Label>
                    <Input
                      id="meeting_day"
                      value={formData.meeting_day}
                      onChange={(e) => setFormData({ ...formData, meeting_day: e.target.value })}
                      placeholder="e.g., Sunday"
                    />
                  </div>
                  <div>
                    <Label htmlFor="meeting_time">Meeting Time</Label>
                    <Input
                      id="meeting_time"
                      value={formData.meeting_time}
                      onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="leader_image_url">Leader Image URL</Label>
                  <Input
                    id="leader_image_url"
                    value={formData.leader_image_url}
                    onChange={(e) => setFormData({ ...formData, leader_image_url: e.target.value })}
                    placeholder="Enter leader image URL"
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">Choir Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Enter choir image URL"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>YouTube Videos</Label>
                    <Button type="button" onClick={addVideoField} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Video
                    </Button>
                  </div>
                  {formData.youtube_videos.map((video, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={video}
                        onChange={(e) => updateVideoField(index, e.target.value)}
                        placeholder="Enter YouTube video URL"
                        className="flex-1"
                      />
                      {formData.youtube_videos.length > 1 && (
                        <Button type="button" onClick={() => removeVideoField(index)} size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="is_active">Active Choir</Label>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Updating..." : "Update Choir"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/choirs">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

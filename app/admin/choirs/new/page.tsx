"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export default function NewChoirPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader_name: "",
    leader_phone: "",
    leader_image_url: "",
    image_url: "",
    youtube_videos: [""],
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("choirs").insert([
        {
          ...formData,
          youtube_videos: formData.youtube_videos.filter((url) => url.trim() !== ""),
        },
      ])

      if (error) throw error

      toast({
        title: "Success",
        description: "Choir created successfully!",
      })

      router.push("/admin/choirs")
    } catch (error) {
      console.error("Error creating choir:", error)
      toast({
        title: "Error",
        description: "Failed to create choir. Please try again.",
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
                Create Choir
              </h1>
              <p className="text-gray-600 mt-2">Add a new church choir</p>
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

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Creating..." : "Create Choir"}
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

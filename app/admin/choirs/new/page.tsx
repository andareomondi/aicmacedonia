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
import { ArrowLeft, Save, Plus, Trash2, Upload, X } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function NewChoirPage() {
  const [loading, setLoading] = useState(false)
  const [uploadingLeaderImage, setUploadingLeaderImage] = useState(false)
  const [uploadingChoirImage, setUploadingChoirImage] = useState(false)
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
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleImageUpload = async (file: File, type: "leader" | "choir") => {
    try {
      if (type === "leader") {
        setUploadingLeaderImage(true)
      } else {
        setUploadingChoirImage(true)
      }

      // Create a unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${type}-${Date.now()}.${fileExt}`
      const filePath = `choir-images/${fileName}`

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage.from("images").upload(filePath, file)

      if (error) throw error

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath)

      // Update form data
      if (type === "leader") {
        setFormData({ ...formData, leader_image_url: publicUrl })
      } else {
        setFormData({ ...formData, image_url: publicUrl })
      }

      toast({
        title: "Success",
        description: `${type === "leader" ? "Leader" : "Choir"} image uploaded successfully!`,
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      if (type === "leader") {
        setUploadingLeaderImage(false)
      } else {
        setUploadingChoirImage(false)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "leader" | "choir") => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select a valid image file.",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB.",
          variant: "destructive",
        })
        return
      }

      handleImageUpload(file, type)
    }
  }

  const removeImage = (type: "leader" | "choir") => {
    if (type === "leader") {
      setFormData({ ...formData, leader_image_url: "" })
    } else {
      setFormData({ ...formData, image_url: "" })
    }
  }

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

                {/* Leader Image Upload */}
                <div>
                  <Label>Leader Image</Label>
                  <div className="mt-2">
                    {formData.leader_image_url ? (
                      <div className="relative inline-block">
                        <Image
                          src={formData.leader_image_url || "/placeholder.svg"}
                          alt="Leader preview"
                          width={100}
                          height={100}
                          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage("leader")}
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "leader")}
                          className="hidden"
                          id="leader-image-upload"
                        />
                        <label htmlFor="leader-image-upload">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={uploadingLeaderImage}
                            className="cursor-pointer bg-transparent"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              {uploadingLeaderImage ? "Uploading..." : "Upload Leader Image"}
                            </span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Choir Image Upload */}
                <div>
                  <Label>Choir Image</Label>
                  <div className="mt-2">
                    {formData.image_url ? (
                      <div className="relative inline-block">
                        <Image
                          src={formData.image_url || "/placeholder.svg"}
                          alt="Choir preview"
                          width={200}
                          height={120}
                          className="w-48 h-28 rounded-lg object-cover border-2 border-gray-200"
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage("choir")}
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "choir")}
                          className="hidden"
                          id="choir-image-upload"
                        />
                        <label htmlFor="choir-image-upload">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={uploadingChoirImage}
                            className="cursor-pointer bg-transparent"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              {uploadingChoirImage ? "Uploading..." : "Upload Choir Image"}
                            </span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
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


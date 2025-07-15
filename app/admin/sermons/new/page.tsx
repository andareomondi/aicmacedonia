"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"

const sermonCategories = [
  "Faith",
  "Prayer",
  "Youth",
  "Love",
  "Hope",
  "Character",
  "Family",
  "Leadership",
  "Worship",
  "Service",
]

const pastors = ["Pastor Justus Mutuku", "Pastor Mary Mutuko", "Pastor Josiah Nicolahs"]

export default function NewSermonPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    pastor: "",
    youtube_url: "",
    duration: "",
    category: "",
    date_preached: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("sermons").insert([formData])

      if (error) throw error

      // Create notification
      await supabase.from("notifications").insert([
        {
          title: "New Sermon Added",
          message: `${formData.title} by ${formData.pastor} has been added`,
          type: "sermon",
        },
      ])

      router.push("/admin/sermons")
    } catch (error) {
      console.error("Error creating sermon:", error)
      alert("Error creating sermon. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/admin/sermons">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Add New Sermon
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Add a new sermon to the church website</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sermon Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Sermon Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter sermon title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pastor">Pastor *</Label>
                  <Select value={formData.pastor} onValueChange={(value) => handleChange("pastor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pastor" />
                    </SelectTrigger>
                    <SelectContent>
                      {pastors.map((pastor) => (
                        <SelectItem key={pastor} value={pastor}>
                          {pastor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube_url">YouTube URL *</Label>
                  <Input
                    id="youtube_url"
                    value={formData.youtube_url}
                    onChange={(e) => handleChange("youtube_url", e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Use the embed URL format: https://www.youtube.com/embed/VIDEO_ID
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      placeholder="e.g., 45 min"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {sermonCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_preached">Date Preached *</Label>
                  <Input
                    id="date_preached"
                    type="date"
                    value={formData.date_preached}
                    onChange={(e) => handleChange("date_preached", e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading} className="bg-gradient-to-r from-pink-500 to-blue-500">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Sermon"}
                  </Button>
                  <Link href="/admin/sermons">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

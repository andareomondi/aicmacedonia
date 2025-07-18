"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase-client"

interface Sermon {
  id: number
  title: string
  pastor: string
  youtube_url: string
  duration: string
  category: string
  date_preached: string
}

const pastors = ["Pastor Justus Mutuku", "Pastor Mary Mutuko", "Pastor Josiah Nicolahs"]

const categories = [
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

export default function EditSermonPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [date, setDate] = useState<Date>()
  const [sermon, setSermon] = useState<Sermon>({
    id: 0,
    title: "",
    pastor: "",
    youtube_url: "",
    duration: "",
    category: "",
    date_preached: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchSermon()
  }, [params.id])

  const fetchSermon = async () => {
    try {
      const { data, error } = await supabase.from("sermons").select("*").eq("id", params.id).single()

      if (error) throw error

      if (data) {
        setSermon(data)
        setDate(new Date(data.date_preached))
      }
    } catch (error) {
      console.error("Error fetching sermon:", error)
      toast({
        title: "Error",
        description: "Failed to load sermon data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sermon.title || !sermon.pastor || !sermon.youtube_url || !sermon.duration || !sermon.category || !date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setUpdating(true)

    try {
      const { error } = await supabase
        .from("sermons")
        .update({
          title: sermon.title,
          pastor: sermon.pastor,
          youtube_url: sermon.youtube_url,
          duration: sermon.duration,
          category: sermon.category,
          date_preached: date.toISOString().split("T")[0],
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      // Create notification
      await supabase.from("notifications").insert({
        title: "Sermon Updated",
        message: `The sermon "${sermon.title}" has been updated`,
        type: "info",
        created_at: new Date().toISOString(),
      })

      toast({
        title: "Success",
        description: "Sermon updated successfully",
      })

      router.push("/admin/sermons")
    } catch (error) {
      console.error("Error updating sermon:", error)
      toast({
        title: "Error",
        description: "Failed to update sermon",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Edit Sermon</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sermon Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={sermon.title}
                    onChange={(e) => setSermon({ ...sermon, title: e.target.value })}
                    placeholder="Enter sermon title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pastor">Pastor *</Label>
                  <Select value={sermon.pastor} onValueChange={(value) => setSermon({ ...sermon, pastor: value })}>
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
                    value={sermon.youtube_url}
                    onChange={(e) => setSermon({ ...sermon, youtube_url: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={sermon.duration}
                    onChange={(e) => setSermon({ ...sermon, duration: e.target.value })}
                    placeholder="e.g., 45 min"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={sermon.category} onValueChange={(value) => setSermon({ ...sermon, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Preached *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={updating}>
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Sermon"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


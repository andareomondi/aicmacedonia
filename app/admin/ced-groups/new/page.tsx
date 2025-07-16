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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function NewCedGroupPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leader_name: "",
    leader_phone: "",
    leader_image_url: "",
    meeting_day: "",
    group_song: "",
    mission: "",
    vision: "",
    image_url: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("ced_groups").insert([formData])

      if (error) throw error

      toast({
        title: "Success",
        description: "CED Group created successfully!",
      })

      router.push("/admin/ced-groups")
    } catch (error) {
      console.error("Error creating CED group:", error)
      toast({
        title: "Error",
        description: "Failed to create CED group. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/ced-groups">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Create CED Group
              </h1>
              <p className="text-gray-600 mt-2">Add a new Christian Education Department group</p>
            </div>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>CED Group Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter group name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter group description"
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
                  <Label htmlFor="meeting_day">Meeting Day</Label>
                  <Select
                    value={formData.meeting_day}
                    onValueChange={(value) => setFormData({ ...formData, meeting_day: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="group_song">Group Song</Label>
                  <Input
                    id="group_song"
                    value={formData.group_song}
                    onChange={(e) => setFormData({ ...formData, group_song: e.target.value })}
                    placeholder="Enter group song"
                  />
                </div>

                <div>
                  <Label htmlFor="mission">Mission</Label>
                  <Textarea
                    id="mission"
                    value={formData.mission}
                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                    placeholder="Enter group mission"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="vision">Vision</Label>
                  <Textarea
                    id="vision"
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    placeholder="Enter group vision"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">Group Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Enter group image URL"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Creating..." : "Create CED Group"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/ced-groups">Cancel</Link>
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

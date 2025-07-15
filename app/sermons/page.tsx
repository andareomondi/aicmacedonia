"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Play, Calendar, Clock, User } from "lucide-react"

const sermons = [
  {
    id: 1,
    title: "Walking in Faith",
    pastor: "Pastor Justus Mutuku",
    date: "2024-01-14",
    duration: "45 min",
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Faith",
  },
  {
    id: 2,
    title: "The Power of Prayer",
    pastor: "Pastor Mary Mutuko",
    date: "2024-01-07",
    duration: "38 min",
    youtube: "https://www.youtube.com/embed/oHg5SJYRHA0",
    category: "Prayer",
  },
  {
    id: 3,
    title: "Youth and Purpose",
    pastor: "Pastor Josiah Nicolahs",
    date: "2023-12-31",
    duration: "42 min",
    youtube: "https://www.youtube.com/embed/EE-xtCF3T94",
    category: "Youth",
  },
  {
    id: 4,
    title: "Love in Action",
    pastor: "Pastor Justus Mutuku",
    date: "2023-12-24",
    duration: "50 min",
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Love",
  },
  {
    id: 5,
    title: "Hope for Tomorrow",
    pastor: "Pastor Mary Mutuko",
    date: "2023-12-17",
    duration: "35 min",
    youtube: "https://www.youtube.com/embed/oHg5SJYRHA0",
    category: "Hope",
  },
  {
    id: 6,
    title: "Building Character",
    pastor: "Pastor Josiah Nicolahs",
    date: "2023-12-10",
    duration: "40 min",
    youtube: "https://www.youtube.com/embed/EE-xtCF3T94",
    category: "Character",
  },
]

export default function SermonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPastor, setSelectedPastor] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.pastor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPastor = selectedPastor === "all" || sermon.pastor === selectedPastor
    const matchesCategory = selectedCategory === "all" || sermon.category === selectedCategory

    return matchesSearch && matchesPastor && matchesCategory
  })

  const pastors = [...new Set(sermons.map((s) => s.pastor))]
  const categories = [...new Set(sermons.map((s) => s.category))]

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Sermons
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Listen to inspiring messages from our pastoral team and grow in your faith journey.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search sermons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedPastor} onValueChange={setSelectedPastor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Pastor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pastors</SelectItem>
                      {pastors.map((pastor) => (
                        <SelectItem key={pastor} value={pastor}>
                          {pastor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sermons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon, idx) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <iframe
                        src={sermon.youtube}
                        title={sermon.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    <h3 className="text-xl font-bold mb-3">{sermon.title}</h3>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        {sermon.pastor}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                        {new Date(sermon.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        {sermon.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-blue-100 text-pink-700 dark:text-pink-800 rounded-full text-xs font-medium">
                        {sermon.category}
                      </span>
                      <Button size="sm" className="bg-gradient-to-r from-pink-500 to-blue-500">
                        <Play className="h-4 w-4 mr-1" />
                        Watch
                      </Button>
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
      </section>
    </div>
  )
}

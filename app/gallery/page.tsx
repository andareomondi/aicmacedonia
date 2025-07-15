"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const galleryImages = [
  {
    id: 1,
    src: "https://picsum.photos/400/300?random=80",
    category: "Sunday Service",
    title: "Morning Worship",
    date: "2024-01-14",
  },
  {
    id: 2,
    src: "https://picsum.photos/400/300?random=81",
    category: "Youth Fellowship",
    title: "Youth Gathering",
    date: "2024-01-13",
  },
  {
    id: 3,
    src: "https://picsum.photos/400/300?random=82",
    category: "Baptism",
    title: "Water Baptism Ceremony",
    date: "2024-01-07",
  },
  {
    id: 4,
    src: "https://picsum.photos/400/300?random=83",
    category: "Community Outreach",
    title: "Feeding Program",
    date: "2024-01-06",
  },
  {
    id: 5,
    src: "https://picsum.photos/400/300?random=84",
    category: "CED Classes",
    title: "Children's Ministry",
    date: "2023-12-31",
  },
  {
    id: 6,
    src: "https://picsum.photos/400/300?random=85",
    category: "Choir Performance",
    title: "Agape Choir",
    date: "2023-12-24",
  },
  {
    id: 7,
    src: "https://picsum.photos/400/300?random=86",
    category: "Sunday Service",
    title: "Christmas Service",
    date: "2023-12-24",
  },
  {
    id: 8,
    src: "https://picsum.photos/400/300?random=87",
    category: "Wedding",
    title: "Church Wedding",
    date: "2023-12-17",
  },
  {
    id: 9,
    src: "https://picsum.photos/400/300?random=88",
    category: "Youth Fellowship",
    title: "Youth Conference",
    date: "2023-12-10",
  },
  {
    id: 10,
    src: "https://picsum.photos/400/300?random=89",
    category: "Community Outreach",
    title: "Medical Camp",
    date: "2023-12-03",
  },
  {
    id: 11,
    src: "https://picsum.photos/400/300?random=90",
    category: "CED Classes",
    title: "Battalion Training",
    date: "2023-11-26",
  },
  {
    id: 12,
    src: "https://picsum.photos/400/300?random=91",
    category: "Choir Performance",
    title: "Vision Choir",
    date: "2023-11-19",
  },
]

const categories = ["All", ...new Set(galleryImages.map((img) => img.category))]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Capturing precious moments of worship, fellowship, and community service at AIC Macedonia.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-to-r from-pink-500 to-blue-500" : ""}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Images Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, idx) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                      <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800" variant="secondary">
                        {image.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(image.date).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Modal for selected image */}
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                    <Badge variant="secondary">{selectedImage.category}</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const choirs = [
  {
    id: "agape",
    name: "Agape Choir",
    description: "A vibrant blend of youth and elders ministering in song and worship.",
    image: "/placeholder.svg?height=300&width=500",
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "youth",
    name: "Youth Choir",
    description: "Dynamic praise led by the church’s youth, inspiring all generations.",
    image: "/placeholder.svg?height=300&width=500",
    youtube: "https://www.youtube.com/embed/oHg5SJYRHA0",
  },
  {
    id: "vision",
    name: "Vision Choir",
    description: "The pioneering choir of AIC Macedonia, preserving our heritage of worship.",
    image: "/placeholder.svg?height=300&width=500",
    youtube: "https://www.youtube.com/embed/EE-xtCF3T94",
  },
]

export function Choirs() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="choirs">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Choirs
        </motion.h2>

        <div className="space-y-16">
          {choirs.map((choir, idx) => (
            <motion.div
              key={choir.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* photo */}
              <div
                className="h-64 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url('https://picsum.photos/500/300?random=${idx + 20}')` }}
              />

              {/* details */}
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold">{choir.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{choir.description}</p>
                  <div className="aspect-video">
                    <iframe
                      src={choir.youtube}
                      title={choir.name}
                      className="w-full h-full rounded-md"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

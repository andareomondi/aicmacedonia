"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

type Sponsor = {
  id: number
  name: string
  logo: string
  description: string
  website: string
}

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Grace Foundation",
    logo: "/placeholder.svg?height=120&width=200",
    description: "Supporting community development and education initiatives.",
    website: "https://gracefoundation.org",
  },
  {
    id: 2,
    name: "Hope Enterprises",
    logo: "/placeholder.svg?height=120&width=200",
    description: "Empowering local businesses and entrepreneurship.",
    website: "https://hopeenterprises.com",
  },
  {
    id: 3,
    name: "Unity Bank",
    logo: "/placeholder.svg?height=120&width=200",
    description: "Banking solutions for church and community growth.",
    website: "https://unitybank.co.ke",
  },
  {
    id: 4,
    name: "Blessed Mart",
    logo: "/placeholder.svg?height=120&width=200",
    description: "Your trusted partner for church supplies and equipment.",
    website: "https://blessedmart.com",
  },
]

export function SponsorshipSlideshow() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)

  /* Auto-advance */
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setCurrent((i) => (i + 1) % sponsors.length), 6000)
    return () => clearInterval(id)
  }, [playing])

  const next = () => setCurrent((i) => (i + 1) % sponsors.length)
  const prev = () => setCurrent((i) => (i - 1 + sponsors.length) % sponsors.length)
  const goto = (i: number) => setCurrent(i)
  const toggle = () => setPlaying((p) => !p)

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Our Sponsors & Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are grateful for the support of our sponsors who help us serve our community better.
          </p>
        </motion.div>

        {/* Slide */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center"
              >
                <div className="relative w-48 h-28 mb-6">
                  <Image
                    src={sponsors[current].logo || "/placeholder.svg"}
                    alt={sponsors[current].name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="text-3xl font-semibold mb-4">{sponsors[current].name}</h3>
                <p className="text-gray-600 mb-6">{sponsors[current].description}</p>

                <Button
                  onClick={() => window.open(sponsors[current].website, "_blank")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-md"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-md"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="absolute top-4 right-4 bg-white/40 hover:bg-white/60 backdrop-blur-md"
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center mt-6 gap-2">
            {sponsors.map((_, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                className={`h-3 w-3 rounded-full transition-all ${
                  i === current ? "w-6 bg-gradient-to-r from-pink-500 to-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

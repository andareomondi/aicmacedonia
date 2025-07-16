"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Slide {
  id: number
  title: string
  subtitle: string
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Support Our Mission",
    subtitle: "Every contribution makes a difference.",
    image: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: 2,
    title: "Partner with Us",
    subtitle: "Help us reach more souls in Macedonia.",
    image: "/placeholder.svg?height=800&width=1600",
  },
  {
    id: 3,
    title: "Build the Future",
    subtitle: "Your generosity fuels our ministries.",
    image: "/placeholder.svg?height=800&width=1600",
  },
]

export function SponsorshipSlideshow() {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const next = () => setIndex((i) => (i + 1) % slides.length)
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 7000)
    return () => clearTimeout(timeoutRef.current)
  }, [index])

  return (
    <div className="relative overflow-hidden h-[60vh]">
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[index].id}
          className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-black/50 p-8 rounded-lg text-center text-white backdrop-blur-sm max-w-md">
            <h2 className="text-3xl font-bold mb-2">{slides[index].title}</h2>
            <p className="mb-6">{slides[index].subtitle}</p>
            <Button variant="secondary" size="lg">
              Become a Sponsor
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <Button size="icon" variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2" onClick={prev}>
        <ChevronLeft />
      </Button>
      <Button size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2" onClick={next}>
        <ChevronRight />
      </Button>
    </div>
  )
}

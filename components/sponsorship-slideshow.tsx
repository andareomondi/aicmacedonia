"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const sponsors = [
  {
    id: 1,
    name: "Mavuno Church",
    description: "Our neighboring church and spiritual partner in ministry",
    image: "https://picsum.photos/seed/mavuno/400/200",
    website: "https://mavunochurch.org",
  },
  {
    id: 2,
    name: "AIC Kasina",
    description: "Our District Coordinating Church (DCC) providing guidance and support",
    image: "https://picsum.photos/seed/kasina/400/200",
    website: "#",
  },
  {
    id: 3,
    name: "Athiriver Community",
    description: "Local community partnerships for outreach and development",
    image: "https://picsum.photos/seed/community/400/200",
    website: "#",
  },
  {
    id: 4,
    name: "Youth Development Partners",
    description: "Supporting our youth programs and educational initiatives",
    image: "https://picsum.photos/seed/youth/400/200",
    website: "#",
  },
]

export function SponsorshipSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sponsors.length) % sponsors.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Partners & Connections
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden shadow-xl">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={sponsors[currentIndex].image || "/placeholder.svg"}
                      alt={sponsors[currentIndex].name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{sponsors[currentIndex].name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{sponsors[currentIndex].description}</p>
                    {sponsors[currentIndex].website !== "#" && (
                      <Button
                        asChild
                        className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 w-fit"
                      >
                        <a href={sponsors[currentIndex].website} target="_blank" rel="noopener noreferrer">
                          Learn More
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {sponsors.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-pink-500 to-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

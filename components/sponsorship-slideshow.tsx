"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Pause } from "lucide-react"

const sponsors = [
  {
    id: 1,
    name: "Mavuno Church",
    description:
      "Our neighboring church and spiritual partner in ministry, supporting our community outreach programs.",
    image: "https://picsum.photos/seed/mavuno/600/400",
    website: "https://mavunochurch.org",
    category: "Church Partner",
  },
  {
    id: 2,
    name: "AIC Kasina",
    description:
      "Our District Coordinating Church (DCC) providing spiritual guidance, leadership training, and administrative support.",
    image: "https://picsum.photos/seed/kasina/600/400",
    website: "#",
    category: "District Church",
  },
  {
    id: 3,
    name: "Athiriver Community",
    description:
      "Local community partnerships fostering development, education, and social welfare initiatives in our area.",
    image: "https://picsum.photos/seed/community/600/400",
    website: "#",
    category: "Community Partner",
  },
  {
    id: 4,
    name: "Youth Development Partners",
    description:
      "Supporting our youth programs, educational initiatives, and leadership development for the next generation.",
    image: "https://picsum.photos/seed/youth/600/400",
    website: "#",
    category: "Youth Support",
  },
]

export function SponsorshipSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sponsors.length) % sponsors.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Our Partners & Connections
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Building stronger communities through meaningful partnerships and collaborative ministry
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[500px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={sponsors[currentIndex].image || "/placeholder.svg"}
                      alt={sponsors[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-8">
                      <div className="max-w-2xl">
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm font-semibold rounded-full mb-4">
                            {sponsors[currentIndex].category}
                          </span>
                        </motion.div>

                        <motion.h3
                          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        >
                          {sponsors[currentIndex].name}
                        </motion.h3>

                        <motion.p
                          className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          {sponsors[currentIndex].description}
                        </motion.p>

                        {sponsors[currentIndex].website !== "#" && (
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                          >
                            <Button
                              asChild
                              size="lg"
                              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <a href={sponsors[currentIndex].website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5 mr-2" />
                                Learn More
                              </a>
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlayPause}
              className="bg-white/90 backdrop-blur-sm hover:bg-white border-white/20 shadow-lg"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {sponsors.map((_, index) => (
              <button
                key={index}
                className={`relative h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "w-12 bg-gradient-to-r from-pink-500 to-blue-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {index === currentIndex && isPlaying && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Side Navigation */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="bg-white/90 backdrop-blur-sm hover:bg-white border-white/20 shadow-lg"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-3">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="bg-white/90 backdrop-blur-sm hover:bg-white border-white/20 shadow-lg"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/placeholder.svg?height=1080&width=1920')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-200 to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to AIC Macedonia
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            African Inland Church - A place of worship, fellowship, and spiritual growth
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/sermons" className="flex items-center">
                Watch Sermons <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-pink-300 text-white hover:bg-pink-100 hover:text-pink-800 bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>

          {/* Church Info Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <MapPin className="h-8 w-8 text-pink-300 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-gray-200">Greatwall, Athiriver, Kenya</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Clock className="h-8 w-8 text-blue-300 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Service Times</h3>
              <p className="text-sm text-gray-200">Sunday 9:00 AM - 12:00 PM</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="h-8 w-8 text-pink-300 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-200">Join our growing family</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

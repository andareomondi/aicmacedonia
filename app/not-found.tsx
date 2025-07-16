"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft, Church } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                  <Church className="h-16 w-16 text-blue-600" />
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-red-100 rounded-full">
                  <Search className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Page Not Found</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                The page you're looking for seems to have wandered off. Don't worry, even the best shepherds sometimes
                lose a sheep! Let's get you back to familiar ground.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
              >
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" />
                  Return to Homepage
                </Link>
              </Button>

              <Button
                onClick={() => window.history.back()}
                variant="outline"
                size="lg"
                className="w-full bg-transparent border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-4">Popular pages you might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/about" className="text-blue-600 hover:text-blue-800 text-sm underline">
                  About Us
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/sermons" className="text-blue-600 hover:text-blue-800 text-sm underline">
                  Sermons
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/events" className="text-blue-600 hover:text-blue-800 text-sm underline">
                  Events
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/gallery" className="text-blue-600 hover:text-blue-800 text-sm underline">
                  Gallery
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

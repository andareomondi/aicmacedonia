"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home, AlertTriangle, Bug } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full">
                  <Bug className="h-16 w-16 text-red-600" />
                </div>
                <div className="absolute -top-2 -right-2 p-2 bg-yellow-100 rounded-full animate-pulse">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We encountered an unexpected error. Don't worry, our technical team has been notified and we're working
                to fix this issue.
              </p>

              {error.message && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 text-sm font-mono">{error.message}</p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <Button
                onClick={reset}
                size="lg"
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Again
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full bg-transparent border-gray-300 hover:bg-gray-50"
              >
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" />
                  Return to Homepage
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-xs text-gray-400 mb-2">Error ID: {error.digest || "Unknown"}</p>
              <p className="text-xs text-gray-400">If this problem persists, please contact our support team.</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

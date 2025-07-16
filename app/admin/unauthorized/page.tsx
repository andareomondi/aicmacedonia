"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Home, LogOut } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="p-4 bg-red-100 rounded-full">
                  <Shield className="h-12 w-12 text-red-600" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 bg-orange-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Access Denied
              </h1>
              <p className="text-gray-600 mb-2 text-lg">Administrator privileges required</p>
              <p className="text-gray-500 mb-8 text-sm">
                You don't have permission to access the admin panel. Please contact your system administrator if you
                believe this is an error.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Return to Homepage
                </Link>
              </Button>

              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full bg-transparent border-gray-300 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-xs text-gray-400">Need admin access? Contact the church leadership team.</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

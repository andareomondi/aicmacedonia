"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Heart } from "lucide-react"

export default function PastoralPage() {
  const leader = {
    name: "Peter Kilonzo",
    phone: "+254 712 000 222",
    email: "peter.kilonzo@aicmacedonia.org",
    image: "https://picsum.photos/200/200?random=60",
  }

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
              Pastoral Care Department
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Providing spiritual guidance, counselling, and prayer support for our church family throughout the week.
            </p>
          </motion.div>

          {/* Department Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div
              className="h-96 rounded-lg bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url('https://picsum.photos/800/400?random=61')` }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Leader Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-blue-200 dark:border-blue-800">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Department Leader</h2>

                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="w-24 h-24 ring-4 ring-blue-200">
                      <AvatarImage src={leader.image || "/placeholder.svg"} alt={leader.name} />
                      <AvatarFallback className="text-xl bg-gradient-to-r from-blue-100 to-pink-100">
                        {leader.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-bold">{leader.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">Pastoral Care Coordinator</p>

                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Phone className="h-4 w-4 mr-2 text-blue-500" />
                          {leader.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Mail className="h-4 w-4 mr-2 text-pink-500" />
                          {leader.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Department Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="border-pink-200 dark:border-pink-800 h-full">
                <CardContent className="p-8">
                  <Heart className="h-12 w-12 text-pink-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">Our Mission</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    To provide compassionate care, spiritual guidance, and emotional support to our church family during
                    times of joy, sorrow, and everything in between.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Our Services:</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Individual and family counselling</li>
                      <li>• Hospital and home visits</li>
                      <li>• Prayer and spiritual guidance</li>
                      <li>• Crisis intervention support</li>
                      <li>• Bereavement care</li>
                      <li>• Marriage and relationship counselling</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Caring for Our Community</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[62, 63, 64].map((num, idx) => (
                <div
                  key={num}
                  className="h-64 rounded-lg bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: `url('https://picsum.photos/400/300?random=${num}')` }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Heart } from "lucide-react"

export default function UsheringPage() {
  const leader = {
    name: "Grace Mwikali",
    phone: "+254 712 000 111",
    email: "grace.mwikali@aicmacedonia.org",
    image: "https://picsum.photos/200/200?random=50",
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Ushering Department
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Welcoming every soul with warmth and ensuring our worship services flow seamlessly from the door to the
              sanctuary.
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
              style={{ backgroundImage: `url('https://picsum.photos/800/400?random=51')` }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Leader Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-pink-200 dark:border-pink-800">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-pink-600 dark:text-pink-400">Department Leader</h2>

                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="w-24 h-24 ring-4 ring-pink-200">
                      <AvatarImage src={leader.image || "/placeholder.svg"} alt={leader.name} />
                      <AvatarFallback className="text-xl bg-gradient-to-r from-pink-100 to-blue-100">
                        {leader.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-bold">{leader.name}</h3>
                      <p className="text-pink-600 dark:text-pink-400 font-semibold mb-2">Head Usher</p>

                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Phone className="h-4 w-4 mr-2 text-pink-500" />
                          {leader.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
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
              <Card className="border-blue-200 dark:border-blue-800 h-full">
                <CardContent className="p-8">
                  <Heart className="h-12 w-12 text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Our Mission</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    To create a welcoming atmosphere where every person feels valued and loved from the moment they step
                    through our doors. We serve as the first point of contact, ensuring that worship begins with warmth
                    and hospitality.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Our Responsibilities:</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Greeting and welcoming congregants</li>
                      <li>• Assisting with seating arrangements</li>
                      <li>• Collecting offerings with reverence</li>
                      <li>• Maintaining order during services</li>
                      <li>• Helping with special events</li>
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
            <h2 className="text-3xl font-bold text-center mb-8">Our Team in Action</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[52, 53, 54].map((num, idx) => (
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

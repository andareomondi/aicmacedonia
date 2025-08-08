"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Users } from "lucide-react"

const leaders = [
  {
    name: "Pastor Justus Mutuku",
    role: "Lead Pastor",
    image: "/placeholder.svg?height=200&width=200",
    phone: "+254 700 000 001",
    email: "justus.mutuku@aicmacedonia.org",
    description:
      "Leading our congregation with wisdom and compassion, Pastor Justus has been instrumental in our church's growth and spiritual development.",
  },
  {
    name: "Pastor Mary Mutuku",
    role: "Assistant Pastor",
    image: "/placeholder.svg?height=200&width=200",
    phone: "+254 700 000 002",
    email: "mary.mutuko@aicmacedonia.org",
    description:
      "Supporting our ministry with dedication and care, Pastor Mary focuses on pastoral care and women's ministry.",
  },
  {
    name: "Pastor Josiah Nicolahs",
    role: "Youth Pastor",
    image: "/placeholder.svg?height=200&width=200",
    phone: "+254 700 000 003",
    email: "josiah.nicolahs@aicmacedonia.org",
    description:
      "Passionate about youth ministry, Pastor Josiah leads our young people with energy and biblical wisdom.",
  },
]

export function Leadership() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Our Leadership
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated leaders who guide our church family with wisdom, love, and biblical truth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-gradient">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-gradient-to-r from-pink-200 to-blue-200">
                    <AvatarImage src={leader.image || "/placeholder.svg"} alt={leader.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-pink-100 to-blue-100">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">{leader.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">{leader.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="h-4 w-4 mr-2 text-pink-500" />
                      {leader.phone}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
                      <Mail className="h-4 w-4 mr-2 text-blue-500" />
                      {leader.email}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Council of Elders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto border-gradient">
            <CardContent className="p-8">
              <Users className="h-16 w-16 mx-auto mb-4 text-gradient" />
              <h3 className="text-2xl font-bold mb-4">Council of Elders</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our church is guided by a dedicated council of elders who provide wisdom, spiritual oversight, and
                support to our pastoral team. They work together to ensure our church remains faithful to biblical
                principles while serving our community with excellence.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone } from "lucide-react"
import Link from "next/link"

const departments = [
  {
    id: "ushering",
    name: "Ushering Department",
    leader: { name: "Grace Mwikali", phone: "+254 712 000 111", img: "/placeholder.svg?height=120&width=120" },
    description: "Welcoming congregants with warmth and ensuring services run smoothly from the door to the sanctuary.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "pastoral",
    name: "Pastoral Care",
    leader: { name: "Peter Kilonzo", phone: "+254 712 000 222", img: "/placeholder.svg?height=120&width=120" },
    description:
      "Providing spiritual guidance, counselling and prayer support for the church family throughout the week.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "ced",
    name: "Christian Education Dept. (CED)",
    leader: { name: "Rose Ndunge", phone: "+254 712 000 333", img: "/placeholder.svg?height=120&width=120" },
    description:
      "Discipling all age-groups through Bible study, battalion & cadet scouts, youth, Ushirika wa Wake, Men communion and Praise & Worship.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export function Departments() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-800 dark:to-gray-900"
      id="departments"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Departments
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <Link href={`/departments/${dept.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col gap-5">
                    {/* banner / group photo */}
                    <div
                      className="h-48 w-full rounded-md bg-cover bg-center"
                      style={{ backgroundImage: `url('https://picsum.photos/500/300?random=${idx + 1}')` }}
                    />
                    <h3 className="text-2xl font-semibold">{dept.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 flex-1">{dept.description}</p>

                    {/* leader */}
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={`https://picsum.photos/120/120?random=${idx + 10}`} alt={dept.leader.name} />
                        <AvatarFallback>
                          {dept.leader.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{dept.leader.name}</p>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Phone className="h-3 w-3" />
                          <span>{dept.leader.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

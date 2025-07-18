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

const cedGroups = [
  {
    name: "Battalion",
    description: "Church scouts program for boys - building character and faith",
    href: "/departments/ced/Battalion",
    image: "https://picsum.photos/400/250?random=1",
  },
  {
    name: "Cadet",
    description: "Church scouts program for girls - nurturing leadership and spirituality",
    href: "/departments/ced/Cadet",
    image: "https://picsum.photos/400/250?random=2",
  },
  {
    name: "Youth",
    description: "Programs for senior and junior teens - growing in faith together",
    href: "/departments/ced/Youth",
    image: "https://picsum.photos/400/250?random=3",
  },
  {
    name: "Ushirika wa Wake",
    description: "Ladies communion - fellowship and spiritual growth for women",
    href: "/departments/ced/Ushirika wa Wake",
    image: "https://picsum.photos/400/250?random=4",
  },
  {
    name: "Men Communion",
    description: "Fellowship and spiritual development for men of the church",
    href: "/departments/ced/Men Communion",
    image: "https://picsum.photos/400/250?random=5",
  }
]

export function Departments() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-pink-50" id="departments">
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

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 mb-16">
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
                    <p className="text-gray-600 flex-1">{dept.description}</p>

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
                        <div className="flex items-center gap-1 text-gray-500">
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

        {/* CED Groups Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-4 text-gray-800">CED Groups</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our Christian Education Department includes various groups for different age groups and interests
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cedGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={group.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border hover:border-blue-200">
                  <CardContent className="p-0">
                    <div
                      className="h-40 w-full bg-cover bg-center rounded-t-lg"
                      style={{ backgroundImage: `url('${group.image}')` }}
                    />
                    <div className="p-6">
                      <h4 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                        {group.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{group.description}</p>
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

"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Users, Calendar, Music } from "lucide-react"
import Link from "next/link"

const cedGroups = [
  {
    id: "battalion",
    name: "Battalion",
    description: "Church scouts for boys - building character, leadership, and faith",
    leader: "Samuel Kioko",
    meetingDay: "Sunday 1:00 PM",
    song: "Onward Christian Soldiers",
    mission: "To raise godly young men with strong character and leadership skills",
    vision: "Disciplined boys who will become tomorrow's church leaders",
    image: "https://picsum.photos/400/300?random=70",
  },
  {
    id: "cadet",
    name: "Cadet",
    description: "Church scouts for girls - nurturing faith, grace, and leadership",
    leader: "Faith Wanjiku",
    meetingDay: "Sunday 1:00 PM",
    song: "I Am a C-H-R-I-S-T-I-A-N",
    mission: "To nurture young ladies in faith, character, and Christian values",
    vision: "Godly young women who will impact their generation",
    image: "https://picsum.photos/400/300?random=71",
  },
  {
    id: "youth",
    name: "Youth CED",
    description: "For senior and junior teens - growing in faith together",
    leader: "David Mwangi",
    meetingDay: "Sunday 1:00 PM",
    song: "Here I Am to Worship",
    mission: "To disciple youth in biblical truth and Christian living",
    vision: "Young people passionate about God and His kingdom",
    image: "https://picsum.photos/400/300?random=72",
  },
  {
    id: "ushirika",
    name: "Ushirika wa Wake",
    description: "Ladies communion - fellowship and spiritual growth for women",
    leader: "Margaret Nduta",
    meetingDay: "Sunday 1:00 PM",
    song: "Blessed Assurance",
    mission: "To empower women in faith, fellowship, and service",
    vision: "Women of God making a difference in families and community",
    image: "https://picsum.photos/400/300?random=73",
  },
  {
    id: "men",
    name: "Men Communion",
    description: "Brotherhood in Christ - strengthening men in faith and purpose",
    leader: "John Mutiso",
    meetingDay: "Sunday 1:00 PM",
    song: "Stand Up, Stand Up for Jesus",
    mission: "To build strong Christian men who lead by example",
    vision: "Men of integrity who honor God in all aspects of life",
    image: "https://picsum.photos/400/300?random=74",
  },
  {
    id: "praise",
    name: "Praise & Worship",
    description: "Leading the congregation in heartfelt worship and praise",
    leader: "Grace Muthoni",
    meetingDay: "Sunday 1:00 PM",
    song: "How Great Thou Art",
    mission: "To lead God's people into His presence through worship",
    vision: "A worshipping community that experiences God's glory",
    image: "https://picsum.photos/400/300?random=75",
  },
]

export default function CEDPage() {
  const departmentLeader = {
    name: "Rose Ndunge",
    phone: "+254 712 000 333",
    email: "rose.ndunge@aicmacedonia.org",
    image: "https://picsum.photos/200/200?random=65",
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
              Christian Education Department (CED)
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discipling all age groups through Bible study, character building, and spiritual formation.
            </p>
          </motion.div>

          {/* Department Leader */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <Card className="border-gradient">
              <CardContent className="p-8 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-gradient-to-r from-pink-200 to-blue-200">
                  <AvatarImage src={departmentLeader.image || "/placeholder.svg"} alt={departmentLeader.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-pink-100 to-blue-100">
                    {departmentLeader.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-2xl font-bold mb-2">{departmentLeader.name}</h2>
                <p className="text-pink-600 dark:text-pink-400 font-semibold mb-4">CED Department Leader</p>

                <div className="flex justify-center space-x-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 mr-2 text-pink-500" />
                    {departmentLeader.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    {departmentLeader.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CED Groups */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cedGroups.map((group, idx) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
              >
                <Link href={`/departments/ced/${group.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div
                        className="h-48 rounded-lg bg-cover bg-center mb-4"
                        style={{ backgroundImage: `url('${group.image}')` }}
                      />

                      <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{group.description}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-pink-500" />
                          <span className="font-medium">Leader:</span>
                          <span className="ml-1">{group.leader}</span>
                        </div>

                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-medium">Meets:</span>
                          <span className="ml-1">{group.meetingDay}</span>
                        </div>

                        <div className="flex items-center">
                          <Music className="h-4 w-4 mr-2 text-pink-500" />
                          <span className="font-medium">Song:</span>
                          <span className="ml-1 italic">"{group.song}"</span>
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
    </div>
  )
}

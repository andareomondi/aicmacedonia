"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, ImageIcon, Users, Shield } from "lucide-react"
import SignOutButton from "./sign-out-button"

interface Props {
  userEmail: string
  stats: {
    sermons: number
    events: number
    gallery: number
    totalMembers: number
    adminUsers: number
  }
}

export default function AdminDashboardShell({ userEmail, stats }: Props) {
  const dashboardCards = [
    {
      title: "Sermons",
      count: stats.sermons,
      icon: FileText,
      color: "bg-blue-500",
      href: "/admin/sermons",
    },
    {
      title: "Events",
      count: stats.events,
      icon: Calendar,
      color: "bg-green-500",
      href: "/admin/events",
    },
    {
      title: "Gallery",
      count: stats.gallery,
      icon: ImageIcon,
      color: "bg-purple-500",
      href: "/admin/gallery",
    },
    {
      title: "Total Members",
      count: stats.totalMembers,
      icon: Users,
      color: "bg-indigo-500",
      href: "/admin/users",
    },
    {
      title: "Admin Users",
      count: stats.adminUsers,
      icon: Shield,
      color: "bg-gray-500",
      href: "/admin/users?filter=admin",
    },
  ]

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {userEmail}</p>
          </div>
          <SignOutButton />
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={card.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{card.title}</p>
                      <p className="text-3xl font-bold">{card.count}</p>
                    </div>
                    <div className={`p-3 rounded-full ${card.color}`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

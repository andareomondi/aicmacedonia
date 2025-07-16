"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Users, Shield, FileText, Calendar, ImageIcon, GroupIcon, Music, Bell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import SignOutButton from "./sign-out-button"

interface Stats {
  sermons: number
  events: number
  gallery: number
  cedGroups: number
  choirs: number
  notifications: number
  totalMembers: number
  adminUsers: number
}
export default function AdminDashboardShell({
  userEmail,
  stats,
}: {
  userEmail: string
  stats: Stats
}) {
  const cards = [
    { title: "Sermons", count: stats.sermons, icon: FileText, href: "/admin/sermons" },
    { title: "Events", count: stats.events, icon: Calendar, href: "/admin/events" },
    { title: "Gallery", count: stats.gallery, icon: ImageIcon, href: "/admin/gallery" },
    { title: "CED Groups", count: stats.cedGroups, icon: GroupIcon, href: "/admin/ced-groups" },
    { title: "Choirs", count: stats.choirs, icon: Music, href: "/admin/choirs" },
    { title: "Notifications", count: stats.notifications, icon: Bell, href: "/admin/notifications" },
    { title: "Total Members", count: stats.totalMembers, icon: Users, href: "/admin/users" },
    { title: "Admin Users", count: stats.adminUsers, icon: Shield, href: "/admin/users?role=admin" },
  ]

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {userEmail}</p>
          </div>
          <SignOutButton />
        </motion.div>

        {/* stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={c.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{c.title}</p>
                      <p className="text-3xl font-bold">{c.count}</p>
                    </div>
                    <c.icon className="h-6 w-6 text-primary" />
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

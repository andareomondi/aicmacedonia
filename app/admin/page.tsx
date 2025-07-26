"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Bell, Music, Calendar, Group, ImageIcon, BookOpen, Users
} from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import AdminDashboardShell from "@/components/admin-dashboard-shell"
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DashboardStats {
  sermons: number
  events: number
  gallery: number
  cedGroups: number
  choirs: number
  notifications: number
  totalMembers: number
  adminUsers: number
}

export const dynamic = "force-dynamic"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          return router.push("/login")
        }

        const role = user.user_metadata?.role ?? user.raw_user_meta_data?.role
        if (role !== "admin") {
          return router.push("/admin/unauthorized")
        }

        setUser(user)

        const [sermons, events, gallery, cedGroups, choirs, notifications] = await Promise.all([
          supabase.from("sermons").select("id", { count: "exact" }),
          supabase.from("events").select("id", { count: "exact" }),
          supabase.from("gallery").select("id", { count: "exact" }),
          supabase.from("ced_groups").select("id", { count: "exact" }),
          supabase.from("choirs").select("id", { count: "exact" }),
          supabase.from("notifications").select("id", { count: "exact" }),
        ])

        const { data: usersList } = await supabase.auth.admin.listUsers()
        const users = usersList?.users ?? []
        const totalMembers = users.length
        const adminUsers = users.filter(
          (u) =>
            u.user_metadata?.role === "admin" ||
            u.raw_user_meta_data?.role === "admin"
        ).length

        setStats({
          sermons: sermons.count ?? 0,
          events: events.count ?? 0,
          gallery: gallery.count ?? 0,
          cedGroups: cedGroups.count ?? 0,
          choirs: choirs.count ?? 0,
          notifications: notifications.count ?? 0,
          totalMembers,
          adminUsers,
        })
      } catch (error) {
        console.error("Error loading dashboard:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const adminSections = [
    { title: "Notifications", description: "Manage church announcements and alerts.", icon: <Bell className="h-6 w-6 text-blue-500" />, href: "/admin/notifications" },
    { title: "Choirs", description: "Oversee choir groups, members, and schedules.", icon: <Music className="h-6 w-6 text-green-500" />, href: "/admin/choirs" },
    { title: "Events", description: "Handle event listings, dates, and details.", icon: <Calendar className="h-6 w-6 text-purple-500" />, href: "/admin/events" },
    { title: "CED Groups", description: "Manage Christian Education Department groups.", icon: <Group className="h-6 w-6 text-yellow-500" />, href: "/admin/ced-groups" },
    { title: "Gallery", description: "Upload and manage church photos and videos.", icon: <ImageIcon className="h-6 w-6 text-red-500" />, href: "/admin/gallery" },
    { title: "Sermons", description: "Manage sermon audio, video, and notes.", icon: <BookOpen className="h-6 w-6 text-indigo-500" />, href: "/admin/sermons" },
  ]

  if (loading || !stats || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AdminDashboardShell
      userEmail={user.email}
      stats={stats}
    >
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
              <p className="text-gray-600 mt-2">Welcome back, {user.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </motion.div>



          {/* Admin Sections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminSections.map((section) => (
                <Card key={section.title} className="flex flex-col">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    {section.icon}
                    <CardTitle className="text-xl font-semibold">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{section.description}</p>
                    <Button asChild className="w-full">
                      <Link href={section.href}>Manage {section.title}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminDashboardShell>
  )
}

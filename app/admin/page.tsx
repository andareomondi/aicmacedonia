"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, Calendar, ImageIcon, Music, Plus, Bell } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"

interface DashboardStats {
  sermons: number
  events: number
  gallery: number
  cedGroups: number
  choirs: number
  notifications: number
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    sermons: 0,
    events: 0,
    gallery: 0,
    cedGroups: 0,
    choirs: 0,
    notifications: 0,
  })
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchStats()
  }, [])

  const checkUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      // Check if user has admin role
      const isAdmin = user.user_metadata?.role === "admin" || user.raw_user_meta_data?.role === "admin"

      if (!isAdmin) {
        router.push("/")
        return
      }

      setUser(user)
    } catch (error) {
      console.error("Error checking user:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const [sermons, events, gallery, cedGroups, choirs, notifications] = await Promise.all([
        supabase.from("sermons").select("id", { count: "exact" }),
        supabase.from("events").select("id", { count: "exact" }),
        supabase.from("gallery").select("id", { count: "exact" }),
        supabase.from("ced_groups").select("id", { count: "exact" }),
        supabase.from("choirs").select("id", { count: "exact" }),
        supabase.from("notifications").select("id", { count: "exact" }),
      ])

      setStats({
        sermons: sermons.count || 0,
        events: events.count || 0,
        gallery: gallery.count || 0,
        cedGroups: cedGroups.count || 0,
        choirs: choirs.count || 0,
        notifications: notifications.count || 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
      title: "CED Groups",
      count: stats.cedGroups,
      icon: Users,
      color: "bg-pink-500",
      href: "/admin/ced-groups",
    },
    {
      title: "Choirs",
      count: stats.choirs,
      icon: Music,
      color: "bg-orange-500",
      href: "/admin/choirs",
    },
    {
      title: "Notifications",
      count: stats.notifications,
      icon: Bell,
      color: "bg-red-500",
      href: "/admin/notifications",
    },
  ]

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
            <p className="text-gray-600 dark:text-gray-300 mt-2">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                        <p className="text-3xl font-bold">{card.count}</p>
                      </div>
                      <div className={`p-3 rounded-full ${card.color}`}>
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Link href="/admin/sermons/new">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sermon
                  </Button>
                </Link>
                <Link href="/admin/events/new">
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </Link>
                <Link href="/admin/gallery/new">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </Link>
                <Link href="/admin/ced-groups/new">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add CED Group
                  </Button>
                </Link>
                <Link href="/admin/choirs/new">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Choir
                  </Button>
                </Link>
                <Link href="/admin/notifications/new">
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Notification
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

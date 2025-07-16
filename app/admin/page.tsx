"use client"

import Link from "next/link"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminDashboardShell from "@/components/admin-dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Bell, Music, Calendar, Group, ImageIcon, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

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

export default async function AdminDashboardPage() {
  const cookieStore = cookies()
  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
      },
    },
  )

  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user metadata to check for admin role
  const { data: userMetadata, error: metadataError } = await supabaseClient
    .from("users") // Assuming you have a 'users' table storing user metadata
    .select("user_metadata")
    .eq("id", user.id)
    .single()

  if (metadataError || userMetadata?.user_metadata?.role !== "admin") {
    redirect("/admin/unauthorized")
  }

  // Fetch total registered members
  const { count: totalMembers, error: membersError } = await supabaseClient
    .from("users")
    .select("*", { count: "exact" })

  // Fetch total admin users
  const { data: adminUsersData, error: adminError } = await supabaseClient
    .from("users")
    .select("user_metadata")
    .filter("user_metadata->>role", "eq", "admin")

  const totalAdminUsers = adminUsersData?.length || 0

  const adminSections = [
    {
      title: "Notifications",
      description: "Manage church announcements and alerts.",
      icon: <Bell className="h-6 w-6 text-blue-500" />,
      href: "/admin/notifications",
    },
    {
      title: "Choirs",
      description: "Oversee choir groups, members, and schedules.",
      icon: <Music className="h-6 w-6 text-green-500" />,
      href: "/admin/choirs",
    },
    {
      title: "Events",
      description: "Handle event listings, dates, and details.",
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      href: "/admin/events",
    },
    {
      title: "CED Groups",
      description: "Manage Christian Education Department groups.",
      icon: <Group className="h-6 w-6 text-yellow-500" />,
      href: "/admin/ced-groups",
    },
    {
      title: "Gallery",
      description: "Upload and manage church photos and videos.",
      icon: <ImageIcon className="h-6 w-6 text-red-500" />,
      href: "/admin/gallery",
    },
    {
      title: "Sermons",
      description: "Manage sermon audio, video, and notes.",
      icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
      href: "/admin/sermons",
    },
  ]

  const [stats, setStats] = useState<DashboardStats>({
    sermons: 0,
    events: 0,
    gallery: 0,
    cedGroups: 0,
    choirs: 0,
    notifications: 0,
    totalMembers: totalMembers ?? 0,
    adminUsers: totalAdminUsers,
  })

  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userClient, setUserClient] = useState<any>(null)

  useEffect(() => {
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
          router.push("/admin/unauthorized")
          return
        }

        setUserClient(user)
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
          totalMembers: totalMembers ?? 0,
          adminUsers: totalAdminUsers,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    checkUser()
    fetchStats()
  }, [])

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

  return (
    <AdminDashboardShell
      userEmail={userClient?.email ?? ""}
      stats={{
        sermons: stats.sermons,
        events: stats.events,
        gallery: stats.gallery,
        totalMembers: stats.totalMembers,
        adminUsers: stats.adminUsers,
      }}
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
              <p className="text-gray-600 mt-2">Welcome back, {userClient?.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/admin/users" passHref>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground">Click to view all users</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/users?role=admin" passHref>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.adminUsers}</div>
                  <p className="text-xs text-muted-foreground">Click to view admin users</p>
                </CardContent>
              </Card>
            </Link>

            {/* Add more summary cards here if needed */}
          </div>

          {/* Quick Actions */}
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

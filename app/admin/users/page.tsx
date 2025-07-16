"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import UsersTable from "./users-table" // Client component for search/filter

interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  user_metadata: any
  raw_user_meta_data: any
}

export default async function AdminUsersPage({ searchParams }: { searchParams: { role?: string; search?: string } }) {
  const cookieStore = cookies()
  const supabase = createServerClient(
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
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user metadata to check for admin role
  const { data: userMetadata, error: metadataError } = await supabase
    .from("users") // Assuming you have a 'users' table storing user metadata
    .select("user_metadata")
    .eq("id", user.id)
    .single()

  if (metadataError || userMetadata?.user_metadata?.role !== "admin") {
    redirect("/admin/unauthorized")
  }

  const { data: users, error } = await supabase.from("users").select("*")

  if (error) {
    console.error("Error fetching users:", error)
    return <div className="container mx-auto px-4 py-8 text-red-500">Error loading users.</div>
  }

  const initialUsers = users || []

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-gray-600 mt-2">Manage registered users and their roles</p>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>All Registered Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading user table...</div>}>
                <UsersTable initialUsers={initialUsers} />
              </Suspense>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

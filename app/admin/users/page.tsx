/**  SERVER COMPONENT  */
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import UsersManagementShell from "@/components/users-management-shell"
import type { Database } from "@/types_db"

export const dynamic = "force-dynamic"

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: { role?: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  if (user.user_metadata?.role !== "admin" && user.raw_user_meta_data?.role !== "admin") redirect("/admin/unauthorized")

  try {
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) {
      console.error("Error fetching users:", error)
      return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Error Loading Users</h1>
              <p className="text-muted-foreground">Unable to fetch user data. Please try again later.</p>
            </div>
          </div>
        </div>
      )
    }

    const users = data?.users || []
    const roleFilter = searchParams?.role

    const rows = users
      .filter((u) => {
        if (!roleFilter) return true
        const r = u.user_metadata?.role ?? u.raw_user_meta_data?.role
        return r === roleFilter
      })
      .map((u) => ({
        id: u.id,
        email: u.email!,
        lastSignIn: u.last_sign_in_at,
        role: u.user_metadata?.role ?? u.raw_user_meta_data?.role ?? "member",
      }))

    return <UsersManagementShell initialUsers={rows} />
  } catch (error) {
    console.error("Unexpected error:", error)
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Users</h1>
            <p className="text-muted-foreground">An unexpected error occurred. Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }
}


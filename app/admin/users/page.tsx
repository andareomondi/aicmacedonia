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

  const { users } = await supabase.auth.admin.listUsers()

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
}

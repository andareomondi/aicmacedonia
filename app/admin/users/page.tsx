import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UsersManagementShell from "@/components/users-management-shell"

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookies().get(name)?.value } },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const role = (user.user_metadata as { role?: string })?.role ?? (user.raw_user_meta_data as { role?: string })?.role

  if (role !== "admin") redirect("/admin/unauthorized")

  const { data: authUsers } = await supabase.auth.admin.listUsers()

  const users = authUsers?.users ?? []

  return <UsersManagementShell initialUsers={users} initialFilter={searchParams.filter ?? "all"} />
}

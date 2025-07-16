"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Shield, Search, Mail, Calendar, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  user_metadata?: { role?: string }
  raw_user_meta_data?: { role?: string }
}

interface Props {
  initialUsers: User[]
  initialFilter: "all" | "admin"
}

export default function UsersManagementShell({ initialUsers, initialFilter }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "member">(initialFilter === "admin" ? "admin" : "all")
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers)

  /* ---------- helpers ---------- */
  const roleOf = (u: User) =>
    u.user_metadata?.role === "admin" || u.raw_user_meta_data?.role === "admin" ? "admin" : "member"

  useEffect(() => {
    let list = initialUsers

    if (roleFilter === "admin") list = list.filter((u) => roleOf(u) === "admin")
    if (roleFilter === "member") list = list.filter((u) => roleOf(u) === "member")

    if (searchTerm) list = list.filter((u) => u.email.toLowerCase().includes(searchTerm.toLowerCase()))

    setFilteredUsers(list)
  }, [searchTerm, roleFilter, initialUsers])

  /* ---------- render ---------- */
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Users ({filteredUsers.length})
          </h1>
        </motion.div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search email…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "all" | "admin" | "member")}
              className="border rounded px-3 py-2"
            >
              <option value="all">All users</option>
              <option value="admin">Admins only</option>
              <option value="member">Members only</option>
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {u.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={roleOf(u) === "admin" ? "destructive" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {roleOf(u) === "admin" ? (
                          <>
                            <Shield className="h-3 w-3" /> Admin
                          </>
                        ) : (
                          <>
                            <Users className="h-3 w-3" /> Member
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Calendar className="inline h-4 w-4 mr-1 text-gray-400" />
                      {new Date(u.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Clock className="inline h-4 w-4 mr-1 text-gray-400" />
                      {u.last_sign_in_at
                        ? formatDistanceToNow(new Date(u.last_sign_in_at), {
                            addSuffix: true,
                          })
                        : "Never"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

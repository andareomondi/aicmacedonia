"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNowStrict } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  user_metadata: {
    role?: string
    full_name?: string
  }
}

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentRoleFilter = searchParams.get("role") || "all"
  const currentSearchQuery = searchParams.get("search") || ""

  const [searchQuery, setSearchQuery] = useState(currentSearchQuery)
  const [roleFilter, setRoleFilter] = useState(currentRoleFilter)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setSearchQuery(newSearch)
    const params = new URLSearchParams(searchParams.toString())
    if (newSearch) {
      params.set("search", newSearch)
    } else {
      params.delete("search")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleRoleFilterChange = (newRole: string) => {
    setRoleFilter(newRole)
    const params = new URLSearchParams(searchParams.toString())
    if (newRole !== "all") {
      params.set("role", newRole)
    } else {
      params.delete("role")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const filteredUsers = useMemo(() => {
    let filtered = initialUsers

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.user_metadata?.role === roleFilter)
    }

    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(lowerCaseSearchQuery) ||
          user.user_metadata?.full_name?.toLowerCase().includes(lowerCaseSearchQuery),
      )
    }
    return filtered
  }, [initialUsers, roleFilter, searchQuery])

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by email or name..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Last Online</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No users found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarFallback>
                        {user.user_metadata?.full_name
                          ? user.user_metadata.full_name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                          : user.email[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{user.user_metadata?.full_name || "N/A"}</div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.user_metadata?.role === "admin" ? "default" : "secondary"}>
                    {user.user_metadata?.role || "Member"}
                  </Badge>
                </TableCell>
                <TableCell>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>
                  {user.last_sign_in_at
                    ? formatDistanceToNowStrict(new Date(user.last_sign_in_at), { addSuffix: true })
                    : "Never"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

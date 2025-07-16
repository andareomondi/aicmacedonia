"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

type Row = { id: string; email: string; role: string; lastSignIn: string | null }

export default function UsersManagementShell({ initialUsers }: { initialUsers: Row[] }) {
  const [query, setQuery] = useState("")
  const filtered = useMemo(
    () => initialUsers.filter((u) => u.email.toLowerCase().includes(query.toLowerCase())),
    [initialUsers, query],
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Users</h2>

      <Input
        placeholder="Search by email…"
        className="max-w-sm mb-6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid gap-4">
        {filtered.map((u) => (
          <Card key={u.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{u.email}</p>
                <p className="text-xs text-muted-foreground">
                  Last online{" "}
                  {u.lastSignIn ? formatDistanceToNow(new Date(u.lastSignIn), { addSuffix: true }) : "never"}
                </p>
              </div>
              <span className="text-sm px-2 py-1 rounded bg-muted">{u.role}</span>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p>No users match that search.</p>}
      </div>
    </main>
  )
}

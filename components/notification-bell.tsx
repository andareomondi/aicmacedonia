"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase-client"

interface Notification {
  id: number
  title: string
  message: string
  created_at: string
  read: boolean
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const unreadCount = notifications.filter((n) => !n.read).length

  // Fetch notifications from Supabase
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) console.error("Error fetching notifications:", error)
      else setNotifications(data || [])
    }

    fetchNotifications()
  }, [])

  const markAsRead = async (id: number) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id)

    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 px-0">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start p-4 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-medium text-sm">{notification.title}</span>
                {!notification.read && (
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {notification.message}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(notification.created_at).toLocaleString()}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Music, Plus, Edit, Trash2, ArrowLeft, Users, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface Choir {
  id: string
  name: string
  description: string
  leader: string
  meeting_day: string
  meeting_time: string
  image_url: string | null
  video_url: string | null
  is_active: boolean
  created_at: string
}

export default function ChoirsPage() {
  const [choirs, setChoirs] = useState<Choir[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
    fetchChoirs()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const isAdmin = user.user_metadata?.role === "admin" || user.raw_user_meta_data?.role === "admin"

      if (!isAdmin) {
        router.push("/admin/unauthorized")
        return
      }
    } catch (error) {
      console.error("Error checking admin access:", error)
      router.push("/login")
    }
  }

  const fetchChoirs = async () => {
    try {
      const { data, error } = await supabase.from("choirs").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setChoirs(data || [])
    } catch (error) {
      console.error("Error fetching choirs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch choirs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteChoir = async (id: string) => {
    try {
      const { error } = await supabase.from("choirs").delete().eq("id", id)

      if (error) throw error

      setChoirs(choirs.filter((c) => c.id !== id))
      toast({
        title: "Success",
        description: "Choir deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting choir:", error)
      toast({
        title: "Error",
        description: "Failed to delete choir",
        variant: "destructive",
      })
    }
  }

  const toggleChoirStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("choirs").update({ is_active: !currentStatus }).eq("id", id)

      if (error) throw error

      setChoirs(choirs.map((c) => (c.id === id ? { ...c, is_active: !currentStatus } : c)))

      toast({
        title: "Success",
        description: `Choir ${!currentStatus ? "activated" : "deactivated"}`,
      })
    } catch (error) {
      console.error("Error updating choir:", error)
      toast({
        title: "Error",
        description: "Failed to update choir",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Choirs
              </h1>
              <p className="text-gray-600 mt-2">Manage church choirs and music groups</p>
            </div>
          </div>
          <Link href="/admin/choirs/new">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Choir
            </Button>
          </Link>
        </motion.div>

        {/* Choirs Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                All Choirs ({choirs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {choirs.length === 0 ? (
                <div className="text-center py-8">
                  <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No choirs found</p>
                  <Link href="/admin/choirs/new">
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Choir
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Choir</TableHead>
                        <TableHead>Leader</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {choirs.map((choir) => (
                        <TableRow key={choir.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {choir.image_url && (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                  <Image
                                    src={choir.image_url || "/placeholder.svg"}
                                    alt={choir.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{choir.name}</p>
                                <p className="text-sm text-gray-500 truncate max-w-xs">{choir.description}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span>{choir.leader}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                {choir.meeting_day} at {choir.meeting_time}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={choir.is_active ? "default" : "secondary"}>
                              {choir.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{new Date(choir.created_at).toLocaleDateString()}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleChoirStatus(choir.id, choir.is_active)}
                              >
                                {choir.is_active ? "Deactivate" : "Activate"}
                              </Button>

                              <Link href={`/admin/choirs/edit/${choir.id}`}>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Choir</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this choir? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteChoir(choir.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

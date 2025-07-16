"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <Button onClick={handleSignOut} variant="outline">
      <LogOut className="h-4 w-4 mr-2" />
      Sign&nbsp;Out
    </Button>
  )
}

"use client"

import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SignOutButton() {
  const router = useRouter()
  async function handle() {
    await supabase.auth.signOut()
    router.push("/")
  }
  return (
    <Button variant="outline" onClick={handle}>
      Sign Out
    </Button>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { BeforeInstallPromptEvent } from "@types"

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export function PWAInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("pwa-dismissed")
    if (saved === "true") return // respect 7-day cooldown

    function handler(e: BeforeInstallPromptEvent) {
      e.preventDefault()
      setDeferred(e)
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  function hide() {
    setShow(false)
    // hide for 7 days
    const in7Days = Date.now() + 7 * 24 * 60 * 60 * 1000
    localStorage.setItem("pwa-dismissed", "true")
    localStorage.setItem("pwa-dismissed-until", in7Days.toString())
  }

  async function install() {
    deferred?.prompt()
    const { outcome } = await deferred!.userChoice
    if (outcome === "accepted") setShow(false)
  }

  if (!show) return null
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center">
      <Card className="w-[360px] shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <CardContent className="p-4 flex flex-col gap-3 text-center">
          <p className="font-medium">Install AIC Macedonia?</p>
          <div className="flex justify-center gap-2">
            <Button onClick={install}>Install</Button>
            <Button variant="outline" onClick={hide}>
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"
import type { BeforeInstallPromptEvent } from "types"

const DISMISSED_KEY = "pwa_prompt_dismissed_until"

export function PWAInstallPrompt() {
  const [deferredEvent, setDeferredEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  /* Show prompt only if not dismissed in last 7 days */
  const mayShow = () => {
    const ts = localStorage.getItem(DISMISSED_KEY)
    if (!ts) return true
    return Date.now() > Number(ts)
  }

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      if (mayShow()) {
        setDeferredEvent(e)
        setVisible(true)
      }
    }
    window.addEventListener("beforeinstallprompt", handler as any)
    return () => window.removeEventListener("beforeinstallprompt", handler as any)
  }, [])

  const install = async () => {
    if (!deferredEvent) return
    deferredEvent.prompt()
    const { outcome } = await deferredEvent.userChoice
    if (outcome === "accepted") hide()
  }

  const hide = () => {
    setVisible(false)
    /* cooldown 7 days */
    const next = Date.now() + 7 * 24 * 60 * 60 * 1000
    localStorage.setItem(DISMISSED_KEY, next.toString())
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
      <Card className="max-w-sm w-full mx-4 p-4 backdrop-blur bg-white/80 shadow-lg border">
        <div className="flex items-start gap-3">
          <Download className="h-6 w-6 text-blue-600 shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Install this app?</p>
            <p className="text-sm text-gray-600">Get an app-like experience from your home screen.</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={hide}>
            Later
          </Button>
          <Button size="sm" onClick={install}>
            Install
          </Button>
        </div>
      </Card>
    </div>
  )
}

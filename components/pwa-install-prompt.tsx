"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, X } from "lucide-react"

/* ------------------------------------------------------------------
   Types
-------------------------------------------------------------------*/
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
  prompt(): Promise<void>
}

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/
const LOCAL_STORAGE_KEY = "aic_pwa_prompt_dismissed_at"
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export function PWAInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [open, setOpen] = useState(false)

  /* Capture `beforeinstallprompt` and decide whether to show the banner */
  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      if (isStandalone) return

      const lastDismissed = Number(localStorage.getItem(LOCAL_STORAGE_KEY) ?? 0)
      if (Date.now() - lastDismissed < COOLDOWN_MS) return

      e.preventDefault()
      setDeferred(e)
      setOpen(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  /* Helpers */
  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    closeBanner()
  }

  const closeBanner = () => {
    setOpen(false)
    setDeferred(null)
    localStorage.setItem(LOCAL_STORAGE_KEY, String(Date.now()))
  }

  if (!open || !deferred) return null

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 flex justify-center">
      <Card className="w-full max-w-md shadow-xl backdrop-blur-sm bg-white/90">
        <CardHeader className="pb-2 flex items-start gap-3">
          <Download className="h-5 w-5 text-blue-600 shrink-0" />
          <div>
            <CardTitle className="text-base">Install AIC Macedonia</CardTitle>
            <CardDescription className="text-gray-600">
              Add the app to your home screen for a faster, full-screen experience.
            </CardDescription>
          </div>
          <button
            onClick={closeBanner}
            aria-label="Dismiss install prompt"
            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>

        <CardContent className="pt-0 pb-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={closeBanner}>
            Maybe later
          </Button>
          <Button size="sm" onClick={install} className="bg-blue-600 hover:bg-blue-700 text-white">
            Install
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

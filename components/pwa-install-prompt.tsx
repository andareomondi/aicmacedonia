"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
  prompt: () => Promise<void>
}

const LOCAL_KEY = "aic_pwa_prompt_dismissed_at"

export function PWAInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  /* Capture beforeinstallprompt */
  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      // Chrome fires this event even if the app is already installed; guard against that
      if ((window as any).matchMedia("(display-mode: standalone)").matches) return

      // Respect a 7-day cool-down
      const ts = localStorage.getItem(LOCAL_KEY)
      if (ts && Date.now() - Number(ts) < 7 * 24 * 60 * 60 * 1000) return

      e.preventDefault()
      setDeferred(e)
      setVisible(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const install = async () => {
    if (!deferred) return
    deferred.prompt()
    const choice = await deferred.userChoice
    if (choice.outcome === "accepted") {
      setVisible(false)
      setDeferred(null)
    }
  }

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(LOCAL_KEY, String(Date.now()))
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 inset-x-0 flex justify-center z-50">
      <Card className="w-[90%] sm:w-96 shadow-xl border-0 bg-white/90 backdrop-blur-md">
        <CardContent className="p-4 flex items-start gap-4">
          <Download className="h-8 w-8 text-blue-600 shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Install AIC Macedonia</h3>
            <p className="text-sm text-gray-600">
              Get a faster, full-screen experience by adding this app to your home screen.
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={install} className="bg-blue-600 hover:bg-blue-700 text-white">
                Install
              </Button>
              <Button size="sm" variant="outline" onClick={dismiss}>
                Dismiss
              </Button>
            </div>
          </div>
          <button
            aria-label="Dismiss"
            onClick={dismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

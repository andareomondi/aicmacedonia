import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { AuthGuard } from "@/components/auth-guard"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AIC Macedonia - African Inland Church",
  description:
    "A local council church under AIC Kasina, serving our community in Athiriver, Kenya with love, faith, and fellowship.",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: "width=device-width, initial-scale=1"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <AuthGuard>
            <BackgroundAnimation />
            <Header />
            {children}
            <Footer />
            <PWAInstallPrompt />
            <Toaster />
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  )
}

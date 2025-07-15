import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { BackgroundAnimation } from "@/components/background-animation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AIC Macedonia - African Inland Church",
  description:
    "Welcome to AIC Macedonia, a local council church under AIC Kasina, serving the community in Athiriver, Kenya.",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <BackgroundAnimation />
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

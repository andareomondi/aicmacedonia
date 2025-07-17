"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const slides = [
  { src: "https://picsum.photos/seed/church/1200/600", alt: "Convony of Hope" },
  { src: "https://picsum.photos/seed/church/1200/600", alt: "Aspire to Inspire" },
  { src: "https://picsum.photos/seed/church/1200/600", alt: "AIC Kasina DCC" },
]

export function SponsorshipSlideshow() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative w-full aspect-[2/1] overflow-hidden rounded-lg bg-muted">
      {slides.map((s, i) => (
        <Image
          key={s.alt}
          src={s.src || "/placeholder.svg"}
          alt={s.alt}
          fill
          className={`object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* controls */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIdx((idx - 1 + slides.length) % slides.length)}
        className="absolute top-1/2 left-4 -translate-y-1/2"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIdx((idx + 1) % slides.length)}
        className="absolute top-1/2 right-4 -translate-y-1/2"
      >
        <ArrowRight className="w-5 h-5" />
      </Button>
      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-primary" : "bg-muted-foreground/50"}`} />
        ))}
      </div>
    </section>
  )
}

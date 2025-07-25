"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const slides = [
  {
    src: "/sponsors/convoy.webp",
    alt: "Convoy of Hope",
    title: "Convoy of Hope",
    description: "Partnering with us to feed the hungry and serve communities in need",
  },
  {
    src: "/sponsors/convoy2.jpeg",
    alt: "Convoy of Hope",
    title: "Convoy of Hope",
    description: "Building bridges of hope through community outreach programs",
  },
  {
    src: "https://picsum.photos/seed/church/1200/600",
    alt: "AIC Kasina DCC",
    title: "AIC Kasina DCC",
    description: "Supporting our mission through faithful partnership and collaboration",
  },
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
        <div key={s.alt} className="relative w-full h-full">
          <Image
            src={s.src || "/placeholder.svg"}
            alt={s.alt}
            fill
            className={`object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
          />
          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
          />

          {/* Overlay text */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
          >
            <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
            <p className="text-sm opacity-90 max-w-2xl">{s.description}</p>
          </div>
        </div>
      ))}

      {/* Navigation controls */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIdx((idx - 1 + slides.length) % slides.length)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/20"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIdx((idx + 1) % slides.length)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/20"
      >
        <ArrowRight className="w-5 h-5" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2 w-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}


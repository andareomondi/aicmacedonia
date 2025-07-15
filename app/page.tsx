import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Leadership } from "@/components/leadership"
import { Departments } from "@/components/departments"
import { Choirs } from "@/components/choirs"
import { UpcomingEvents } from "@/components/upcoming-events"
import { BackToTop } from "@/components/back-to-top"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Leadership />
      <Departments />
      <Choirs />
      <UpcomingEvents />
      <BackToTop />
    </main>
  )
}

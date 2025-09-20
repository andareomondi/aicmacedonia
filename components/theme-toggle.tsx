"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-9 w-9 px-0 hover:scale-105 transition-transform duration-200"
    >
      <Sun className={`h-4 w-4 absolute transition-all duration-300 ease-in-out ${theme === 'dark'
          ? 'rotate-90 scale-0 opacity-0'
          : 'rotate-0 scale-100 opacity-100'
        }`} />
      <Moon className={`h-4 w-4 absolute transition-all duration-300 ease-in-out ${theme === 'dark'
          ? 'rotate-0 scale-100 opacity-100'
          : '-rotate-90 scale-0 opacity-0'
        }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

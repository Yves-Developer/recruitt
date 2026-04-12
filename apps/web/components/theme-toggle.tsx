"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
      <button
        onClick={() => setTheme("light")}
        className={`inline-flex items-center justify-center rounded-full p-2 transition-all ${
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`inline-flex items-center justify-center rounded-full p-2 transition-all ${
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`inline-flex items-center justify-center rounded-full p-2 transition-all ${
          theme === "system"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
        title="System Mode"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  )
}

"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { IconPalette, IconSettings, IconBell, IconShieldLock, IconTerminal } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const THEMES = [
  { name: "Recruitt Lime", color: "#8fdc1a", darkColor: "#a8fc1e", id: "lime" },
  { name: "Umurava Blue", color: "#2b71f0", darkColor: "#60a5fa", id: "blue" },
  { name: "Royal Purple", color: "#8b5cf6", darkColor: "#a78bfa", id: "purple" },
  { name: "Sunset Rose", color: "#f43f5e", darkColor: "#fb7185", id: "rose" },
  { name: "Midnight Teal", color: "#0d9488", darkColor: "#2dd4bf", id: "teal" },
]

export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = React.useState("lime")
  const [notifications, setNotifications] = React.useState(true)
  const [aiSuggestions, setAiSuggestions] = React.useState(true)

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("recruitt-primary-color")
    if (savedTheme) {
      updateTheme(savedTheme)
    }
  }, [])

  const updateTheme = (themeId: string) => {
    setActiveTheme(themeId)
    const theme = THEMES.find(t => t.id === themeId)
    if (!theme) return

    // Save to local storage for persistence across navigations
    localStorage.setItem("recruitt-primary-color", themeId)

    // Update root variables
    document.documentElement.style.setProperty('--primary', theme.color)
    document.documentElement.style.setProperty('--sidebar-primary', theme.color)
    document.documentElement.style.setProperty('--ring', theme.color)

    // Also update tinted variables from globals.css to ensure harmony
    if (themeId !== "lime") {
      document.documentElement.style.setProperty('--secondary', `${theme.color}15`)
      document.documentElement.style.setProperty('--muted', `${theme.color}10`)
    } else {
      // Revert to original soft-light defaults if lime
      document.documentElement.style.setProperty('--secondary', "#eef2e8")
      document.documentElement.style.setProperty('--muted', "#eef2e8")
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <IconSettings size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Tailor your Recruitt dashboard to your workflow.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Appearance Section */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconPalette size={20} className="text-primary" /> Appearance
            </CardTitle>
            <CardDescription>Customize the primary branding and visual style of the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Primary Brand Color</Label>
              <div className="flex flex-wrap gap-3">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => updateTheme(theme.id)}
                    className={cn(
                      "group relative flex items-center gap-3 p-3 rounded-xl border transition-all hover:bg-muted",
                      activeTheme === theme.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border"
                    )}
                  >
                    <div
                      className="size-6 rounded-full shadow-sm"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="text-sm font-medium">{theme.name}</span>
                    {activeTheme === theme.id && (
                      <div className="absolute -top-1 -right-1 size-3 bg-primary rounded-full border-2 border-background" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Section */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTerminal size={20} className="text-primary" /> Intelligence & Automation
            </CardTitle>
            <CardDescription>Manage how the AI interact with your talent pool.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Real-time AI Insights</Label>
                <p className="text-sm text-muted-foreground">Allow Gemini to surface candidate matches as you browse.</p>
              </div>
              <Switch checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
            </div>
            <div className="flex items-center justify-between border-t pt-6">
              <div className="space-y-0.5">
                <Label className="text-base">Automatic Resume Categorization</Label>
                <p className="text-sm text-muted-foreground">Tag applicants automatically based on parsed experience.</p>
              </div>
              <Switch checked={true} disabled />
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShieldLock size={20} className="text-primary" /> Privacy & Access
            </CardTitle>
            <CardDescription>Control your profile and account security preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between border-t pt-6">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates on new candidate applications.</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

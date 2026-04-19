"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

function PasscodeContent() {
  const [passcode, setPasscode] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      })

      if (res.ok) {
        toast.success("Access Granted")
        router.push(next)
        router.refresh()
      } else {
        toast.error("Invalid Passcode")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="size-12 rounded-xl bg-primary/10 p-2.5">
                <Image 
                  src="/RecruittLogoIcon.svg" 
                  alt="Recruitt" 
                  width={48} 
                  height={48} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">Private Access</CardTitle>
              <CardDescription className="text-balance">
                Recruitt is currently in private testing. Please enter your invite code to join.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter access code"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="pl-9"
                  autoFocus
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full font-semibold gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Enter Platform"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          <Sparkles className="h-3 w-3 text-primary" />
          The future of hiring
        </div>
      </div>

      <footer className="absolute bottom-8 text-center text-muted-foreground/40 text-xs">
        &copy; 2026 Recruitt Technologies. All rights reserved.
      </footer>
    </div>
  )
}

export default function PasscodePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-muted" />}>
      <PasscodeContent />
    </React.Suspense>
  )
}

"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconLock, IconArrowRight, IconSparkles } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image"

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
    <div className="relative min-h-screen flex items-center justify-center bg-[#050505] text-white p-6 font-sans overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#a8fc1e]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#a8fc1e]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[440px] animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="mb-4">
             <Image 
                src="/RecruittLogoIcon.svg" 
                alt="Recruitt" 
                width={80} 
                height={80} 
                className="drop-shadow-[0_0_15px_rgba(168,252,30,0.3)]"
             />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
              Private Access
            </h1>
            <p className="text-muted-foreground text-lg italic">
              Recruitt is currently in private pre-launch. Please enter your invitation passcode to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <IconLock size={20} />
              </div>
              <Input
                type="password"
                placeholder="Enter access code"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="h-16 pl-12 text-xl bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl transition-all placeholder:text-white/20"
                autoFocus
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 text-lg font-bold rounded-2xl bg-[#a8fc1e] text-black hover:bg-[#b9ff45] active:scale-[0.98] transition-all gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Enter Platform"}
              {!isSubmitting && <IconArrowRight size={20} />}
            </Button>
          </form>

          <div className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-[0.2em]">
            <IconSparkles size={14} className="text-primary" />
            Vesting the future of talent
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 left-0 right-0 text-center text-white/20 text-sm">
        &copy; 2026 Recruitt Technologies. All rights reserved.
      </footer>
    </div>
  )
}

export default function PasscodePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <PasscodeContent />
    </React.Suspense>
  )
}

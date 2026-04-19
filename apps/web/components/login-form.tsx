"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IconBrandGoogle } from "@tabler/icons-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign in failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid p-0 md:grid-cols-2 bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center space-y-8">
          <div className="space-y-2">
            <div className="flex justify-center mb-6">
              <div className="size-12 rounded-xl bg-primary/10 p-2.5">
                <Image 
                  src="/RecruittLogoIcon.svg" 
                  alt="Icon" 
                  width={48} 
                  height={48}
                  className="w-full h-full"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in with your Google account to get started
            </p>
          </div>

          <Button 
            type="button"
            variant="default" 
            size="lg"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 flex items-center justify-center gap-3 transition-all"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
            ) : (
              <>
                <IconBrandGoogle size={20} stroke={2} />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[240px]">
            By clicking continue, you agree to our <a href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</a> and <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
          </p>
        </div>
        <div className="relative hidden bg-muted md:block border-l">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-full max-w-[200px] mb-6">
              <Image 
                src="/LogoIconAndText.svg" 
                alt="Recruitt Logo" 
                width={200} 
                height={50}
                className="w-full h-auto"
              />
            </div>
            <p className="text-muted-foreground text-xs font-medium leading-relaxed max-w-[180px]">
              Making hiring simple and efficient for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

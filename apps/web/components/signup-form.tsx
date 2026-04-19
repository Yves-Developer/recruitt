"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IconBrandGoogle } from "@tabler/icons-react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-[#111111]/80 backdrop-blur-3xl border-white/5 shadow-2xl rounded-[32px]">
        <CardContent className="grid p-0 md:grid-cols-2 min-h-[600px]">
          <form className="p-8 md:p-12 flex flex-col justify-center">
            <FieldGroup className="gap-8">
              <div className="flex flex-col items-start gap-4">
                <div className="size-12 rounded-2xl bg-[#a8fc1e] p-2.5 overflow-hidden shadow-[0_0_20px_rgba(168,252,30,0.3)]">
                  <Image 
                    src="/RecruittLogoIcon.svg" 
                    alt="Icon" 
                    width={48} 
                    height={48}
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
                  <p className="text-sm text-white/40">
                    Create an account to start hiring
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <Field>
                  <FieldLabel htmlFor="email" className="text-white/60">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus-visible:ring-[#a8fc1e]/50"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password" title="Password" className="text-white/60" />
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus-visible:ring-[#a8fc1e]/50"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password" title="Confirm" className="text-white/60" />
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      required 
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus-visible:ring-[#a8fc1e]/50"
                    />
                  </Field>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#a8fc1e] hover:bg-[#a8fc1e]/90 text-black h-12 rounded-xl font-bold transition-all mt-2"
                >
                  Create Account
                </Button>
              </div>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-[#111111] *:data-[slot=field-separator-content]:text-white/20 before:bg-white/10 after:bg-white/10">
                Or continue with
              </FieldSeparator>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 rounded-xl flex items-center justify-center gap-3 transition-all"
                >
                  <IconBrandGoogle size={20} stroke={2} className="text-[#a8fc1e]" />
                  <span className="sr-only">Google</span>
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 rounded-xl flex items-center justify-center gap-3 transition-all"
                >
                   <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                  </svg>
                  <span className="sr-only">Apple</span>
                </Button>
              </div>

              <p className="text-center text-xs text-white/30">
                Already have an account?{" "}
                <Link href="/login" className="text-[#a8fc1e] hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-[#0a0a0a] md:block border-l border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#161616] to-[#0a0a0a]" />
            <div className="absolute inset-0 bg-[#a8fc1e]/5 blur-[80px]" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="w-full max-w-[240px] mb-8">
                <Image 
                  src="/LogoIconAndText.svg" 
                  alt="Recruitt Logo" 
                  width={240} 
                  height={60}
                  className="w-full h-auto opacity-80"
                />
              </div>
              <p className="text-white/30 text-sm font-medium leading-relaxed max-w-[200px] italic">
                Making hiring simple and efficient for everyone.
              </p>
              <div className="flex justify-center gap-2 mt-8">
                 <div className="h-1 w-1.5 bg-white/10 rounded-full"></div>
                 <div className="h-1 w-8 bg-[#a8fc1e] rounded-full"></div>
                 <div className="h-1 w-1.5 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="px-6 text-center text-[11px] text-white/20 leading-relaxed max-w-[400px] mx-auto">
        By clicking continue, you agree to our <Link href="/terms" className="hover:text-white/40 underline underline-offset-4">Terms of Service</Link>{" "}
        and <Link href="/privacy" className="hover:text-white/40 underline underline-offset-4">Privacy Policy</Link>.
      </p>
    </div>
  )
}

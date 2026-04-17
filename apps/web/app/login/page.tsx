"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { IconBrandGoogle } from "@tabler/icons-react"

export default function LoginPage() {
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
    <div className="relative min-h-screen flex items-center justify-center bg-[#050505] text-white p-6 font-sans overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a8fc1e]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a8fc1e]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Centered Container */}
      <div className="relative w-full max-w-[960px] flex flex-col md:flex-row bg-[#111111]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-2xl z-10 min-h-[600px]">
        
        {/* Left Column: Graphic Area */}
        <div className="hidden md:flex flex-1 items-center justify-center relative bg-gradient-to-br from-[#161616] to-[#0a0a0a] border-r border-white/5">
          <div className="absolute inset-0 bg-[#a8fc1e]/5 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 text-center space-y-12 p-12 slide-up">
            <div className="w-full max-w-[320px] mx-auto filter drop-shadow-[0_0_30px_rgba(168,252,30,0.2)]">
              <Image 
                src="/LogoIconAndText.svg" 
                alt="Recruitt Logo" 
                width={320} 
                height={80}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="space-y-4">
              <p className="text-white/30 text-lg font-medium tracking-wide leading-relaxed max-w-[300px] mx-auto italic">
                Optimizing the intelligence matrix for modern talent acquisition.
              </p>
            </div>
            {/* Visual indicator / Branding detail */}
            <div className="flex justify-center gap-3 pt-4">
               <div className="h-1.5 w-10 bg-[#a8fc1e] rounded-full"></div>
               <div className="h-1.5 w-2 bg-white/10 rounded-full"></div>
               <div className="h-1.5 w-2 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Area */}
        <div className="flex-1 flex flex-col justify-center p-10 md:p-14 lg:p-20">
          <div className="space-y-12">
            {/* Logo Icon inside Card */}
            <div className="flex justify-start">
              <div className="size-14 rounded-2xl bg-[#a8fc1e] p-3 overflow-hidden shadow-[0_0_25px_rgba(168,252,30,0.35)] transition-transform hover:scale-105 duration-500">
                <Image 
                  src="/RecruittLogoIcon.svg" 
                  alt="Icon" 
                  width={56} 
                  height={56}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-white/95">
                Welcome Back!
              </h1>
              <p className="text-white/45 text-[15px] leading-relaxed max-w-[300px]">
                Continue with your gmail account Easy, just tap on button below.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-10">
              <Button 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-[#a8fc1e] hover:bg-[#a8fc1e]/90 text-black rounded-2xl h-[60px] flex items-center justify-center gap-4 font-bold text-base transition-all duration-300 hover:scale-[0.98] active:scale-[0.95] border-none"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                  <>
                    <div className="bg-black/5 p-1 rounded-lg">
                      <IconBrandGoogle size={24} stroke={2.5} />
                    </div>
                    Continue with Google
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center px-4 opacity-50">
                <div className="flex-grow border-t border-white/20"></div>
                <div className="mx-6 size-2 rounded-full border border-white/40 bg-transparent flex-shrink-0"></div>
                <div className="flex-grow border-t border-white/20"></div>
              </div>

              {/* Legal Links */}
              <div className="text-center">
                <p className="text-[13px] text-white/30 leading-relaxed max-w-[320px] mx-auto">
                  Before you use this app you must accept our {" "}
                  <Link href="/privacy" className="text-[#a8fc1e] hover:underline font-medium decoration-[#a8fc1e]/30">Privacy Policy</Link>
                  {" "} & {" "}
                  <Link href="/terms" className="text-[#a8fc1e] hover:underline font-medium decoration-[#a8fc1e]/30">Terms of use</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

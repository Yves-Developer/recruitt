"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Hexagon, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background grid md:grid-cols-2">
      {/* Visual Section - Left */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-zinc-900 dark:bg-zinc-950 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[60%] -right-[20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[80px]" />
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Hexagon className="text-primary-foreground fill-primary-foreground w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Recruitt</span>
        </div>

        <div className="relative z-10 max-w-lg mt-auto mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight">
            Find the talent that fits your <span className="text-primary">vision.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Welcome back to the platform where leading companies connect with exceptional individuals. Login to continue your journey.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-zinc-500 font-medium tracking-wide">
          © {new Date().getFullYear()} Recruitt Inc. All rights reserved.
        </div>
      </div>

      {/* Form Section - Right */}
      <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24 bg-card/50 backdrop-blur-sm relative border-l border-border/50 shadow-2xl">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          {/* Mobile Header */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Hexagon className="text-primary-foreground fill-primary-foreground w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Recruitt</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enter your credentials to access your account dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80 font-semibold">Email address</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    className="pl-10 pb-2 pt-2 h-11 bg-background/50 focus-visible:bg-background transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground/80 font-semibold">Password</Label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 pb-2 pt-2 h-11 bg-background/50 focus-visible:bg-background transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="font-normal text-muted-foreground text-sm cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>

            <Button className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02] shadow-primary/20 shadow-lg" type="submit">
              Sign in to your account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground font-medium tracking-wider">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 bg-background/50 hover:bg-background hover:border-primary/50 transition-colors">
               <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Google
            </Button>
            <Button variant="outline" className="h-11 bg-background/50 hover:bg-background hover:border-primary/50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-foreground" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

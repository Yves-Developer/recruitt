import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050505] p-6 md:p-10 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a8fc1e]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a8fc1e]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-sm md:max-w-4xl z-10">
        <SignupForm />
      </div>
    </div>
  )
}

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const { handlers: nextHandlers, auth: nextAuth, signIn: nextSignIn, signOut: nextSignOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
})

export const handlers = nextHandlers
export const auth = nextAuth as any
export const signIn = nextSignIn as any
export const signOut = nextSignOut as any

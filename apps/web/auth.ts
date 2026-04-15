import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const { handlers: nextHandlers, auth: nextAuth, signIn: nextSignIn, signOut: nextSignOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/") && nextUrl.pathname !== "/login"
      
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false 
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl))
      }
      return true
    },
  },
  pages: {
    signIn: "/login",
  },
})

export const handlers = nextHandlers
export const auth = nextAuth as any
export const signIn = nextSignIn as any
export const signOut = nextSignOut as any

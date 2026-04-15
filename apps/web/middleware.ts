import { auth } from "./auth"
import { NextResponse } from "next/server"

const middleware = auth((req: any) => {
  const isPasscodeVerified = req.cookies.get("recruitt_passcode_verified")?.value === "true"
  const isLoggedIn = !!req.auth?.user
  
  const isPasscodePage = req.nextUrl.pathname === "/passcode"
  const isLoginPage = req.nextUrl.pathname === "/login"
  const isApiPasscode = req.nextUrl.pathname.startsWith("/api/passcode")
  const isPublicAsset = req.nextUrl.pathname.match(/\.(svg|png|jpg|ico)$/)
  
  // 1. Mandatory Passcode Gate
  if (!isPasscodeVerified && !isPasscodePage && !isApiPasscode && !isPublicAsset) {
    const url = req.nextUrl.clone()
    url.pathname = "/passcode"
    url.searchParams.set("next", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // 2. Redirect away from passcode if already verified
  if (isPasscodeVerified && isPasscodePage) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  // 3. Mandatory Google Login for Dashboard
  const isOnDashboard = req.nextUrl.pathname === "/" || 
                        (!["/login", "/passcode"].includes(req.nextUrl.pathname) && !isApiPasscode && !isPublicAsset)
  
  if (isPasscodeVerified && isOnDashboard && !isLoggedIn && !isLoginPage) {
    const loginUrl = new URL("/login", req.nextUrl)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export default middleware as any

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - api/auth (NextAuth API routes)
     */
    "/((?!_next/static|_next/image|api/auth).*)",
  ],
}

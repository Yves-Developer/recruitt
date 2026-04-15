import { auth } from "./auth"
import { NextResponse } from "next/server"

const middleware = auth((req: any) => {
  const isPasscodeVerified = req.cookies.get("recruitt_passcode_verified")?.value === "true"
  const isPasscodePage = req.nextUrl.pathname === "/passcode"
  const isApiPasscode = req.nextUrl.pathname.startsWith("/api/passcode")
  const isPublicAsset = req.nextUrl.pathname.match(/\.(svg|png|jpg|ico)$/)
  
  if (!isPasscodeVerified && !isPasscodePage && !isApiPasscode && !isPublicAsset) {
    const url = req.nextUrl.clone()
    url.pathname = "/passcode"
    url.searchParams.set("next", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (isPasscodeVerified && isPasscodePage) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
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

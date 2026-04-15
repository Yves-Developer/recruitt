import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { passcode } = await request.json()
  const correctPasscode = process.env.PRELAUNCH_PASSCODE || "1234"

  if (passcode === correctPasscode) {
    const cookieStore = await cookies()
    cookieStore.set("recruitt_passcode_verified", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return Response.json({ success: true })
  }

  return Response.json({ success: false }, { status: 401 })
}

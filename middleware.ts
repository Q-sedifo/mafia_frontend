import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { signOut } from "next-auth/react"
import axios, { type AxiosError } from "axios"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token?.accessToken) {
      return NextResponse.redirect(new URL("/signin", req.url))
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/me`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      )

      const room = res?.data

      if (room?.roomId) {
        return NextResponse.redirect(new URL(`/rooms/${room.roomId}`, req.url))
      }

      return NextResponse.next()
    } catch (err) {
      const error = err as AxiosError

      if (error.response?.status === 401) {
        console.log("Unauthorized, signing out...")

        signOut({
          redirect: false,
        })

        return NextResponse.redirect(new URL("/signin", req.url))
      }

      console.error("Error:", error)
      return NextResponse.redirect(new URL("/error", req.url))
    }
  },
  {
    pages: {
      signIn: "/signin",
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/room"
  ],
}
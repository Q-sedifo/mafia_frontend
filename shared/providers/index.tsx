"use client"

import { ThemeProvider } from "./theme-provider"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

interface IProps {
  children: React.ReactNode
  session: Session | null
}

export const Providers = ({ children, session }: IProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        { children }
      </SessionProvider>
    </ThemeProvider>
  )
}
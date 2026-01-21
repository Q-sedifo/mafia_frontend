"use client"

import { ThemeProvider } from "./theme-provider"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

interface IProps {
  children: React.ReactNode
  session: Session | null
}

export const Providers = ({ children, session }: IProps) => {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          { children }
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
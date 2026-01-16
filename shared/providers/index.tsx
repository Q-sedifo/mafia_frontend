"use client"

import { ThemeProvider } from "./theme-provider"

interface IProps {
  children: React.ReactNode
}

export const Providers = ({ children }: IProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      { children }
    </ThemeProvider>
  )
}
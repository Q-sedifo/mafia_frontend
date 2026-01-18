"use client"

import { ThemeTrigger } from "@/shared/ui/theme-trigger"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/shared/hooks/useAuth"
import { LogoutBtn } from "./logout-btn"

export const Header = () => {
  const { isLoggedIn, user } = useAuth()

  return (
    <header className="sticky left-0 top-0 w-full flex items-center justify-between px-5 py-2 border-b bg-background z-[2]">
      Mafia
      <div className="flex items-center gap-5">
        {isLoggedIn && (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.avatar!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground leading-none font-medium">
                { user?.email }
              </span>
              <span className="text-xs leading-none">
                { user?.nickname }
              </span>
            </div>
            <LogoutBtn/>
          </div>
        )}
        <ThemeTrigger/>
      </div>
    </header>
  )
}
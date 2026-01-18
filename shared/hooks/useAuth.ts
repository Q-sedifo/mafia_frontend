import { useSession } from "next-auth/react"
import { useMemo } from "react"

export function useAuth() {
  const { data: session, status } = useSession()

  const isLoggedIn = status === "authenticated"

  const user = useMemo(() => {
    if (!session?.user) return null

    return {
      id: session.user.id,
      nickname: session.user.nickname,
      avatar: session.user.avatar,
      email: session.user.email,
      accessToken: session.accessToken,
    }
  }, [session])

  return {
    isLoggedIn,
    user,
    accessToken: session?.accessToken,
    status,
  }
}

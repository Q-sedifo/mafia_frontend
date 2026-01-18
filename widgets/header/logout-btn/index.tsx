import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export function LogoutBtn() {

  const handleSignoutClick = () => {
    signOut({ callbackUrl: "/signin" })
  }

  return (
    <Button onClick={handleSignoutClick}>
      Logout
    </Button>
  )
}
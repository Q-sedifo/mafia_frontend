import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci"

export function LogoutBtn() {

  const handleSignoutClick = () => {
    signOut({ callbackUrl: "/signin" })
  }

  return (
    <Button onClick={handleSignoutClick}>
      <CiLogout/>
      Logout
    </Button>
  )
}
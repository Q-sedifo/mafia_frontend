"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/shared/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface IProps {
  roomId: string
}

export function LeaveRoomBtn({ roomId }: IProps) {
  const router = useRouter()

  const handleLeaveRoom = async () => {
    try {
      await api.post(`/rooms/${roomId}/leave`, {})
      router.push("/")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <Button variant="outline" onClick={() => handleLeaveRoom()}>
      Leave
    </Button>
  )
}
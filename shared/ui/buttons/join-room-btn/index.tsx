"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/shared/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface IProps {
  roomId: string
}

export function JoinRoomBtn({ roomId }: IProps) {
  const router = useRouter()

  const handleJoinRoom = async () => {
    try {
      await api.post(`/rooms/${roomId}/join`, {})
      router.push(`/rooms/${roomId}`)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <Button variant="outline" onClick={() => handleJoinRoom()}>
      Join
    </Button>
  )
}
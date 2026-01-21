"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/shared/api"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import type { IUser } from "@/entities/user/model/model"
import { LeaveRoomBtn } from "@/shared/ui/buttons/leave-room-btn"

interface IProps {
  roomId: string
}

export const Lobby = ({ roomId }: IProps) => {
  const router = useRouter()

  const { data: room, isLoading } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => api.get(`/rooms/${roomId}`).then(r => r.data),
  })

  useEffect(() => {
    if (!isLoading && !room) {
      router.push("/")
    }
  }, [isLoading, room, router])

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner className="w-[30px] h-[30px]" />
      </div>
    )
  }

  if (!room) return null

  const roomPlayers = room.players?.map((p: any) => p.user) || []

  return (
    <div className="flex-1 w-full overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>{room.name}</span>
          <span className="text-muted-foreground">({room.phase})</span>
        </div>
        <div className="flex items-center gap-2">
          <LeaveRoomBtn roomId={roomId} />
        </div>
      </div>

      <div className="mt-2">
        <Command className="p-2">
          <div>Players [{roomPlayers.length}]</div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {roomPlayers.map((user: IUser, index: number) => (
                <CommandItem key={index} value="user">
                  {user.nickname}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  )
}

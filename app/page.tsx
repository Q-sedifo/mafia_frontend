"use client"

import { CreateRoomSheet } from "@/shared/ui/sheets/create-room-sheet"
import { BasePagination } from "@/shared/ui/pagination"
import { RoomSkeleton } from "@/entities/room/ui/room-sekeleton"
import type { IRoom } from "@/entities/room/model/model"
import { JoinRoomBtn } from "@/shared/ui/buttons/join-room-btn"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/shared/api"

export default function Dashboard() {
  const getRooms = async () => {
    const response = await api.get("/rooms")
    return response.data
  }

  const { data: rooms, isLoading } = useQuery({ 
    queryKey: ['todos'], 
    queryFn: getRooms 
  })

  console.log(rooms)

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="w-full flex items-center justify-between mb-2">
        <span>Active rooms</span>
        <CreateRoomSheet/>
      </div>
      <div className="flex flex-1 w-full flex-col justify-between">
        {isLoading ? (
          <RoomSkeleton/>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Room name</TableHead>
                <TableHead>Players</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms?.map((room: IRoom) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell className="text-muted-foreground">{room.players.length} / 9</TableCell>
                  <TableCell>{room.phase}</TableCell>
                  <TableCell className="text-muted-foreground">{room.code}</TableCell>
                  <TableCell className="text-right">
                    <JoinRoomBtn roomId={room.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <BasePagination/>
      </div>
    </div>
  )
}

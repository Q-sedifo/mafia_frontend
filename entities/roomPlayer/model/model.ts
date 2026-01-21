import type { IUser } from "@/entities/user/model/model"

export interface IRoomPlayer {
  id: string
  roomId: string
  userId: string
  isReady: boolean
  user: IUser
}
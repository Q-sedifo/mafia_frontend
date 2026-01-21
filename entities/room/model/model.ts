import type { IRoomPlayer } from "@/entities/roomPlayer/model/model"

export interface IRoom {
  id: string
  name: string
  code: string
  hostId: string
  phase: IRoomPhase
  createdAt: string
  players: IRoomPlayer[]
}

export enum IRoomPhase {
  LOBBY = 'LOBBY',
  NIGHT = 'NIGHT',
  DAY_DISCUSSION = 'DAY_DISCUSSION',
  VOTING = 'VOTING',
  FINISHED = 'FINISHED',
}

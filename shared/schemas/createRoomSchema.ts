import { z } from "zod"

export const createRoomSchema = z.object({
  name: z
    .string()
    .min(1, "Room name required")
    .max(20, "Too long room name")
})

export type CreateRoomFormValues = z.infer<typeof createRoomSchema>
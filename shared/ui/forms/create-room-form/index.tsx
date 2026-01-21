"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldError } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createRoomSchema } from "@/shared/schemas/createRoomSchema"
import { api } from "@/shared/api"
import { useRouter } from "next/navigation"

export interface IInputs {
  name: string
}

export const CreateRoomForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IInputs>({
    resolver: zodResolver(createRoomSchema)
  })

  const handleCreateRoom = async (data: IInputs) => {
    try {
      const response = await api.post("/rooms", data)
      const roomId = response.data.id
      router.push(`/rooms/${roomId}`)
    } catch(error) {
      console.error("Something went wrong")
      setError("root", {
        message: "Something went wrong"
      })
    }
  }

  return (
    <form 
      className="flex flex-1 auto-rows-min gap-6 h-full justify-between flex-col"
      onSubmit={handleSubmit(handleCreateRoom)}
    >
      <div className="grid gap-3">
        <FieldError errors={[errors.root]} />
        <Label htmlFor="sheet-demo-name">Room name</Label>
        <FieldError errors={[errors.name]} />
        <Input 
          id="sheet-demo-name" 
          {...register("name")} 
          placeholder="Lobby"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Create
      </Button>
    </form>
  )
}
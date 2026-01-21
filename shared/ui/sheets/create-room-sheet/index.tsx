import { Button } from "@/components/ui/button"
import { SheetWrapper } from "../sheet-wrapper"
import { IoAddOutline } from "react-icons/io5"
import { CreateRoomForm } from "@/shared/ui/forms/create-room-form"

export const CreateRoomSheet = () => {
  return (
    <SheetWrapper
      trigger={
        <Button variant="secondary">
          <IoAddOutline/>
          Create room
        </Button>
      }
      title="Create room"
      description="Create your own room to play with friends"
    >
      <CreateRoomForm/>
    </SheetWrapper>
  )
}
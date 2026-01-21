import React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface IProps {
  trigger: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
}

export function SheetWrapper({ trigger, title, description, children }: IProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        { trigger }
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{ title }</SheetTitle>
          <SheetDescription>
            { description }
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 max-h-full h-full overflow-y-auto">
          { children }
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
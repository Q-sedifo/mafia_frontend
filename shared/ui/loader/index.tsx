import { Spinner } from "@/components/ui/spinner"
import { Logo } from "@/shared/ui/logo"

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[100] bg-background">
      <div className="flex flex-col gap-5 items-center">
        <Logo/>
        <Spinner className="w-[30px] h-[30px]"/>
      </div>
    </div>
  )
}
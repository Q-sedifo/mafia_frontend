import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

interface IProps {
  text?: string
  variant?: "default" | "outline" | "secondary" | "destructive"
}

export const BadgeLoading = ({ text = "Loading", variant = "default" }: IProps) => {
  return (
    <Badge variant={variant} className="flex items-center gap-1">
      <Spinner className="h-3 w-3" />
      { text }
    </Badge>
  )
}
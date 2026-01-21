import { Skeleton } from "@/components/ui/skeleton"

export const RoomSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border border-border">
        <div className="grid grid-cols-4 gap-4 border-b px-4 py-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 px-4 py-4 items-center"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-20 rounded-md justify-self-end" />
          </div>
        ))}
      </div>
    </div>
  )
}

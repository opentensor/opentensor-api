import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonLoader() {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex w-full space-x-4">
        <Skeleton className="h-6 w-[20%]" />
        <Skeleton className="h-6 w-[40%]" />
        <Skeleton className="h-6 w-[15%]" />
        <Skeleton className="h-6 w-[20%]" />
        <Skeleton className="h-6 w-[10%]" />
      </div>
      <div className="flex w-full space-x-4">
        <Skeleton className="h-6 w-[20%]" />
        <Skeleton className="h-6 w-[40%]" />
        <Skeleton className="h-6 w-[15%]" />
        <Skeleton className="h-6 w-[20%]" />
        <Skeleton className="h-6 w-[10%]" />
      </div>
      <div className="flex w-full space-x-4">
        <Skeleton className="h-6 w-[20%]" />
        <Skeleton className="h-6 w-[40%]" />
        <Skeleton className="h-6 w-[15%]" />
        <Skeleton className="h-6 w-[20%]" />
        <Skeleton className="h-6 w-[10%]" />
      </div>
    </div>
  )
}

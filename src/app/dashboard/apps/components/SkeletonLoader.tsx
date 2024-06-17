import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="py-4 ">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="w-[250px] h-6" />
        </div>
        <div className="flex gap-3 ">
          <Skeleton className="w-[250px] h-56" />
          <Skeleton className="w-[250px] h-56" />
          <Skeleton className="w-[250px] h-56" />
          <Skeleton className="w-[250px] h-56" />
        </div>
      </div>

      <div className="py-4 ">
        <div className="flex  justify-between items-center mb-4">
          <Skeleton className="w-[250px] h-6" />
        </div>
        <div className="flex gap-3 ">
          <Skeleton className="w-[250px] h-56" />
          <Skeleton className="w-[250px] h-56" />
          <Skeleton className="w-[250px] h-56" />
          <Skeleton className="w-[250px] h-56" />
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from '@/components/ui/skeleton'
//TODO:adjust to match the exact AppsLayout
export function SkeletonLoader() {
  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <div className="p-4">
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

      <div className="p-4">
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

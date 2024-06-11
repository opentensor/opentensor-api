import { cn } from '@/_utils/cn'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/30', className)} {...props} />
}

export { Skeleton }

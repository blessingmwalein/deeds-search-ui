import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 rounded-xl mb-2" />
        <Skeleton className="h-4 w-80 rounded-lg" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-background p-5 border border-border">
            <Skeleton className="h-10 w-10 rounded-full mb-3" />
            <Skeleton className="h-7 w-16 rounded-lg mb-1" />
            <Skeleton className="h-3.5 w-24 rounded-md" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-background p-6 border border-border">
          <Skeleton className="h-5 w-32 rounded-lg mb-5" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 mb-3 rounded-xl p-3">
              <Skeleton className="h-9 w-9 rounded-full shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-64 rounded-md mb-1" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-background p-6 border border-border">
          <Skeleton className="h-5 w-28 rounded-lg mb-5" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-3 rounded-xl p-3">
              <Skeleton className="h-4 w-32 rounded-md mb-1.5" />
              <Skeleton className="h-3 w-48 rounded-md mb-1" />
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <Skeleton className="h-8 w-56 rounded-xl mb-2" />
      <Skeleton className="h-4 w-72 rounded-lg mb-6" />

      {/* Search bar skeleton */}
      <Skeleton className="h-14 w-full rounded-full mb-6" />

      {/* Results header */}
      <Skeleton className="h-4 w-32 rounded-md mb-4" />

      {/* Results grid skeleton */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-background border border-border p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-28 rounded-md mb-1" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full rounded-md mb-4" />
            <div className="grid grid-cols-2 gap-2 mb-5">
              <Skeleton className="h-3.5 w-32 rounded-md" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
              <Skeleton className="h-3.5 w-36 rounded-md col-span-2" />
            </div>
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

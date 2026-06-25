// Pure Tailwind skeleton — no shadcn/ui dependency.
// shadcn/ui is added after cloning via: npx shadcn@latest init
// Once added, you can upgrade this to use <Skeleton /> from @/components/ui/skeleton

export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-10 w-32 bg-gray-200 rounded" />
      </div>
      <div className="rounded-lg border p-6 space-y-4 bg-white">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 flex-1 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

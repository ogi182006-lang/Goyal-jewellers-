export function ProductCardSkeleton() {
  return (
    <div className="bg-[#161616] border border-[#2A2A2A] overflow-hidden animate-pulse">
      <div className="aspect-square bg-[#1E1E1E]" />
      <div className="p-4 space-y-3">
        <div className="h-2 w-16 bg-[#2A2A2A] rounded" />
        <div className="h-4 w-full bg-[#2A2A2A] rounded" />
        <div className="h-4 w-3/4 bg-[#2A2A2A] rounded" />
        <div className="h-5 w-24 bg-[#2A2A2A] rounded" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

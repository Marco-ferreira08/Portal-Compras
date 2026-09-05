function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-stone-200 bg-white motion-reduce:animate-none dark:border-stone-800 dark:bg-stone-900">
      <div className="h-44 w-full bg-stone-100 dark:bg-stone-800" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-1/3 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-full rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-5 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="mt-2 h-10 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
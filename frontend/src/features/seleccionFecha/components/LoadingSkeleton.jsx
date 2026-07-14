import { Skeleton } from "@heroui/react";

export default function LoadingSkeleton() {
  return (
    <div className="fade-in">
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-24 rounded-xl shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

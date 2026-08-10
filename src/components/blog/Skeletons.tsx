export function PostCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/9] w-full rounded-2xl bg-muted" />
      <div className="mt-3 h-3 w-32 rounded bg-muted" />
      <div className="mt-1.5 h-5 w-3/4 rounded bg-muted" />
      <div className="mt-2 h-3 w-full rounded bg-muted" />
      <div className="mt-1 h-3 w-5/6 rounded bg-muted" />
    </div>
  );
}

export function DestinationCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] w-full rounded-2xl bg-muted" />
    </div>
  );
}

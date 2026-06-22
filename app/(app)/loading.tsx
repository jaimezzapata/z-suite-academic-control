export default function AppLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-56 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-4 w-80 animate-pulse rounded-xl bg-slate-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-10 w-36 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white"
          />
        ))}
      </div>

      <div className="h-[420px] animate-pulse rounded-[1.75rem] border border-slate-200 bg-white" />
    </div>
  );
}

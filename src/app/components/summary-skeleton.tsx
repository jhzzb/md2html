export default function SummarySkeleton() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      {/* Article info skeleton */}
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
      </div>

      {/* Card skeletons */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="h-3 w-32 rounded bg-slate-200" />
            <div className="h-3 w-3 rounded bg-slate-200" />
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400">
        <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Generating summary...
      </div>
    </div>
  );
}

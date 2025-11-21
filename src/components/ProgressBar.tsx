interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Progress</span>
        <span className="text-sm font-black text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">{current}/{total} Completed</span>
      </div>
      <div className="relative">
        <div className="w-full h-4 bg-gradient-to-r from-slate-800 to-slate-900 rounded-full overflow-hidden border border-emerald-400/30 shadow-lg shadow-black/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-transparent to-cyan-300 opacity-50"></div>
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {percentage.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}

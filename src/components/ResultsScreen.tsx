import {
  Trophy,
  RotateCcw,
  FileText,
  ExternalLink,
  Star,
  Target,
} from "lucide-react";

interface ResultsScreenProps {
  score: number;
  maxScore: number;
  totalItems: number;
  onRestart: () => void;
}

export default function ResultsScreen({
  score,
  maxScore,
  totalItems,
  onRestart,
}: ResultsScreenProps) {
  const percentage = (score / maxScore) * 100;
  const correctAnswers = score / 10;

  const getPerformanceMessage = () => {
    if (percentage === 100)
      return {
        text: "Perfect Score!",
        badge: "LEGENDARY",
        color: "from-emerald-400 to-teal-400",
      };
    if (percentage >= 80)
      return {
        text: "Excellent Work!",
        badge: "ELITE",
        color: "from-teal-400 to-cyan-400",
      };
    if (percentage >= 60)
      return {
        text: "Good Job!",
        badge: "PROFICIENT",
        color: "from-cyan-400 to-emerald-400",
      };
    if (percentage >= 40)
      return {
        text: "Keep Learning!",
        badge: "NOVICE",
        color: "from-yellow-400 to-orange-400",
      };
    return {
      text: "Try Again!",
      badge: "BEGINNER",
      color: "from-orange-400 to-red-400",
    };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
      <div className="space-y-3">
        <p
          className={`text-4xl font-black bg-gradient-to-r ${performance.color} bg-clip-text text-transparent`}
        >
          {performance.text}
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl"></div>

          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-2xl rounded-3xl border border-emerald-400/30 p-12 shadow-2xl">
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-8xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  {score}
                </div>
                <div className="text-slate-300 text-xl font-semibold">
                  out of {maxScore} points
                </div>
              </div>

              <div className="w-full bg-slate-700/50 rounded-xl h-4 overflow-hidden border border-emerald-400/30">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/50 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <Target className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-emerald-300">
                    {totalItems}
                  </div>
                  <div className="text-xs text-emerald-200/70 uppercase tracking-wider mt-1">
                    Total Items
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-400/50 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <Star className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-teal-300">
                    {correctAnswers}
                  </div>
                  <div className="text-xs text-teal-200/70 uppercase tracking-wider mt-1">
                    Correct
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-400/50 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <Trophy className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-cyan-300">
                    {percentage.toFixed(0)}%
                  </div>
                  <div className="text-xs text-cyan-200/70 uppercase tracking-wider mt-1">
                    Accuracy
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-emerald-400/10">
                <p className="text-slate-300 text-sm mb-4">
                  {percentage === 100 &&
                    "You've mastered digital ethics. Keep spreading awareness!"}
                  {percentage >= 80 &&
                    percentage < 100 &&
                    "Excellent understanding of cyber-ethics. You're well on your way!"}
                  {percentage >= 60 &&
                    percentage < 80 &&
                    "Good grasp of the concepts. Keep learning to improve further."}
                  {percentage < 60 &&
                    "Take time to understand each concept better. Practice makes perfect!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <button
          onClick={onRestart}
          className="group flex-1 relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-3">
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </div>
        </button>

        <a
          href="/Information-Technology-Intermediary-Guidelines-and-Digital-Media-Ethics-Code-Rules-2021-update.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-3">
            <FileText className="w-5 h-5" />
            Digital Media Ethics Code 2021
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>
      </div>

      <div className="w-full max-w-2xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-400/40 rounded-2xl p-6 backdrop-blur-md">
        <p className="text-emerald-200 text-sm leading-relaxed">
          Remember: Digital responsibility protects everyone. Learn more about
          digital media ethics and IT intermediary guidelines by reading the
          official rules document.
        </p>
      </div>
    </div>
  );
}

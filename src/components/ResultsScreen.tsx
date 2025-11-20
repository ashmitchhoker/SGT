import { Trophy, RotateCcw, AlertTriangle, ExternalLink } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  maxScore: number;
  totalItems: number;
  onRestart: () => void;
}

export default function ResultsScreen({ score, maxScore, totalItems, onRestart }: ResultsScreenProps) {
  const percentage = (score / maxScore) * 100;

  const getPerformanceMessage = () => {
    if (percentage === 100) return { text: 'Perfect Score!', color: 'text-yellow-400', emoji: '🏆' };
    if (percentage >= 80) return { text: 'Excellent Work!', color: 'text-green-400', emoji: '🌟' };
    if (percentage >= 60) return { text: 'Good Job!', color: 'text-blue-400', emoji: '👍' };
    if (percentage >= 40) return { text: 'Keep Learning!', color: 'text-orange-400', emoji: '📚' };
    return { text: 'Try Again!', color: 'text-red-400', emoji: '💪' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-20 animate-pulse"></div>
        <Trophy className="w-24 h-24 text-yellow-400 relative z-10 animate-float" />
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Test Complete!
        </h1>
        <p className={`text-3xl font-bold ${performance.color}`}>
          {performance.text}
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl opacity-20"></div>
        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            {score}
          </div>
          <div className="text-slate-400 text-lg">
            out of {maxScore} points
          </div>
          <div className="mt-4 text-slate-300">
            {totalItems - (score / 10)} incorrect answers
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-cyan-400">{totalItems}</div>
          <div className="text-sm text-slate-400">Questions</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-green-400">{score / 10}</div>
          <div className="text-sm text-slate-400">Correct</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-blue-400">{percentage.toFixed(0)}%</div>
          <div className="text-sm text-slate-400">Accuracy</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onRestart}
          className="group relative px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-lg text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>

        <a
          href="https://cybercrime.gov.in/webform/crmcondi.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-lg text-white shadow-lg shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
        >
          <AlertTriangle className="w-5 h-5" />
          Report Crime
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 max-w-2xl">
        <p className="text-blue-300 text-sm">
          If you encounter cybercrime or unethical content online, report it immediately to the authorities using the link above.
        </p>
      </div>
    </div>
  );
}

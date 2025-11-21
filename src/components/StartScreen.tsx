import { Scale, Lock, Eye, Play, Zap, Shield } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-teal-500 blur-2xl opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="relative p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full border-2 border-emerald-400/50 backdrop-blur-md">
          <Shield className="w-24 h-24 text-emerald-300 animate-float" />
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-slideDown mb-3">
            Digital Responsibility
          </h1>
          <p
            className="text-2xl md:text-3xl font-bold text-slate-100 animate-slideDown"
            style={{ animationDelay: "100ms" }}
          >
            Know What's Legal to Share
          </p>
        </div>

        <div
          className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-2 border-emerald-400/60 rounded-2xl p-6 backdrop-blur-sm animate-slideUp group hover:border-emerald-300/80 transition-all"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-start gap-3 mb-3">
            <Scale className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="text-slate-200 font-semibold">Did you know?</p>
              <p className="text-slate-300 text-sm mt-1">
                Sharing unethical or harmful content online can violate
                cybercrime laws. In many countries, this can result in fines,
                legal action, or imprisonment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-600/15 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/40 hover:border-emerald-300/80 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
            <Eye className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-slate-100">Privacy</div>
            <div className="text-xs text-slate-400 mt-1">
              Respect personal data
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-500/15 to-teal-600/15 backdrop-blur-sm rounded-xl p-4 border border-teal-400/40 hover:border-teal-300/80 transition-all hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20">
            <Zap className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-slate-100">Ethics</div>
            <div className="text-xs text-slate-400 mt-1">
              Do no digital harm
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/15 to-cyan-600/15 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/40 hover:border-cyan-300/80 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
            <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-slate-100">Safety</div>
            <div className="text-xs text-slate-400 mt-1">
              Keep yourself secure
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col sm:flex-row gap-4 items-center animate-slideUp"
        style={{ animationDelay: "300ms" }}
      >
        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-bold text-lg text-white shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 hover:scale-110 flex items-center gap-3 border border-emerald-400/60 hover:border-emerald-300"
        >
          <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Start Challenge
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
        </button>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-xl animate-slideUp"
        style={{ animationDelay: "400ms" }}
      >
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-lg p-4 border border-emerald-400/40 hover:scale-105 transition-transform">
          <div className="text-2xl font-black text-emerald-300">7</div>
          <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
            Random Scenarios
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 backdrop-blur-sm rounded-lg p-4 border border-teal-400/40 hover:scale-105 transition-transform">
          <div className="text-2xl font-black text-teal-300">70</div>
          <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
            Points Possible
          </div>
        </div>
      </div>

      <p
        className="text-xs text-slate-500 mt-4 max-w-xl animate-slideUp"
        style={{ animationDelay: "500ms" }}
      >
        Education matters. Learn to make ethical decisions online and protect
        yourself and others from cybercrime.
      </p>
    </div>
  );
}

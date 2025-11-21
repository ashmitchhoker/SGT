import { useEffect, useRef } from "react";
import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown, Zap } from "lucide-react";
import { MediaItem } from "../data/mediaItems";
import ProgressBar from "./ProgressBar";

interface GameScreenProps {
  currentItem: MediaItem;
  currentIndex: number;
  totalItems: number;
  score: number;
  feedback: "correct" | "incorrect" | null;
  onAnswer: (answer: boolean) => void;
  answeredItems: boolean[];
}

export default function GameScreen({
  currentItem,
  currentIndex,
  totalItems,
  score,
  feedback,
  onAnswer,
  answeredItems,
}: GameScreenProps) {
  const isDisabled = feedback !== null;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get base URL for GitHub Pages (e.g., /SGT/)
  const baseUrl = import.meta.env.BASE_URL || "/";
  const mediaSrc = currentItem.src.startsWith("/")
    ? `${baseUrl}${currentItem.src.slice(1)}`
    : `${baseUrl}${currentItem.src}`;

  // Auto-play video when it changes
  useEffect(() => {
    if (currentItem.type === "video" && videoRef.current) {
      // Only load if not already loaded to avoid unnecessary reloads
      // This preserves browser cache
      if (videoRef.current.readyState === 0) {
        videoRef.current.load();
      }
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        // If autoplay is blocked, video will still show and user can click play
      });
    }
  }, [mediaSrc, currentIndex]);

  return (
    <div className="flex flex-col items-center space-y-6 animate-fadeIn">
      <div className="w-full bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-md rounded-2xl border border-emerald-400/30 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20"></div>
            <div className="relative px-4 py-2 bg-emerald-500/20 border border-emerald-400/50 rounded-lg">
              <span className="text-emerald-400 font-bold text-lg">
                {currentIndex + 1}/{totalItems}
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-teal-500 blur-lg opacity-20"></div>
          <div className="relative px-6 py-2 bg-teal-500/20 border border-teal-400/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 font-bold text-lg">{score}</span>
            </div>
          </div>
        </div>
      </div>

      <ProgressBar current={answeredItems.length} total={totalItems} />

      <div className="w-full group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"></div>

        <div className="relative w-full bg-gradient-to-br from-slate-800/60 via-slate-900/60 to-slate-900/80 backdrop-blur-2xl rounded-3xl border border-emerald-400/20 shadow-2xl overflow-hidden">
          <div className="relative">
            {currentItem.type === "image" ? (
              <div className="relative w-full h-[400px] md:h-[500px] bg-slate-900/50 flex items-center justify-center">
                <img
                  src={encodeURI(mediaSrc)}
                  alt={currentItem.caption}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    console.error("Image load error:", mediaSrc);
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="relative w-full h-[400px] md:h-[500px] bg-slate-900/50 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={encodeURI(mediaSrc)}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-full object-contain"
                  preload="metadata"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.error("Video load error:", e, "Path:", mediaSrc);
                    const target = e.target as HTMLVideoElement;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = "none";
                      const errorDiv = document.createElement("div");
                      errorDiv.className = "text-red-400 p-4 text-center";
                      errorDiv.textContent = `Failed to load video: ${mediaSrc}`;
                      parent.appendChild(errorDiv);
                    }
                  }}
                />
              </div>
            )}

            {feedback && (
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn`}
              >
                <div
                  className={`flex flex-col items-center space-y-6 p-12 rounded-3xl border-2 ${
                    feedback === "correct"
                      ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-emerald-400 shadow-2xl shadow-emerald-500/50"
                      : "bg-gradient-to-br from-red-500/30 to-orange-500/30 border-red-400 shadow-2xl shadow-red-500/50"
                  }`}
                >
                  {feedback === "correct" ? (
                    <>
                      <CheckCircle2 className="w-24 h-24 text-emerald-300 animate-scaleIn" />
                      <p className="text-4xl font-black text-emerald-300">
                        Correct!
                      </p>
                      <p className="text-emerald-200 text-lg font-semibold">
                        +10 Points
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-24 h-24 text-red-300 animate-scaleIn" />
                      <p className="text-4xl font-black text-red-300">
                        Incorrect
                      </p>
                      <p className="text-red-200 text-lg font-semibold">
                        0 Points
                      </p>
                    </>
                  )}
                  {currentItem.explanation && (
                    <div className="mt-6 pt-6 border-t border-white/20 max-w-lg">
                      <p className="text-white/90 text-center text-sm leading-relaxed">
                        {currentItem.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Is this content unethical or harmful to upload?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => onAnswer(true)}
                disabled={isDisabled}
                className="group relative overflow-hidden px-6 py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-orange-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-700 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <ThumbsDown className="w-5 h-5 group-hover:rotate-12 group-active:rotate-0 transition-transform" />
                  <span>Yes - Unethical</span>
                </div>
              </button>

              <button
                onClick={() => onAnswer(false)}
                disabled={isDisabled}
                className="group relative overflow-hidden px-6 py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-cyan-700 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <ThumbsUp className="w-5 h-5 group-hover:-rotate-12 group-active:rotate-0 transition-transform" />
                  <span>No - Acceptable</span>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4 border-t border-emerald-400/10">
              <div className="h-1 w-1 rounded-full bg-slate-500"></div>
              <p className="text-slate-400 text-sm">
                Consider privacy, safety, legality, and ethical implications
              </p>
              <div className="h-1 w-1 rounded-full bg-slate-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

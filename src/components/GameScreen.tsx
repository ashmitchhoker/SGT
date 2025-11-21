import { useEffect, useRef } from "react";
import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
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
      <div className="w-full flex items-center justify-between mb-4">
        <div className="text-slate-300 font-medium">
          Question {currentIndex + 1} of {totalItems}
        </div>
        <div className="text-cyan-400 font-bold text-xl">Score: {score}</div>
      </div>

      <ProgressBar current={answeredItems.length} total={totalItems} />

      <div className="w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
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
              className={`absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn`}
            >
              <div
                className={`flex flex-col items-center space-y-4 p-8 rounded-2xl ${
                  feedback === "correct"
                    ? "bg-green-500/20 border-2 border-green-400"
                    : "bg-red-500/20 border-2 border-red-400"
                }`}
              >
                {feedback === "correct" ? (
                  <CheckCircle2 className="w-20 h-20 text-green-400 animate-scaleIn" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-400 animate-scaleIn" />
                )}
                <p
                  className={`text-2xl font-bold ${
                    feedback === "correct" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {feedback === "correct" ? "Correct!" : "Incorrect"}
                </p>
                {currentItem.explanation && (
                  <p className="text-white text-center max-w-md">
                    {currentItem.explanation}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white text-center">
            Is this content unethical or harmful to upload?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => onAnswer(true)}
              disabled={isDisabled}
              className="flex-1 group relative px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-lg text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              <ThumbsDown className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Yes - Unethical
            </button>

            <button
              onClick={() => onAnswer(false)}
              disabled={isDisabled}
              className="flex-1 group relative px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold text-lg text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              <ThumbsUp className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              No - Acceptable
            </button>
          </div>

          <p className="text-slate-400 text-sm text-center mt-4">
            Consider privacy, safety, legality, and ethical implications
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { mediaItems, MediaItem } from "./data/mediaItems";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultsScreen from "./components/ResultsScreen";

type GameState = "start" | "playing" | "results";

const TOTAL_QUESTIONS = 10;
const PREFERRED_IMAGE_COUNT = 7;
const PREFERRED_VIDEO_COUNT = 3;
const POINTS_PER_QUESTION = 10;

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Select 10 random items with preference for 7 images and 3 videos
function selectRandomItems(items: MediaItem[]): MediaItem[] {
  // Separate images and videos
  const images = items.filter((item) => item.type === "image");
  const videos = items.filter((item) => item.type === "video");

  // Shuffle both arrays
  const shuffledImages = shuffleArray(images);
  const shuffledVideos = shuffleArray(videos);

  // Try to get preferred distribution
  const selectedImages = shuffledImages.slice(0, PREFERRED_IMAGE_COUNT);
  const selectedVideos = shuffledVideos.slice(0, PREFERRED_VIDEO_COUNT);

  // If we don't have enough images or videos, fill with the other type
  const selected: MediaItem[] = [...selectedImages, ...selectedVideos];

  // If we still don't have enough items, fill from remaining pool
  if (selected.length < TOTAL_QUESTIONS) {
    const remaining = shuffleArray([
      ...shuffledImages.slice(PREFERRED_IMAGE_COUNT),
      ...shuffledVideos.slice(PREFERRED_VIDEO_COUNT),
    ]);
    const needed = TOTAL_QUESTIONS - selected.length;
    selected.push(...remaining.slice(0, needed));
  }

  // Final shuffle to randomize the order
  return shuffleArray(selected).slice(0, TOTAL_QUESTIONS);
}

const DAILY_COUNT_STORAGE_KEY = "dailyGameCounts";
const GET_COUNT_URL = "/.netlify/functions/get-daily-count";
const INCREMENT_COUNT_URL = "/.netlify/functions/increment-daily-count";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [answeredItems, setAnsweredItems] = useState<boolean[]>([]);
  const [selectedItems, setSelectedItems] = useState<MediaItem[]>([]);
  const [dailyPlayCount, setDailyPlayCount] = useState(0);

  const totalItems = selectedItems.length;
  const maxScore = totalItems * POINTS_PER_QUESTION;

  // Preload all media files when items are selected to improve performance
  useEffect(() => {
    if (selectedItems.length > 0) {
      const baseUrl = import.meta.env.BASE_URL || "/";

      selectedItems.forEach((item) => {
        const mediaSrc = item.src.startsWith("/")
          ? `${baseUrl}${item.src.slice(1)}`
          : `${baseUrl}${item.src}`;
        const encodedSrc = encodeURI(mediaSrc);

        if (item.type === "image") {
          const img = new Image();
          img.src = encodedSrc;
        } else if (item.type === "video") {
          const video = document.createElement("video");
          video.preload = "metadata"; // Load metadata for faster display
          video.src = encodedSrc;
          // Don't add to DOM, just preload for cache
        }
      });
    }
  }, [selectedItems]);

  useEffect(() => {
    const todayKey = getTodayKey();

    // Try global count first (Netlify Function). Fallback to localStorage.
    const fetchGlobalCount = async () => {
      try {
        const res = await fetch(GET_COUNT_URL, { cache: "no-store" });
        if (res.ok) {
          const json = (await res.json()) as { date: string; count: number };
          if (json && typeof json.count === "number") {
            setDailyPlayCount(json.count);
            return;
          }
        }
        // If response not ok, fallback
        throw new Error(`GET count failed: ${res.status}`);
      } catch (err) {
        try {
          const storedCounts = localStorage.getItem(DAILY_COUNT_STORAGE_KEY);
          if (storedCounts) {
            const parsed = JSON.parse(storedCounts) as Record<string, number>;
            setDailyPlayCount(parsed[todayKey] || 0);
          } else {
            setDailyPlayCount(0);
          }
        } catch (error) {
          console.error("Failed to load daily play count (fallback):", error);
          setDailyPlayCount(0);
        }
      }
    };

    fetchGlobalCount();
  }, []);

  const incrementDailyPlayCount = async () => {
    const todayKey = getTodayKey();
    // Try global increment first
    try {
      const res = await fetch(INCREMENT_COUNT_URL, { method: "POST" });
      if (res.ok) {
        const json = (await res.json()) as { date: string; count: number };
        if (json && typeof json.count === "number") {
          setDailyPlayCount(json.count);
          return;
        }
      }
      throw new Error(`POST increment failed: ${res.status}`);
    } catch (error) {
      console.warn("Falling back to localStorage for daily count:", error);
      try {
        const storedCounts = localStorage.getItem(DAILY_COUNT_STORAGE_KEY);
        const parsed: Record<string, number> = storedCounts
          ? JSON.parse(storedCounts)
          : {};
        const updatedCount = (parsed[todayKey] || 0) + 1;
        parsed[todayKey] = updatedCount;
        localStorage.setItem(DAILY_COUNT_STORAGE_KEY, JSON.stringify(parsed));
        setDailyPlayCount(updatedCount);
      } catch (fallbackErr) {
        console.error(
          "Failed to update daily play count (fallback):",
          fallbackErr
        );
      }
    }
  };

  const startGame = () => {
    const randomItems = selectRandomItems(mediaItems);
    setSelectedItems(randomItems);
    setGameState("playing");
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setAnsweredItems([]);
  };

  const handleAnswer = (userAnswer: boolean) => {
    const currentItem = selectedItems[currentIndex];
    const isCorrect = currentItem.answer === userAnswer;

    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore((prev) => prev + POINTS_PER_QUESTION);
    }

    setAnsweredItems((prev) => [...prev, true]);

    setTimeout(() => {
      setFeedback(null);

      if (currentIndex >= totalItems - 1) {
        incrementDailyPlayCount();
        setGameState("results");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 1200);
  };

  const restartGame = () => {
    setGameState("start");
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setAnsweredItems([]);
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {gameState === "start" && (
          <StartScreen
            onStart={startGame}
            totalQuestions={TOTAL_QUESTIONS}
            maxScore={TOTAL_QUESTIONS * POINTS_PER_QUESTION}
          />
        )}

        {gameState === "playing" && selectedItems.length > 0 && (
          <GameScreen
            currentItem={selectedItems[currentIndex]}
            currentIndex={currentIndex}
            totalItems={totalItems}
            score={score}
            feedback={feedback}
            onAnswer={handleAnswer}
            answeredItems={answeredItems}
          />
        )}

        {gameState === "results" && (
          <ResultsScreen
            score={score}
            maxScore={maxScore}
            totalItems={totalItems}
            dailyPlayCount={dailyPlayCount}
            onRestart={restartGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;

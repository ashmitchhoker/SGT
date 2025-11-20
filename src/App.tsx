import { useState } from "react";
import { mediaItems, MediaItem } from "./data/mediaItems";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultsScreen from "./components/ResultsScreen";

type GameState = "start" | "playing" | "results";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Select 7 random items with preference for 5 images and 2 videos
function selectRandomItems(items: MediaItem[]): MediaItem[] {
  // Separate images and videos
  const images = items.filter((item) => item.type === "image");
  const videos = items.filter((item) => item.type === "video");

  // Shuffle both arrays
  const shuffledImages = shuffleArray(images);
  const shuffledVideos = shuffleArray(videos);

  // Try to get 5 images and 2 videos
  const selectedImages = shuffledImages.slice(0, 5);
  const selectedVideos = shuffledVideos.slice(0, 2);

  // If we don't have enough images or videos, fill with the other type
  const selected: MediaItem[] = [...selectedImages, ...selectedVideos];

  // If we still don't have 7 items, fill from remaining items
  if (selected.length < 7) {
    const remaining = shuffleArray([
      ...shuffledImages.slice(5),
      ...shuffledVideos.slice(2),
    ]);
    const needed = 7 - selected.length;
    selected.push(...remaining.slice(0, needed));
  }

  // Final shuffle to randomize the order
  return shuffleArray(selected);
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

  const totalItems = selectedItems.length;
  const maxScore = totalItems * 10;

  const startGame = () => {
    // Select 7 random items each time game starts
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
      setScore((prev) => prev + 10);
    }

    setAnsweredItems((prev) => [...prev, true]);

    setTimeout(() => {
      setFeedback(null);

      if (currentIndex >= totalItems - 1) {
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
        {gameState === "start" && <StartScreen onStart={startGame} />}

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
            onRestart={restartGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;

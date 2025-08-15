// src/context/GameContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import puzzleBank from "../data/puzzleBank";
import { lemmatize } from "../utils/lemmatizer";
import { isValidWord } from "../utils/dictionary";
import {
  loadGameState,
  saveGameState,
  loadStreak,
  saveStreak,
  clearGameState,
} from "../utils/storage";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [today, setToday] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const puzzle = useMemo(() => {
    return puzzleBank.find((p) => p.date === today);
  }, [today]);

  const [guesses, setGuesses] = useState([]);
  const [clueRevealed, setClueRevealed] = useState([0]);
  const [hintCount, setHintCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  // Load saved game state on mount or when date changes
  useEffect(() => {
    const state = loadGameState();

    if (state && state.date === today) {
      setGuesses(state.guesses);
      setClueRevealed(state.clueRevealed);
      setHintCount(state.hintCount);
      setSolved(state.solved);
      setWrongGuesses(state.wrongGuesses || []);
    } else {
      setGuesses([]);
      setClueRevealed([0]);
      setHintCount(0);
      setSolved(false);
      setWrongGuesses([]);
      setGameOver(false);
    }
  }, [today]);

  // Save game state on any state changes
  useEffect(() => {
    saveGameState({
      date: today,
      guesses,
      clueRevealed,
      hintCount,
      solved,
      wrongGuesses,
    });
  }, [guesses, clueRevealed, hintCount, solved, today, wrongGuesses]);

  // Update gameOver state
  useEffect(() => {
    if (solved || guesses.length >= 5) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  }, [solved, guesses]);

  const handleGuess = async (inputWord) => {
    const word = inputWord.trim().toLowerCase();

    if (solved || guesses.length >= 5) {
      return { success: false, message: "Game is already over.", type: "info" };
    }

    if (!word) {
      return {
        success: false,
        message: "Please enter a word.",
        type: "warning",
      };
    }

    if (word.includes(" ")) {
      return {
        success: false,
        message: "Please enter a single word only.",
        type: "warning",
      };
    }

    const guess = lemmatize(word);

    if (guesses.includes(guess)) {
      return {
        success: false,
        message: "You already guessed that.",
        type: "info",
      };
    }

    if (
      clueRevealed.map((i) => puzzle.clues[i].toLowerCase()).includes(guess)
    ) {
      return {
        success: false,
        message: "That's already a revealed clue!",
        type: "info",
      };
    }

    const clueIndex = puzzle.clues.findIndex((c) => c.toLowerCase() === guess);
    if (clueIndex !== -1 && !clueRevealed.includes(clueIndex)) {
      setClueRevealed([...clueRevealed, clueIndex]);
      return {
        success: true,
        message: `Clue revealed: "${puzzle.clues[clueIndex]}"`,
        type: "success",
        clueRevealed: true,
      };
    }

    const isRealWord = await isValidWord(guess);
    if (!isRealWord) {
      return {
        success: false,
        message: `"${guess}" is not a valid word.`,
        type: "error",
      };
    }

    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);

    if (guess === lemmatize(puzzle.answer)) {
      setSolved(true);

      const currentStreak = loadStreak();
      const lastDate = currentStreak.lastSolvedDate
        ? new Date(currentStreak.lastSolvedDate)
        : null;
      const todayDate = new Date(today);

      let newCount = 1;
      if (lastDate) {
        const diff = (todayDate - lastDate) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          newCount = currentStreak.count + 1;
        }
      }
      setStreakCount(newCount);
      saveStreak({ count: newCount, lastSolvedDate: today });
      return {
        success: true,
        message: "🎉 Correct! You solved it!",
        type: "success",
        solved: true,
      };
    } else {
      const remaining = 5 - nextGuesses.length;
      const guessWord = remaining === 1 ? "guess" : "guesses";

      setWrongGuesses([...wrongGuesses, guess]);

      // Reveal next clue if any
      const nextClue = [...Array(puzzle.clues.length).keys()].find(
        (i) => !clueRevealed.includes(i)
      );
      if (nextClue !== undefined) {
        setClueRevealed([...clueRevealed, nextClue]);
      }

      if (nextGuesses.length >= 5) {
        setStreakCount(0);
        saveStreak({ count: 0, lastSolvedDate: null });
        return {
          success: false,
          message: `You failed to solve today's puzzle. The answer was "${puzzle.answer}".`,
          type: "warning",
          gameOver: true,
        };
      } else {
        return {
          success: false,
          message: `Try again! You have ${remaining} ${guessWord} left.`,
          type: "warning",
        };
      }
    }
  };

  const revealHint = () => {
    if (hintCount < 2) {
      setHintCount(hintCount + 1);
      return true;
    }
    return false;
  };

  const resetGameState = () => {
    clearGameState(); // clear localStorage for the current game
    setGuesses([]);
    setClueRevealed([0]);
    setHintCount(0);
    setSolved(false);
    setWrongGuesses([]);
    setGameOver(false);
    setGameOver(false);
    setToday(new Date().toISOString().split("T")[0]);
  };

  return (
    <GameContext.Provider
      value={{
        puzzle,
        guesses,
        clueRevealed,
        hintCount,
        solved,
        wrongGuesses,
        gameOver,
        handleGuess,
        revealHint,
        streakCount,
        resetGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

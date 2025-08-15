import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useGame } from "../context/GameContext";

import Result from "../components/Result";
import Game from "../components/Game";

const HomePage = () => {
  const {
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
  } = useGame();

  const toast = useToast();
  const [word, setWord] = useState("");

  const onGuess = async (input) => {
    const result = await handleGuess(input);
    setWord("");

    if (!result) return;

    toast({
      title: result.message,
      status: result.type,
      duration: 3000,
      position: "top",
    });
  };

  return !gameOver ? (
    <Game
      puzzle={puzzle}
      wrongGuesses={wrongGuesses}
      onGuess={onGuess}
      word={word}
      clueRevealed={clueRevealed}
      setWord={setWord}
      guesses={guesses}
      hintCount={hintCount}
      revealHint={revealHint}
    />
  ) : (
    <Result
      attempts={guesses.length}
      hints={hintCount}
      solved={solved}
      streakCount={streakCount}
      onCountdownComplete={resetGameState}
    />
  );
};

export default HomePage;

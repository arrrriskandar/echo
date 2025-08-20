import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";

import Result from "../components/Result";
import Game from "../components/Game";
import dayCounter from "../utils/dayCounter";
import Header from "../components/PuzzleNumberHeader";
import { saveOnboardingState } from "../utils/storage";
import Onboarding from "../components/Onboarding";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

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
  const puzzleNumber = dayCounter();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeen) setShowOnboarding(true);
  }, []);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnboardingComplete = () => {
    saveOnboardingState();
    setShowOnboarding(false);
  };

  return (
    <>
      <Header puzzleNumber={puzzleNumber} />
      {!gameOver ? (
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
      )}
      <Modal
        isOpen={showOnboarding}
        onClose={handleOnboardingComplete}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalCloseButton />
          <ModalBody>
            <Onboarding onComplete={handleOnboardingComplete} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;

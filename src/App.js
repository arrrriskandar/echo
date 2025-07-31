import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import puzzleBank from "./data/puzzleBank";
import { lemmatize } from "./utils/lemmatizer";
import { isValidWord } from "./utils/dictionary";
import { loadGameState, saveGameState } from "./utils/storage";
import ClueList from "./components/ClueList";
import GuessInput from "./components/GuessInput";
import HintBox from "./components/HintBox";
import ResultBox from "./components/ResultBox";
import Onboarding from "./components/Onboarding";
import GuessList from "./components/GuessList";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function App() {
  const toast = useToast();
  const today = new Date().toISOString().split("T")[0];
  const puzzle = puzzleBank.find((p) => p.date === today);

  const [guesses, setGuesses] = useState([]);
  const [clueRevealed, setClueRevealed] = useState([0]);
  const [hintCount, setHintCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState(false);
  const [word, setWord] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isOpen, onOpen } = useDisclosure();
  const [wrongGuesses, setWrongGuesses] = useState([]);

  useEffect(() => {
    if (solved || guesses.length >= 5) {
      onOpen();
    }
  }, [solved, guesses.length, onOpen]);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    const state = loadGameState();
    if (state && state.date === today) {
      setGuesses(state.guesses);
      setClueRevealed(state.clueRevealed);
      setHintCount(state.hintCount);
      setStreak(state.streak);
      setSolved(state.solved);
      setWrongGuesses(state.wrongGuesses || []);
    }
  }, [today]);

  useEffect(() => {
    saveGameState({
      date: today,
      guesses,
      clueRevealed,
      hintCount,
      streak,
      solved,
      wrongGuesses,
    });
  }, [guesses, clueRevealed, hintCount, streak, solved, today, wrongGuesses]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  const handleGuess = async (w) => {
    setWord("");
    if (solved || guesses.length >= 5) {
      return;
    }
    if (!w) {
      toast({
        title: "Please enter a word.",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }

    if (w.includes(" ")) {
      toast({
        title: "Please enter a single word only.",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }

    const guess = lemmatize(w.trim().toLowerCase());

    if (guesses.includes(guess)) {
      toast({
        title: "You already guessed that.",
        status: "info",
        duration: 2000,
        position: "top",
      });
      return;
    }

    if (
      clueRevealed.map((i) => puzzle.clues[i].toLowerCase()).includes(guess)
    ) {
      toast({
        title: "That's already a revealed clue!",
        status: "info",
        duration: 2000,
        position: "top",
      });
      return;
    }

    const clueIndex = puzzle.clues.findIndex((c) => c.toLowerCase() === guess);
    if (clueIndex !== -1 && !clueRevealed.includes(clueIndex)) {
      setClueRevealed([...clueRevealed, clueIndex]);
      toast({
        title: `Clue revealed: "${puzzle.clues[clueIndex]}"`,
        status: "success",
        duration: 2000,
        position: "top",
      });
      return;
    }

    const isRealWord = await isValidWord(guess);
    if (!isRealWord) {
      toast({
        title: `"${guess}" is not a valid word.`,
        status: "error",
        duration: 2000,
        position: "top",
      });
      return;
    }

    setGuesses([...guesses, guess]);

    if (guess === lemmatize(puzzle.answer)) {
      setSolved(true);
      setStreak(streak + 1);
      toast({
        title: "🎉 Correct! You solved it!",
        status: "success",
        duration: 3000,
        position: "top",
      });
    } else {
      toast({
        title: `"${guess}" is incorrect.`,
        status: "warning",
        duration: 2000,
        position: "top",
      });
      setWrongGuesses([...wrongGuesses, guess]);

      // Reveal next clue if available
      const nextClue = [...Array(puzzle.clues.length).keys()].find(
        (i) => !clueRevealed.includes(i)
      );
      if (nextClue !== undefined) {
        setClueRevealed([...clueRevealed, nextClue]);
      }
    }
  };

  const revealHint = () => {
    if (hintCount < 2) setHintCount(hintCount + 1);
  };

  return (
    <ChakraProvider theme={theme}>
      {showOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Box maxW="md" mx="auto" mt={10} p={4}>
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            Echo
          </Text>
          <ClueList clues={puzzle.clues} revealed={clueRevealed} />
          <GuessInput onGuess={handleGuess} guess={word} setGuess={setWord} />
          {guesses.length < 4 ? (
            <Text mb={2} fontSize="md" color="gray.400">
              Guess {guesses.length + 1} of 5
            </Text>
          ) : (
            <Text mb={2} fontSize="md" color="red.400" fontWeight="bold">
              Final guess
            </Text>
          )}
          <HintBox
            hints={[puzzle.hint1, puzzle.hint2]}
            revealed={hintCount}
            onReveal={revealHint}
          />
          {wrongGuesses.length > 0 && <GuessList wrongGuesses={wrongGuesses} />}
          <Modal isOpen={isOpen} isCentered>
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(8px)" />
            <ModalContent>
              <ModalHeader>{solved ? "🎉 You Won!" : "Game Over"}</ModalHeader>
              <ModalBody>
                <ResultBox
                  attempts={guesses.length}
                  hints={hintCount}
                  streak={streak}
                  solved={solved}
                  answer={puzzle.answer}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;

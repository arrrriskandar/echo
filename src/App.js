import {
  ChakraProvider,
  extendTheme,
  Box,
  useToast,
  Image,
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
import SideMenu from "./components/SideMenu";
import About from "./components/About";
import Instructions from "./components/Instructions";
import Contact from "./components/Contact";
import Support from "./components/Support";
import Privacy from "./components/Privacy";
import SideMenuContentModal from "./components/SideMenuContentModal";

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
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [lastSolvedDate, setLastSolvedDate] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleSelect = (modalKey) => {
    setActiveModal(modalKey);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const contentMap = {
    about: <About />,
    instructions: <Instructions />,
    contact: <Contact />,
    privacy: <Privacy />,
    support: <Support />,
  };

  useEffect(() => {
    if (solved || guesses.length >= 5) {
      if (!solved) {
        setStreak(0);
      }
      setGameOver(true);
    }
  }, [solved, guesses.length]);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    const state = loadGameState();

    if (state && state.date === today) {
      // same day, load everything
      setGuesses(state.guesses);
      setClueRevealed(state.clueRevealed);
      setHintCount(state.hintCount);
      setStreak(state.streak);
      setSolved(state.solved);
      setWrongGuesses(state.wrongGuesses || []);
      setLastSolvedDate(state.lastSolvedDate || null);
    } else {
      // new day — evaluate streak
      let newStreak = 0;

      if (state?.solved && state?.lastSolvedDate) {
        const last = new Date(state.lastSolvedDate);
        const current = new Date(today);
        const diff = (current - last) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          newStreak = state.streak; // continue streak
        }
      }

      setStreak(newStreak);
      setGuesses([]);
      setClueRevealed([0]);
      setHintCount(0);
      setSolved(false);
      setWrongGuesses([]);
      setLastSolvedDate(null);
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
      lastSolvedDate,
    });
  }, [
    guesses,
    clueRevealed,
    hintCount,
    streak,
    solved,
    today,
    wrongGuesses,
    lastSolvedDate,
  ]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  const handleGuess = async (w) => {
    setWord("");
    if (solved || guesses.length >= 5) {
      return;
    }
    const word = w.trim().toLowerCase();
    if (!word) {
      toast({
        title: "Please enter a word.",
        status: "warning",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (word.includes(" ")) {
      toast({
        title: "Please enter a single word only.",
        status: "warning",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const guess = lemmatize(word);

    if (guesses.includes(guess)) {
      toast({
        title: "You already guessed that.",
        status: "info",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (
      clueRevealed.map((i) => puzzle.clues[i].toLowerCase()).includes(guess)
    ) {
      toast({
        title: "That's already a revealed clue!",
        status: "info",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const clueIndex = puzzle.clues.findIndex((c) => c.toLowerCase() === guess);
    if (clueIndex !== -1 && !clueRevealed.includes(clueIndex)) {
      setClueRevealed([...clueRevealed, clueIndex]);
      toast({
        title: `Clue revealed: "${puzzle.clues[clueIndex]}"`,
        status: "success",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const isRealWord = await isValidWord(guess);
    if (!isRealWord) {
      toast({
        title: `"${guess}" is not a valid word.`,
        status: "error",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);

    if (guess === lemmatize(puzzle.answer)) {
      setSolved(true);
      setStreak(streak + 1);
      setLastSolvedDate(today);
      toast({
        title: "🎉 Correct! You solved it!",
        status: "success",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const remaining = 5 - nextGuesses.length;
      const guessWord = remaining === 1 ? "guess" : "guesses";

      toast({
        title: `"${guess}" is incorrect.`,
        description:
          nextGuesses.length >= 5
            ? `You failed to solve today's puzzle. The answer was "${puzzle.answer}".`
            : `Try again! You have ${remaining} ${guessWord} left.`,
        status: "warning",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          <SideMenu onSelect={handleSelect} />
          <SideMenuContentModal
            isOpen={activeModal !== null}
            onClose={handleClose}
          >
            {activeModal && contentMap[activeModal]}
          </SideMenuContentModal>
          <Image src="/EchoBig.png" alt="Echo Logo" boxSize="100px" mx="auto" />
          {!gameOver ? (
            <>
              <ClueList clues={puzzle.clues} revealed={clueRevealed} />
              {wrongGuesses.length > 0 && (
                <GuessList wrongGuesses={wrongGuesses} />
              )}
              <GuessInput
                onGuess={handleGuess}
                guess={word}
                setGuess={setWord}
                guesses={guesses}
              />
              <HintBox
                hints={[puzzle.hint1, puzzle.hint2]}
                revealed={hintCount}
                onReveal={revealHint}
              />
            </>
          ) : (
            <ResultBox
              attempts={guesses.length}
              hints={hintCount}
              streak={streak}
              solved={solved}
              onCountdownComplete={() => {
                window.location.reload();
              }}
            />
          )}
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;

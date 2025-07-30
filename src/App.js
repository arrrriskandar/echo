// src/App.js
import {
  ChakraProvider,
  extendTheme,
  Box,
  Text,
  useToast,
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

  useEffect(() => {
    const state = loadGameState();
    if (state && state.date === today) {
      setGuesses(state.guesses);
      setClueRevealed(state.clueRevealed);
      setHintCount(state.hintCount);
      setStreak(state.streak);
      setSolved(state.solved);
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
    });
  }, [guesses, clueRevealed, hintCount, streak, solved, today]);

  const handleGuess = async (word) => {
    setWord("");
    const guess = lemmatize(word.trim().toLowerCase());

    if (!guess || guess.includes(" ")) {
      toast({
        title: "Enter a single word only.",
        status: "warning",
        duration: 2000,
      });
      return;
    }

    if (guesses.includes(guess)) {
      toast({
        title: "You already guessed that.",
        status: "info",
        duration: 2000,
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
      });
      return;
    }

    const isRealWord = await isValidWord(guess);
    if (!isRealWord) {
      toast({
        title: `"${guess}" is not a valid word.`,
        status: "error",
        duration: 2000,
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
      });
    } else {
      toast({
        title: `"${guess}" is incorrect.`,
        status: "warning",
        duration: 2000,
      });
    }
  };

  const revealHint = () => {
    if (hintCount < 2) setHintCount(hintCount + 1);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="md" mx="auto" mt={10} p={4}>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
          Echo
        </Text>
        <ClueList clues={puzzle.clues} revealed={clueRevealed} />
        <GuessInput onGuess={handleGuess} guess={word} setGuess={setWord} />
        <HintBox
          hints={[puzzle.hint1, puzzle.hint2]}
          revealed={hintCount}
          onReveal={revealHint}
        />
        <ResultBox
          attempts={guesses.length}
          hints={hintCount}
          streak={streak}
          solved={solved}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;

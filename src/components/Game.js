import ClueList from "./ClueList";
import GuessInput from "./GuessInput";
import HintBox from "./HintBox";
import GuessList from "./GuessList";

const Game = ({
  puzzle,
  wrongGuesses,
  onGuess,
  word,
  clueRevealed,
  setWord,
  guesses,
  hintCount,
  revealHint,
}) => {
  return (
    <>
      <ClueList clues={puzzle.clues} revealed={clueRevealed} />
      {wrongGuesses.length > 0 && <GuessList wrongGuesses={wrongGuesses} />}
      <GuessInput
        onGuess={onGuess}
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
  );
};

export default Game;

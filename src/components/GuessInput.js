import { Input, Button, HStack } from "@chakra-ui/react";

const GuessInput = ({ onGuess, guess, setGuess }) => {
  return (
    <HStack mt={4}>
      <Input
        placeholder="Your guess..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onGuess(guess)}
      />
      <Button onClick={() => onGuess(guess)}>Guess</Button>
    </HStack>
  );
};

export default GuessInput;

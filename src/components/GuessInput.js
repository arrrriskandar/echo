import { Input, VStack, Text } from "@chakra-ui/react";

const GuessInput = ({ onGuess, guess, setGuess, guesses }) => {
  return (
    <VStack align="left" mt={2}>
      <Input
        placeholder={`Guess ${guesses.length + 1} of 5`}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onGuess(guess)}
      />
      {guesses.length === 4 && (
        <Text fontSize="sm" color="gray.400">
          ⚠️ Final Guess
        </Text>
      )}
    </VStack>
  );
};

export default GuessInput;

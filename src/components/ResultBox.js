import { Text, VStack } from "@chakra-ui/react";

export default function ResultBox({ attempts, hints, streak, solved, answer }) {
  return (
    <VStack spacing={4} align="center" p={4}>
      {solved ? (
        <>
          <Text fontSize="xl" fontWeight="bold">
            Congratulations!
          </Text>
          <Text>
            You solved the puzzle in {attempts}{" "}
            {attempts === 1 ? "attempt" : "attempts"}.
          </Text>
          <Text>Hints used: {hints}</Text>
          <Text>Current streak: {streak}</Text>
        </>
      ) : (
        <>
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            Better luck next time!
          </Text>
          <Text>
            The answer was: <b>{answer}</b>
          </Text>
          <Text>Attempts used: {attempts}</Text>
          <Text>Hints used: {hints}</Text>
          <Text>Current streak: {streak}</Text>
        </>
      )}
    </VStack>
  );
}

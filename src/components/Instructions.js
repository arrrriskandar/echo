import { Box, Text, VStack, UnorderedList, ListItem } from "@chakra-ui/react";

const Instructions = () => {
  return (
    <Box p={4} pt={0}>
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">
          How to Play
        </Text>
        <Text>
          Echo is simple and fun! Here’s how you can play each daily puzzle:
        </Text>
        <UnorderedList spacing={3} pl={5}>
          <ListItem>Use the clues provided to guess the secret word.</ListItem>
          <ListItem>You have 5 guesses per day to find the answer.</ListItem>
          <ListItem>
            If your guess matches a clue word, that clue will be revealed — and
            it <strong>won't count</strong> as one of your 5 guesses.
          </ListItem>
          <ListItem>
            You can reveal up to 2 hints to help you get closer to the answer.
            {/* Hints are triggered by watching ads. */}
          </ListItem>
          <ListItem>
            Try to guess correctly to keep your winning streak alive!
          </ListItem>
        </UnorderedList>
        <Text fontStyle="italic" color="gray.400" fontSize="sm">
          Have fun and challenge yourself daily!
        </Text>
      </VStack>
    </Box>
  );
};

export default Instructions;

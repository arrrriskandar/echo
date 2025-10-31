import { Box, Text, VStack, Heading } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const AboutPage = () => {
  return (
    <Box p={4} pt={0}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="lg">
          About
        </Heading>
        <Text>
          Daily Echo Game is a quick and engaging daily word association game.
          Each day you’ll face a new challenge: uncover the secret word using
          carefully chosen one-word clues. It’s simple to pick up, but tricky
          enough to keep your mind sharp.
        </Text>
        <Text>
          The name <strong>“Echo”</strong> comes from the way the clues work.
          The first clue is strong and clear, while each one that follows grows
          softer and more abstract — just like an echo fading into the distance.
          This design makes every puzzle feel fresh, rewarding, and just the
          right amount of challenging.
        </Text>
        <Text>
          Daily Echo Game was built out of a love for puzzles and wordplay. My
          goal is to create a fun daily ritual — something small that brings a
          spark of curiosity and accomplishment to your day. I hope you enjoy
          playing as much as I enjoyed creating it!
        </Text>
        <Text fontSize="sm" color="gray.400">
          <InfoIcon color="blue.500" mr={1} />A new puzzle is released every day
          at 00:00 UTC (
          {new Date(
            Date.UTC(
              new Date().getUTCFullYear(),
              new Date().getUTCMonth(),
              new Date().getUTCDate()
            )
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}{" "}
          in your local time).
        </Text>
      </VStack>
    </Box>
  );
};

export default AboutPage;

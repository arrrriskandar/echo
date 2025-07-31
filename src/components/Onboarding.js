import { Box, Text, Button, VStack, Image } from "@chakra-ui/react";

const Onboarding = ({ onComplete }) => {
  return (
    <Box p={8} maxW="md" mx="auto" mt={12} textAlign="center">
      <VStack spacing={4}>
        <Image src="/EchoBig.png" alt="Echo Logo" boxSize="100px" mx="auto" />
        <Text>
          Every day, you'll solve a one-word puzzle using clues. You get 5
          guesses and can ask for hints if you're stuck. Your progress is
          tracked, so try to keep a streak going!
        </Text>
        <Text>
          Enter one word at a time. If you guess a clue, it will be revealed but
          won’t count as a guess.
        </Text>
        <Button colorScheme="teal" onClick={onComplete}>
          Got it! Let's Play
        </Button>
      </VStack>
    </Box>
  );
};

export default Onboarding;

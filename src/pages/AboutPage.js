import { Box, Text, VStack } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Box p={4} pt={0}>
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">
          About Echo
        </Text>
        <Text>
          Echo is a daily word guessing game that challenges your wits with
          carefully crafted clues and hints. Each day, try to guess the secret
          word using the clues provided — it's fun, quick, and a great way to
          keep your brain sharp!
        </Text>
        <Text>
          Built with love and a passion for puzzles, Echo aims to brighten your
          day with a bit of friendly brain exercise. I hope you enjoy playing as
          much as I enjoyed creating it!
        </Text>
      </VStack>
    </Box>
  );
};
export default AboutPage;

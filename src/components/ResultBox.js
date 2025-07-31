import { Text, VStack, Button, Box, Image } from "@chakra-ui/react";
import FallingEffect from "./FallingEffect";

export default function ResultBox({ attempts, hints, streak, solved }) {
  const maxAttempts = 5;

  // Build an array of length maxAttempts with emojis:
  // For solved: attempts number of ✅, rest ⚪️
  // For not solved: attempts number of ❌, rest ⚪️
  const emojiGuesses = Array.from({ length: maxAttempts }, (_, i) => {
    if (i < attempts) {
      return solved ? "✅" : "❌";
    }
    return "⚪️"; // empty slot for remaining attempts
  }).join(" ");

  const header = solved ? "🎉 You Won!" : "💀 Game Over";
  const hintLine = `💡 Hints used: ${hints}`;
  const streakLine = `🔥 Streak: ${streak}`;

  const shareText = `Echo 
${emojiGuesses}
${hintLine}
${streakLine} 
Play daily at: https://echo-three-silk.vercel.app/`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Result copied! Ready to share.");
    } catch {
      alert("Failed to copy result.");
    }
  };

  return (
    <Box position="relative" w="100%" h="100%">
      {solved && <FallingEffect emoji="🎉" />}
      {!solved && <FallingEffect emoji="💀" />}
      <VStack spacing={4} align="center" p={4}>
        <Image src="/EchoResult.png" alt="Echo Logo" height="70px" />
        <Text fontSize="xl" fontWeight="bold">
          {header}
        </Text>
        <Text fontSize="lg">{emojiGuesses}</Text>
        <Text>{hintLine}</Text>
        <Text>{streakLine}</Text>
        <Button size="sm" onClick={handleShare}>
          Share Result
        </Button>
      </VStack>
    </Box>
  );
}

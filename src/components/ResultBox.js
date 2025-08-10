import { Text, VStack, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ResultBox({
  attempts,
  hints,
  streak,
  solved,
  onCountdownComplete,
}) {
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
  const [countdown, setCountdown] = useState("");

  const shareText = `Echo 
${emojiGuesses}
${hintLine}
${streakLine} 
Play daily at: www.dailyechogame.com`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Result copied! Ready to share.");
    } catch {
      alert("Failed to copy result.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextUtcMidnight = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1, // next UTC day
          0,
          0,
          0
        )
      );

      const diff = nextUtcMidnight - now;

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown("00:00:00");
        if (onCountdownComplete) onCountdownComplete(); // trigger reset
        return;
      }

      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(
        2,
        "0"
      );

      setCountdown(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [onCountdownComplete]);

  return (
    <Box position="relative" w="100%" h="100%">
      <VStack spacing={4} align="center" p={4}>
        <Box p={2} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            {header}
          </Text>
        </Box>
        <Text fontSize="lg">{emojiGuesses}</Text>
        <Text>{hintLine}</Text>
        <Text>{streakLine}</Text>
        <Button size="sm" onClick={handleShare}>
          Share Result
        </Button>
        <Text fontSize="sm" color="gray.400">
          ⏳ Next puzzle in: {countdown}
        </Text>
        <Text fontSize="xs" color="gray.500" mt={2} userSelect="text">
          Play daily at: www.dailyechogame.com
        </Text>
      </VStack>
    </Box>
  );
}

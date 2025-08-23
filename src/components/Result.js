import { Text, VStack, Button, Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Result = ({
  attempts,
  hints,
  solved,
  onCountdownComplete,
  streakCount,
}) => {
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
  const streakLine = `🔥 Streak: ${streakCount}`;
  const [countdown, setCountdown] = useState("");
  const toast = useToast();

  const shareText = `Daily Echo Game 
${emojiGuesses}
${hintLine}
${streakLine} 
Play daily at: www.dailyechogame.com`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Result copied! Ready to share.",
        status: "success",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Failed to copy result.",
        status: "error",
        duration: 3000,
        position: "top",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
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

      if (diff < 1000) {
        clearInterval(interval);
        setCountdown("00:00:00");
        setTimeout(() => {
          if (onCountdownComplete) onCountdownComplete();
        }, 1000);
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
      </VStack>
    </Box>
  );
};

export default Result;

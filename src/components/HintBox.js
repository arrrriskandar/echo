import { Box, Button, Text, VStack } from "@chakra-ui/react";

const HintBox = ({ hints, revealed, onReveal }) => {
  const maxHints = 2;

  return (
    <Box mt={4}>
      {revealed > 0 && <Text>💡 Hint 1: {hints[0]}</Text>}
      {revealed > 1 && <Text>💡 Hint 2: {hints[1]}</Text>}
      <VStack align="center" mt={4}>
        <Button onClick={onReveal} isDisabled={revealed >= maxHints}>
          {revealed < maxHints ? "Show Hint (with Ad)" : "No More Hints"}
        </Button>
        <Text fontSize="sm" color="gray.400">
          {revealed}/{maxHints} hints used
        </Text>
      </VStack>
    </Box>
  );
};

export default HintBox;

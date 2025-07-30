import { Box, Text } from "@chakra-ui/react";

const ResultBox = ({ attempts, hints, streak, solved }) => (
  <Box mt={6}>
    <Text>Attempts: {attempts}/5</Text>
    <Text>Hints Used: {hints}/2</Text>
    <Text>Streak: {streak} days</Text>
    {solved && <Text color="green.300">✅ Correct! Come back tomorrow.</Text>}
  </Box>
);

export default ResultBox;

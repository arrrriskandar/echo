import { Box, List, Text, ListItem } from "@chakra-ui/react";

const GuessList = ({ wrongGuesses }) => {
  return (
    <Box mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Incorrect Guesses
      </Text>
      <List spacing={1}>
        {wrongGuesses.map((word, idx) => (
          <ListItem key={idx}>❌ {word}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GuessList;

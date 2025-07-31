import { List, ListItem } from "@chakra-ui/react";

const GuessList = ({ wrongGuesses }) => {
  return (
    <List spacing={2} p={3}>
      {wrongGuesses.map((word, idx) => (
        <ListItem key={idx}>❌ {word}</ListItem>
      ))}
    </List>
  );
};

export default GuessList;

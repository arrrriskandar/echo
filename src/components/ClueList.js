import { List, ListItem } from "@chakra-ui/react";

const ClueList = ({ clues, revealed }) => {
  const sortedIndexes = [...revealed].sort((a, b) => a - b);

  return (
    <List spacing={2} border="1px solid #444" borderRadius="md" p={3}>
      {sortedIndexes.map((i) => (
        <ListItem key={i}>
          <strong>🔍 Clue {i + 1}:</strong> {clues[i]}
        </ListItem>
      ))}
    </List>
  );
};

export default ClueList;

import React from "react";
import { List, ListItem, Text } from "@chakra-ui/react";

const ClueList = ({ clues, revealed }) => {
  return (
    <List spacing={2} mt={4}>
      {revealed.map((index) => (
        <ListItem key={index}>
          <Text>
            <strong>Clue {index + 1}:</strong> {clues[index]}
          </Text>
        </ListItem>
      ))}
    </List>
  );
};

export default ClueList;

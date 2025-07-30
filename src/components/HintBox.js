import { Box, Button, Text } from "@chakra-ui/react";

const HintBox = ({ hints, revealed, onReveal }) => (
  <Box mt={4}>
    <Button onClick={onReveal} mb={2}>
      Show Hint
    </Button>
    {revealed > 0 && <Text>Hint 1: {hints[0]}</Text>}
    {revealed > 1 && <Text>Hint 2: {hints[1]}</Text>}
  </Box>
);

export default HintBox;

import { Box, Button } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

const HelpButton = ({ onClick }) => {
  return (
    <Box position="absolute" top="0px" left="0px" userSelect="none">
      <Button
        size="sm"
        colorScheme="blue"
        leftIcon={<QuestionIcon />}
        onClick={onClick}
        variant="ghost"
      >
        How to play
      </Button>
    </Box>
  );
};

export default HelpButton;

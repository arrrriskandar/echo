import {
  Box,
  Text,
  Button,
  VStack,
  Image,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { InfoIcon, CheckCircleIcon } from "@chakra-ui/icons";

const Onboarding = ({ onComplete }) => {
  return (
    <Box p={8} maxW="lg" mx="auto" mt={12} textAlign="center">
      <VStack spacing={6}>
        <Image src="/EchoBig.png" alt="Echo Logo" boxSize="120px" mx="auto" />
        <List spacing={3} textAlign="left">
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            You have <strong>5 guesses</strong> to solve the one-word puzzle.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Clues are shown from <strong>obvious to subtle</strong> — use them
            to guide your thinking.
          </ListItem>
          {/* <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            You can unlock <strong>2 hints</strong> — triggered by watching an
            ad.
          </ListItem> */}
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            You can use up to <strong>2 hints</strong> if you require additional
            help.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            Guessing a clue doesn't count against your 5 attempts.
          </ListItem>
          <ListItem>
            <ListIcon as={InfoIcon} color="blue.500" />A new puzzle appears
            daily at <strong>00:00 UTC</strong>.
          </ListItem>
        </List>

        <Text fontSize="sm" color="gray.500">
          Your streak is tracked — play daily to keep it alive!
        </Text>

        <Button colorScheme="teal" size="md" onClick={onComplete}>
          Got it! Let’s play 🎯
        </Button>
      </VStack>
    </Box>
  );
};

export default Onboarding;

import {
  Box,
  Text,
  Button,
  VStack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { InfoIcon, CheckCircleIcon } from "@chakra-ui/icons";

const Onboarding = ({ onComplete }) => {
  return (
    <Box p={8} maxW="lg" mx="auto" mt={12} textAlign="center">
      <VStack spacing={6}>
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
            <ListIcon as={InfoIcon} color="blue.500" />
            Puzzles release daily at 00:00 UTC (
            {new Date(
              Date.UTC(
                new Date().getUTCFullYear(),
                new Date().getUTCMonth(),
                new Date().getUTCDate()
              )
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}{" "}
            in your local time)
          </ListItem>
        </List>

        <Text fontSize="sm" color="gray.300">
          Your streak is tracked — play daily to keep it alive!
        </Text>

        <Button size="md" onClick={onComplete}>
          Got it! Let’s play 🎯
        </Button>
      </VStack>
    </Box>
  );
};

export default Onboarding;

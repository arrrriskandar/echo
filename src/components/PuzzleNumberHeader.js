import { Flex, Heading } from "@chakra-ui/react";

const Header = ({ puzzleNumber }) => {
  return (
    <Flex
      as="header"
      color="white"
      align="center"
      justify="center"
      p={4}
      shadow="md"
    >
      <Heading size="md">Puzzle #{puzzleNumber}</Heading>
    </Flex>
  );
};

export default Header;

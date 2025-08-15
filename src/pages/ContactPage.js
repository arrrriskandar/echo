import { Box, Text, VStack, Link } from "@chakra-ui/react";

const ContactPage = () => {
  return (
    <Box p={4} pt={0}>
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Contact Me
        </Text>
        <Text>
          I welcome and encourage any feedback you may have. If you have any
          questions or suggestions, feel free to reach out via email at{" "}
          <Link
            href="mailto:dailyechogame@gmail.com"
            color="blue.400"
            isExternal
          >
            dailyechogame@gmail.com
          </Link>
          .
        </Text>
      </VStack>
    </Box>
  );
};

export default ContactPage;
